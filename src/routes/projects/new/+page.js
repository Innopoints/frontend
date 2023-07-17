import getInitialData from 'src/utils/get-initial-data.js';

export async function load(page, session) {
  const data = await getInitialData(this, session, new Map([
    ['drafts', '/projects/drafts'],
    ['competences', '/competences'],
  ]));

  if (session.account == null) {
    this.error(403, 'Create a Project');
  }

  data.account = session.account;
  return data;
}
