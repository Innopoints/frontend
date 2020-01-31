/* Replaces the "Z" timezone modifier for an explicit +00:00 */
export default function isoForURL(date) {
  return encodeURIComponent(date.toISOString().slice(0, -1) + '+00:00');
}
