import { writable } from 'svelte/store';
import getInitialData from 'src/utils/get-initial-data.js';
import { prepareAfterBackend } from 'src/utils/project-manipulation.js';

export async function load(page, session) {
  const data = await getInitialData(this, session, new Map([
    ['project', `/projects/${page.params.id}`],
    ['competences', '/competences'],
    ['tags', '/tags'],
  ]));

  if (session.account == null || !session.account.is_admin) {
    this.error(403, 'Project Review');
  }

  data.project.activities.forEach(prepareAfterBackend);
  data.account = session.account;
  data.project = writable(data.project);
  return data;
}
