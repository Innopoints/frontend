import { get, writable } from 'svelte/store';
import { goto } from '@sapper/app';

export const step = writable(0);
export const changeStep = (st) => {
  step.update( () => {
    if (!get(project).creationTime && st !== 0) goto('/projects/new');
    return st;
  });
};

export const saved = writable(true);
export const changeSaved = (val) => {
  saved.update( () => val);
};

const activityTemplate = {
  name: '',
  description: '',
  date: {
    start: null,
    end: null,
  },
  competences: [],
  telegramRequired: false,
  reward: {
    type: 'fixed',
    amount: null,
  },
  people: null,
  deadline: null,
  feedbacks: [],
};

const projectTemplate = {
  creationTime: null,
  updateTime: null,
  name: '',
  organizer: '',
  newActivity: activityTemplate,
  activities: [],
  moderators: [],
};

export const project = writable(projectTemplate);

export const createProject = () => {
  project.update(value => {
    if (!value.creationTime)
      return {
        ...projectTemplate,
        creationTime: new Date().toISOString(),
      };
  });
  goto('/projects/new?step=1');
};

export const chooseProject = date => {
  const projects = JSON.parse(localStorage.getItem('project-drafts')) || [];
  const found = projects.find(x => x.creationTime === date);
  if (found) {
    project.update(() => found);
  } else {
    createProject();
  }
};

export const changeField = (field, value) => {
  project.update(proj => ({ ...proj, [field]: value }));
  changeSaved(false);
};

export const changeDeepField = (field, deepField, value) => {
  project.update(proj => ({ ...proj, [field]: {...proj[field], [deepField]: value} }));
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

export const deleteDraft = date => {
  let projects = JSON.parse(localStorage.getItem('project-drafts'));
  if (projects) {
    let projIndex = projects.findIndex(x => x.creationTime === date);
    if (projIndex > -1) projects.splice(projIndex, 1);
    localStorage.setItem('project-drafts', JSON.stringify(projects));
    getDrafts();
  }
};
