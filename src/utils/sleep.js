/* Returns a promise that resolves in a given amount of milliseconds. */
export default function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
