import HOURLY_RATE from 'src/constants/backend/default-hourly-rate.js';
import arraysEqual from 'src/utils/arrays-equal.js';
import spaceOnly from 'src/utils/space-only.js';
import setNullSafe from 'src/utils/set-null-safe.js';


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

  newActivity.applications = [];

  return newActivity;
}

/* Copy ALL the fields from the source activity object to the destination in place,
   deep-copying complex fields. */
export function copyActivityInPlace(source, destination) {
  Object.assign(destination, source);

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

/* Format the UTC explicitly as '+00:00' as opposed to the shorthand 'Z'.
   Python only understands the full version. */
function toISOFormat(date) {
  return date.toISOString().slice(0, -1) + '+00:00';
}

/* Prepare an activity object to be sent to the backend
   by converting dates to ISO, ensuring certain invariants and removing alien fields. */
export function prepareForBackend(activity) {
  if (activity.fixed_reward != null) {
    if (activity.fixed_reward) {
      activity.working_hours = 1;
    } else {
      activity.reward_rate = HOURLY_RATE;
    }
  }
  const copy = copyActivity(activity);

  if (copy.timeframe != null) {
    copy.timeframe = {
      start: copy.timeframe.start && toISOFormat(copy.timeframe.start),
      end: copy.timeframe.end && toISOFormat(copy.timeframe.end),
    };
  }

  if (copy.application_deadline != null) {
    copy.application_deadline = toISOFormat(copy.application_deadline);
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

/* Prepare the activity object in place to be processed on the frontend
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

/* Compute diffs between two project objects. */
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

/* Copy a project object, deep-copying the moderators. */
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
    && activity.competences.length > 0
    && (
      (!activity.fixed_reward && activity.working_hours != null)
      || (activity.fixed_reward && activity.reward_rate != null)
    )
  );
}
