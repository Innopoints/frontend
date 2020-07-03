import defaultFeedbackQuestions from 'src/constants/projects/feedback-questions.js';

export default function getBlankActivity() {
  return {
    name: null,
    description: null,
    draft: true,
    timeframe: {
      start: null,
      end: null,
    },
    working_hours: null,
    fixed_reward: false,
    telegram_required: true,
    application_deadline: null,
    competences: [],
    feedback_questions: defaultFeedbackQuestions,
  };
}
