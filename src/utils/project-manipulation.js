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

/* Prepare an activity object to be sent to the backend
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

  delete activity.applications;
  delete activity.existing_application;
}

/* Determine the index to insert the activity into the list
   knowing its position among non-internal activities. */
export function determineInsertionIndex(activities, position) {
  let insertionIndex = 0;
  while (position && insertionIndex < activities.length) {
    if (activities[insertionIndex].internal) {
      position--;
    }
    insertionIndex++;
  }
  return insertionIndex;
}

/* Synchronize the internal representation of the activities (with types)
   with the activity list from the backend. */
export function synchronizeActivityLists(internalList, backendActivities) {
  let internalListIdx = 0;
  for (let activity of backendActivities.filter(activity => !activity.internal)) {
    let activityProcessed = false;
    while (!activityProcessed) {
      // If the internal list is over, copy the backend activity to the end
      // Happens on the initial population of the activityList
      if (internalListIdx >= internalList.length) {
        let copy = filterActivityFields(copyActivity(activity));
        copy._type = ActivityTypes.DISPLAY;
        internalList.splice(
          internalListIdx,
          internalList[internalListIdx] != null,
          copy,
        );
        internalListIdx++;
        activityProcessed = true;
        break;
      }

      // If the activityList cursor is on a new activity form, let it be
      // Happens when there is an open form that hasn't been saved yet
      if (internalList[internalListIdx]._type === ActivityTypes.NEW) {
        internalListIdx++;
      }

      // If the activityList cursor is on a displayed activity,
      // don't change anything – it is already that same activity
      if (internalList[internalListIdx]._type === ActivityTypes.DISPLAY) {
        internalListIdx++;
        activityProcessed = true;
        break;
      }

      // If the cursor is on a replacement marker, place the backend activity on that spot
      // Happens upon creating a new activity or applying edits to an existing one
      if (internalList[internalListIdx]._type === ActivityTypes.REPLACEMENT_MARKER) {
        let copy = filterActivityFields(copyActivity(activity));
        copy._type = ActivityTypes.DISPLAY;
        internalList.splice(
          internalListIdx,
          internalList[internalListIdx] != null,
          copy,
        );
        internalListIdx++;
        activityProcessed = true;
        break;
      }

      // If the cursor is on an edit form, accept it as the backend activity
      if (internalList[internalListIdx]._type === ActivityTypes.EDIT) {
        internalListIdx++;
        activityProcessed = true;
        break;
      }
    }
  }

  // Remove the deleted activities from the end
  while (internalListIdx < internalList.length) {
    if (internalList[internalListIdx]._type === ActivityTypes.DISPLAY) {
      internalList.splice(internalListIdx, 1);
    } else {
      internalListIdx++;
    }
  }

  // Have a new activity form if the activityList is empty
  if (internalList.length === 0) {
    let activity = getBlankActivity();
    activity._type = ActivityTypes.NEW;
    internalList.push(activity);
  }

  return internalList;
}
