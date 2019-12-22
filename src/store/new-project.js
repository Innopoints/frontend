import { get, writable } from 'svelte/store';

export const step = writable(0);
export const changeStep = (st) => {
  step.update( () => st);
};

export const saved = writable(true);
export const changeSaved = (val) => {
  saved.update( () => val);
};

export const project = writable({});

export const createProject = () => {
  project.update(value => {
    if (!value.creationTime)
      return {
        creationTime: new Date().toISOString(),
        updateTime: null,
        name: '',
        organizer: '',
        activities: [],
        moderators: [],
      };
  });
};

export const changeField = (field, value) => {
  project.update(proj => ({ ...proj, [field]: value }));
  changeSaved(false);
};

export const save = () => {
  let projects = JSON.parse(localStorage.getItem('project-drafts'));
  if (!projects) {
    localStorage.setItem('project-drafts', JSON.stringify([]));
    projects = [];
  }

  changeField('updateTime', new Date().toISOString());
  let proj = get(project);

  let projIndex = projects.findIndex(x => x.creationTime === proj.creationTime);
  if (projIndex === -1) projects.push(proj);
  else projects[projIndex] = proj;

  localStorage.setItem('project-drafts', JSON.stringify(projects));
  changeSaved(true);
};

export const drafts = writable([]);
export const getDrafts = () => {
  drafts.update(() => JSON.parse(localStorage.getItem('project-drafts')) || []);
};

export const deleteDraft = (date) => {
  let projects = JSON.parse(localStorage.getItem('project-drafts'));
  if (projects) {
    let projIndex = projects.findIndex(x => x.creationTime === date);
    if (projIndex > -1) projects.splice(projIndex, 1);
    localStorage.setItem('project-drafts', JSON.stringify(projects));
    getDrafts();
  }
};
