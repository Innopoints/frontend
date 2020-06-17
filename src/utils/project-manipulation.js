import ActivityTypes from '@/constants/projects/activity-internal-types.js';
import getBlankActivity from '@/constants/projects/blank-activity.js';
import HOURLY_RATE from '@/constants/backend/default-hourly-rate.js';
import arraysEqual from '@/utils/arrays-equal.js';
import spaceOnly from '@/utils/space-only.js';


/* Copy ALL the fields from the given activity object,
   deep-copying complex fields. */
export function copyActivity(activity) {
  const newActivity = Object.assign({}, activity);
  if (activity.timeframe != null) {
    newActivity.timeframe = {
      start: activity.timeframe.start && new Date(activity.timeframe.start.valueOf()),
      end: activity.timeframe.end && new Date(activity.timeframe.end.valueOf()),
    };
  }

  if (activity.competences != null) {
    newActivity.competences = activity.competences.slice();
  }

  if (activity.application_deadline != null) {
    newActivity.application_deadline = new Date(activity.application_deadline.valueOf());
  }

  if (activity.feedback_questions != null) {
    newActivity.feedback_questions = activity.feedback_questions.slice();
  }

  return newActivity;
}

export function copyActivityInPlace(source, destination) {
  for (let field in source) {
    destination[field] = source[field];
  }

  if (source.timeframe != null) {
    destination.timeframe = {
      start: source.timeframe.start && new Date(source.timeframe.start.valueOf()),
      end: source.timeframe.end && new Date(source.timeframe.end.valueOf()),
    };
  }

  if (source.application_deadline != null) {
    destination.application_deadline = new Date(source.application_deadline.valueOf());
  }

  if (source.competences != null) {
    destination.competences = source.competences.slice();
  }

  if (source.feedback_questions != null) {
    destination.feedback_questions = source.feedback_questions.slice();
  }

  return destination;
}

export function filterProjectFields(project) {
  const filtered = {
    name: project.name,
    image_id: project.image_id,
    moderators: project.moderators,
  };

  return filtered;
}

