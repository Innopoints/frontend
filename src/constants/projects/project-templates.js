export function getBlankProject() {
  return {
    name: null,
    organizer: null,
    activities: [],
    moderators: [],
  };
}

export function getOlympiad() {
  return getBlankProject();
}

export function getStudentParty() {
  return getBlankProject();
}
