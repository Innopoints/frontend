import { get, writable } from 'svelte/store';
import { goto } from '@sapper/app';
import swapIndexes from '@/utils/swap-indexes';

export const step = writable(0);
export const changeStep = (st) => {
  step.update( () => {
    const proj = get(project);
    if (proj && !proj.creationTime && st !== 0) goto('/projects/new');
    else if (!proj && st !== 0) createProject();
    return st;
  });
};

export const saved = writable(true);
export const changeSaved = (val) => {
  saved.update( () => val);
};

const activityTemplate = {
  index: null,
  editing: false,
  name: '',
  description: '',
  date: {
    start: null,
    end: null,
  },
  competences: [],
  telegramRequired: false,
  isHourly: false,
  hours: null,
  reward: null,
  people: null,
  morePeople: false,
  deadline: null,
  feedbacks: [],
};


// ***
// Project part
const projectTemplate = {
  creationTime: null,
  updateTime: null,
  name: '',
  image: null,
  organizer: '',
  editing: null,
  newActivity: activityTemplate,
  activities: [],
  moderators: [],
};

export const project = writable(projectTemplate);
export const errors = writable([]);

export const createProject = () => {
  project.update(value => {
    if (!value || !value.creationTime)
      return {
        ...projectTemplate,
        creationTime: new Date().toISOString(),
      };
  });
  errors.update(() => []);
  goto('/projects/new?step=1');
};

export const chooseProject = date => {
  const projects = JSON.parse(localStorage.getItem('project-drafts')) || [];
  const found = projects.find(x => x.creationTime === date);
  if (found) {
    project.update(() => found);
    errors.update(() => []);
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

export const changeActivityField = (index, field, value) => {
  const {activities} = get(project);
  changeField('activities', activities.map(activity => {
    if (activity.index === index) return {...activity, [field]: value};
    return activity;
  }));
  changeSaved(false);
};

export const checkProject = () => {
  const proj = get(project);
  let errs = [];
  if (!proj.name) errs.push('name');
  if (!proj.organizer) errs.push('organizer');
  if (!proj.activities.length) errs.push('activities');
  errors.update(() => errs);
};

export const findErrors = () => {
  checkProject();
  const errs = get(errors);
  if (errs.includes('name') || errs.includes('organizer')) goto('/projects/new?step=1');
  else if (errs.includes('activities')) goto('/projects/new?step=2');
};

export const endProject = () => {
  checkProject();
  if (!get(errors).length) return;

  alert('You have done a great job!');
};

// ***
// Activity part
export const checkActivity = (activity) => {
  let errorFields = [];
  if (!activity.name) errorFields.push('name');
  if (!activity.competences.length) errorFields.push('competences');
  if (!activity.date.start || !activity.date.end) errorFields.push('date');
  if (!activity.isHourly && !activity.reward) errorFields.push('reward');
  if (activity.isHourly && !activity.hours) errorFields.push('hours');
  if (!activity.morePeople && !activity.people) errorFields.push('people');
  return errorFields;
};

export const createActivity = () => {
  let activity = get(project).newActivity;
  if (!checkActivity(activity).length) {
    project.update(proj => {
      activity.index = proj.activities.length;
      return {
        ...proj,
        activities: [...proj.activities, activity],
        newActivity: null,
      };
    });
  }
  save();
};

export const addActivity = () => {
  const {newActivity} = get(project);
  if (!newActivity) changeField('newActivity', activityTemplate);
};
export const discardActivity = () => {
  changeField('newActivity', null);
  save();
};
export const editActivity = (index, edit = true) => {
  changeActivityField(index, 'editing', edit);
  save();
};
export const duplicateActivity = index => {
  const {activities} = get(project);
  const activity = activities.find(x => x.index === index);
  let i = activities[activities.length - 1].index + 1;
  changeField('activities', [...activities, {...activity, index: i}]);
  save();
};
export const swapActivities = (oldPlace, newPlace) => {
  let {activities} = get(project);
  changeField('activities', swapIndexes(activities, oldPlace, newPlace));
  save();
};
export const deleteActivity = index => {
  const {activities} = get(project);
  changeField('activities', activities.filter(x => x.index !== index));
  if (!get(project).activities.length) addActivity();
  save();
};


// ***
// Drafts part
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
  checkProject();
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
