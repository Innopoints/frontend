import ActivityTypes from '@/constants/projects/activity-internal-types.js';
import getBlankActivity from '@/constants/projects/blank-activity.js';


export function copyActivity(activity) {
  const newActivity = Object.assign({}, activity);
  if (activity.timeframe != null) {
    newActivity.timeframe = {
      start: activity.timeframe.start,
      end: activity.timeframe.end,
    };
  }

  if (activity.moderators != null) {
    newActivity.moderators = activity.moderators.slice();
  }

  if (activity.feedback_questions != null) {
    newActivity.feedback_questions = activity.feedback_questions.slice();
  }

  return newActivity;
}

export function filterProjectFields(project, edit = false) {
  const filtered = {
    name: project.name,
    image_id: project.image_id,
    organizer: project.organizer,
    moderators: project.moderators,
  };
  if (!edit) {
    filtered.activities = project.activities;
  }

  return filtered;
}

export function filterActivityFields(activity) {
  delete activity.existing_application;
  delete activity.vacant_spots;
  delete activity.project;
  delete activity.applications;
  delete activity.internal;

  return activity;
}

export function countDisplayActivitiesBefore(activityList, index) {
  let result = 0;
  for (let i = 0; i < index; ++i) {
    if (activityList[i]._type === ActivityTypes.DISPLAY) {
      result++;
    }
  }
  return result;
}

/* Adds a new form to the list of activites */
export function addActivity(activityList) {
  const newActivity = getBlankActivity();
  newActivity._type = ActivityTypes.NEW;
  activityList.push(newActivity);
  return activityList;
}

function toISOFormat(date) {
  return date.toISOString().slice(0, -1) + '+00:00';
}

/* Prepares an activity object to be sent to the backend
   by converting dates to ISO and ensuring certain invariants. */
export function prepareForBackend(activity) {
  if (activity.fixed_reward) {
    activity.working_hours = 1;
  }

  activity.timeframe = {
    start: toISOFormat(activity.timeframe.start),
    end: toISOFormat(activity.timeframe.end),
  };

  if (activity.application_deadline != null) {
    activity.application_deadline = toISOFormat(activity.application_deadline);
  }
}

/* Determine the index to insert the activity into the list
   knowing its position among non-internal activities. */
export function determineInsertionIndex(activities, position) {
  let insertionIndex = 0;
  while (position) {
    if (activities[insertionIndex].internal) {
      position--;
    }
    insertionIndex++;
  }
  return insertionIndex;
}
