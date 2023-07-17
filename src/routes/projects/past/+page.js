import getInitialData from 'src/utils/get-initial-data.js';

export async function load(page, session) {
  let { projects } = await getInitialData(this, session, new Map([
    ['projects', `/projects/past`],
  ]));
  if (projects == null) {
    projects = { data: [], pages: 0 };
  }
  return {
    projects: projects.data,
    pages: projects.pages,
    account: session.account,
  };
}
