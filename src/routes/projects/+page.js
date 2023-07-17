import getInitialData from 'src/utils/get-initial-data.js';

export async function load(page, session) {
  const data = await getInitialData(this, session, new Map([
    ['projects', `/projects`],
  ]));
  data.account = session.account;
  return data;
}
