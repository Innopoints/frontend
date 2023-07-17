import getInitialData from 'src/utils/get-initial-data.js';
import { prepareAfterBackend } from 'src/utils/project-manipulation.js';
import ProjectStages from 'src/constants/backend/project-lifetime-stages.js';

export async function load(page, session) {
  const data = await getInitialData(this, session, new Map([
    ['projectObject', `/projects/${page.params.id}`],
    ['competences', '/competences'],
    ['tags', '/tags'],
  ]));
  if (data.projectObject.lifetime_stage === ProjectStages.DRAFT) {
    this.redirect(303, '/projects/new');
  }
  data.projectObject.activities.forEach(prepareAfterBackend);
  data.account = session.account;
  return data;
}
