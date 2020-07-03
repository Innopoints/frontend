export default function isModeration(activity) {
  return activity.internal && activity.name === '[[Moderation]]';
}
