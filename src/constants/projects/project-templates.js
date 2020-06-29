import getBlankActivity from 'src/constants/projects/blank-activity.js';


export function getBlankProject() {
  return {
    name: null,
    image_id: null,
    activities: [],
    moderators: [],
  };
}


export function getOlympiad() {
  const blank = getBlankProject();
  const activities = [
    {
      name: 'Catering Assistant',
      description: (
        'To manage food-serving areas: helping participants '
        + 'with seat allocation and barcode scanning.'
      ),
      competences: [3, 7],  // communication, critical thinking
    },
    {
      name: 'Requisite Manager',
      description: 'To set the ground and complete necessary preparation for competition venues.',
      competences: [1, 7, 9],  // teamwork, critical thinking, creativity
    },
    {
      name: 'Transfer Assistant',
      description: (
        'To meet participants of the event at the arrival places (airport, train station), '
        + 'to ensure they reach the competition venue. You will also escort participants '
        + 'from places of residence to competition venues and vice versa.'
      ),
      competences: [3, 6, 7],  // communication, proactivity, critical thinking
    },
    {
      name: 'Registration Clerk',
      description: (
        'To control settlement procedure and registration for the event: issuing badges '
        + 'and souvenirs to participants, resolving emerging issues, managing lost and found items'
      ),
      competences: [3, 4, 6],  // communication, digital grammar, proactivity
    },
    {
      name: 'Site & Technical Volunteer',
      description: (
        'To control the process of the event: helping judges, managing site access, '
        + 'monitoring the safety of equipment at the site, working at partner areas '
        + 'and helping at master classes and exhibitions.'
      ),
      competences: [1, 3, 6],  // teamwork, communication, proactivity
    },
    {
      name: 'Protocol Assistant',
      description: 'To collect and process final competition results.',
      competences: [3, 4],  // communication, digital grammar
    },
    {
      name: 'Event Reporter',
      description: (
        'To run the event’s diary: collecting and publishing information about what’s going on, '
        + 'taking photos, making videos, taking interviews '
        + 'and working in the radio room (if applicable).'
      ),
      competences: [3, 4, 9],  // communication, digital grammar, creativity
    },
    {
      name: 'Attaché',
      description: (
        'To work as a “first aider” of participants: informing about changes, '
        + 'accompanying participants and resolving controversial situations.'
      ),
      competences: [3, 6, 7],  // communication, proactivity, critical thinking
    },
    {
      name: 'Mentor',
      description: (
        'To assist participants with education materials, to work as a mentor to schoolchildren.'
      ),
      competences: [1, 3, 7],  // teamwork, communication, critical thinking
    },
  ];
  blank.activities = activities.map(
    activity => Object.assign(getBlankActivity(), activity),
  );
  return blank;
}

export function getStudentParty() {
  const blank = getBlankProject();
  const activities = [
    {
      name: 'Requisite Manager',
      description: 'To set the ground and complete necessary preparation for the event.',
      competences: [1, 7, 9],  // teamwork, critical thinking, creativity
    },
    {
      name: 'Performer',
      description: 'To deliver an artistic performance at the event.',
      competences: [9],  // creativity
      fixed_reward: true,
      reward_rate: 200,
    },
    {
      name: 'Station Worker',
      description: 'To provide assistance at the assigned station (food court, table games, etc.)',
      competences: [3, 6, 7],  // communication, proactivity, critical thinking
    },
    {
      name: 'Technical Volunteer',
      description: 'To assist with audio and other equipment at the event.',
      competences: [4, 7, 9],  // digital grammar, critical thinking, creativity
    },
    {
      name: 'MC',
      description: (
        'To be a stage person at the event, to make announcements, to run games (if applicable).'
      ),
      competences: [3, 6, 9],  // communication, proactivity, creativity
      fixed_reward: true,
      reward_rate: 300,
    },
    {
      name: 'Event Reporter',
      description: (
        'To run the event’s diary: collecting and publishing information about what’s going on, '
        + 'taking photos, making videos, taking interviews '
        + 'and working in the radio room (if applicable).'
      ),
      competences: [3, 4, 9],  // communication, digital grammar, creativity
    },
    {
      name: '“On Hand” Volunteer',
      description: (
        'To navigate visitors, answer queries and be “on hand” '
        + 'if other help is required at the time of the event.'
      ),
      competences: [1, 6, 7],  // teamwork, proactivity, critical thinking
    },
  ];
  blank.activities = activities.map(
    activity => Object.assign(getBlankActivity(), activity),
  );
  return blank;
}
