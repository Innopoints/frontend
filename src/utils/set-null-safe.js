/* Set a field on the object, creating a blank object if the destination is null. */
export default function setNullSafe(object, field, value) {
  if (object == null) {
    return { [field]: value };
  } else {
    object[field] = value;
    return object;
  }
}
