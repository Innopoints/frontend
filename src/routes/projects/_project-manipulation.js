export function filterProjectFields(project, edit = false) {
  const filtered = {
    name: project.name,
    image_id: project.image_id,
    organizer: project.organizer,
  };
  if (!edit) {
    filtered.activities = project.activities;
  }

  return filtered;
}
