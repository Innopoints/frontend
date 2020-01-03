import {API_HOST} from '@/constants/env';

// fetchType is needed for server-side request:
// in Sapper's preload() function there's this.fetch function that
// distinguishes between node-fetch and usual fetch depending on env
export default async (fetchType = fetch, url = '', method = 'GET', body = {}, isForm = false) => {
  return await fetchType(API_HOST + url, {
    credentials: 'include',
    body: isForm ? body : Object.entries(body).length ? JSON.stringify(body) : undefined,
    headers: {
      'content-type': (!isForm && Object.entries(body).length) ? 'application/json' : undefined,
    },
    method,
  }).then(res => {
    if (res.status === 204) return true;
    else if (res.ok) return res.json();
    return null;
  });
};
