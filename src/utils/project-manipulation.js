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