export function countDisplayActivitiesBefore(activityList, index) {
  let result = 0;
  for (let i = 0; i < index; ++i) {
    if (activityList[i]._type === ActivityTypes.DISPLAY
        || activityList[i]._type === ActivityTypes.TEMPLATE) {
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
   by converting dates to ISO, ensuring certain invariants and removing alien fields. */
export function prepareForBackend(activity) {
  const copy = copyActivity(activity);
  if (copy.fixed_reward) {
    copy.working_hours = 1;
  } else {
    copy.reward_rate = HOURLY_RATE;
  }

  copy.timeframe = {
    start: activity.timeframe.start && toISOFormat(activity.timeframe.start),
    end: activity.timeframe.end && toISOFormat(activity.timeframe.end),
  };

  if (activity.application_deadline != null) {
    copy.application_deadline = toISOFormat(activity.application_deadline);
  }

  delete copy.id;
  delete copy.project;
  delete copy.applications;
  delete copy.existing_application;
  delete copy.internal;
  delete copy.vacant_spots;
  delete copy._editing;

  return copy;
}

/* Prepare the activity object to be processed on the frontend
   by converting dates to Date objects. */
export function prepareAfterBackend(activity) {
  activity.timeframe = {
    start: activity.timeframe.start && new Date(activity.timeframe.start),
    end: activity.timeframe.end && new Date(activity.timeframe.end),
  };

  if (activity.application_deadline != null) {
    activity.application_deadline = new Date(activity.application_deadline);
  }
}

/* Determine the index to insert the activity into the list
   knowing its position among non-internal activities. */
export function determineInsertionIndex(activities, position) {
  let insertionIndex = 0;
  while (position && insertionIndex < activities.length) {
    if (!activities[insertionIndex].internal) {
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
        let copy = copyActivity(activity);
        if (copy._type == null) {
          copy._type = ActivityTypes.DISPLAY;
          prepareAfterBackend(copy);
        }

        internalList.splice(internalListIdx, 0, copy);
        internalListIdx++;
        activityProcessed = true;
        break;
      }

      // If the internalList cursor is on a deletion marker, remove it from the list
      // Happens when an activity deletion was confirmed by a dialog
      if (internalList[internalListIdx]._type === ActivityTypes.DELETION_MARKER) {
        internalList.splice(internalListIdx, 1);
        continue;
      }

      // If the internalList cursor is on a new activity form, let it be
      // Happens when there is an open form that hasn't been saved yet
      if (internalList[internalListIdx]._type === ActivityTypes.NEW) {
        internalListIdx++;
        continue;
      }

      // If the internalList cursor is on a displayed activity,
      // don't change anything – it is already that same activity
      if (internalList[internalListIdx]._type === ActivityTypes.DISPLAY) {
        internalListIdx++;
        activityProcessed = true;
        break;
      }

      // If the cursor is on a replacement marker, place the backend activity on that spot
      // Happens upon creating a new activity or applying edits to an existing one
      if (internalList[internalListIdx]._type === ActivityTypes.REPLACEMENT_MARKER) {
        const copy = copyActivity(activity);
        copy._type = ActivityTypes.DISPLAY;
        prepareAfterBackend(copy);
        internalList.splice(internalListIdx, 1, copy);
        internalListIdx++;
        activityProcessed = true;
        break;
      }

      // If the cursor is on an edit form, accept it as a backend activity
      if (internalList[internalListIdx]._type === ActivityTypes.EDIT) {
        internalListIdx++;
        activityProcessed = true;
        break;
      }

      if (internalList[internalListIdx]._type === ActivityTypes.TEMPLATE) {
        if (activity.timeframe != null && internalList[internalListIdx].timeframe == null) {
          internalList[internalListIdx].timeframe = activity.timeframe;
        }
        internalListIdx++;
        activityProcessed = true;
        break;
      }
    }
  }

  // Remove the deleted activities from the end
  while (internalListIdx < internalList.length) {
    if (internalList[internalListIdx]._type === ActivityTypes.DISPLAY
     || internalList[internalListIdx]._type === ActivityTypes.DELETION_MARKER) {
      internalList.splice(internalListIdx, 1);
    } else {
      internalListIdx++;
    }
  }

  // Have a new activity form if the internalList is empty
  if (internalList.length === 0) {
    let activity = getBlankActivity();
    activity._type = ActivityTypes.NEW;
    internalList.push(activity);
  }

  return internalList;
}

/* Filter the non-internal non-template activities. */
export function visibleActivities(project) {
  return project.activities.filter(act => !act.internal && act._type !== ActivityTypes.TEMPLATE);
}

function setNullSafe(object, field, value) {
  if (object == null) {
    return { [field]: value };
  } else {
    object[field] = value;
    return object;
  }
}

export function computeDiffProject(project, reference) {
  let diff = null;
  if (reference == null || project == null) {
    return copyProject(project);
  }

  if (project.name !== reference.name) {
    diff = setNullSafe(diff, 'name', project.name);
  }
  if (project.image_id !== reference.image_id) {
    diff = setNullSafe(diff, 'image_id', project.image_id);
  }
  if (!arraysEqual(project.moderators, reference.moderators)) {
    diff = setNullSafe(diff, 'moderators', project.moderators);
  }
  if (project.activities !== reference.activities) {
    diff = setNullSafe(diff, 'activities', project.activities);
  }

  return diff;
}

export function copyProject(project) {
  if (project == null) {
    return null;
  }

  return {
    name: project.name,
    image_id: project.image_id,
    moderators: project.moderators.map(x => ({ ...x })),
    activities: project.activities,
  };
}

/* Check if all the required fields for the activity have been filled out. */
export function isComplete(activity) {
  return (
    activity.name != null
    && !spaceOnly(activity.name)
    && activity.timeframe != null
    && activity.timeframe.start != null
    && activity.timeframe.end != null
    && activity.working_hours != null
    && activity.competences.length > 0
  );
}
