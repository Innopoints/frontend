/* Returns an 's' character to use for pluralization if the amount is not one. */
export default function pluralS(amount) {
  if (amount === 1) {
    return '';
  }
  return 's';
}
