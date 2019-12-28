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

export const changeActivityField = (index, field, value) => {
  const {activities} = get(project);
  changeField('activities', activities.map(activity => {
    if (activity.index === index) return {...activity, [field]: value};
    return activity;
  }));
  changeSaved(false);
};

export const createActivity = () => {
  let activity = get(project).newActivity;
  if (
    activity.name && activity.competences.length
    && activity.date.start && activity.date.end
    && activity.reward && (!activity.isHourly || activity.isHourly && activity.hours)
    && (activity.morePeople || activity.people)
  ) {
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
  changeField('activities', array_move(activities, oldPlace, newPlace));
  save();
};
export const deleteActivity = index => {
  const {activities} = get(project);
  changeField('activities', activities.filter(x => x.index !== index));
  if (!get(project).activities.length) addActivity();
  save();
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

// Thanks stackoverflow for it
const array_move = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    let k = new_index - arr.length + 1;
    while (k--) arr.push(undefined);
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};
