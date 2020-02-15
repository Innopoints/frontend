export default function getBlankActivity() {
  return {
    name: null,
    description: null,
    working_hours: null,
    fixed_reward: false,
    telegram_required: false,
    application_deadline: null,
    competences: [],
    feedback_questions: [
      'What did you learn from this volunteering opportunity?',
      'What could be improved in the organization?',
    ],
  };
}
