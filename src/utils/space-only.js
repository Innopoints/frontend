/* Return whether a string only consists of whitespace. False for nulls. */
export default function spaceOnly(string) {
  if (string == null) {
    return false;
  }
  return string.trim() === '';
}
