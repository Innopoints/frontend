import * as api from 'src/utils/api.js';


export default async function getInitialData(context, session, mapping) {
  const requests = new Map();
  const result = {};
  for (const key of mapping.keys()) {
    let settings = mapping.get(key);
    requests.set(key, api.get.call(
      context,
      typeof settings === 'string' ? settings : settings.url,
      { cookie: session.cookies },
    ));
  }

  for (const key of requests.keys()) {
    try {
      let resp = await requests.get(key);

      if (resp.status === 200) {
        let settings = mapping.get(key);
        if (typeof settings !== 'string' && settings.transform != null) {
          result[key] = settings.transform(await resp.json());
        } else {
          result[key] = await resp.json();
        }
      } else {
        result[key] = null;
      }
    } catch (e) {
      console.error(e);
      result[key] = null;
    }
  }

  return result;
}
