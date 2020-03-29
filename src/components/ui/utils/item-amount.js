/* Return the string with the amount of the item, pluralizing correctly. */
export default function itemAmount(amount, item) {
  if (amount === 1) {
    return `1 ${item}`;
  } else {
    return `${amount} ${item}s`;
  }
}
