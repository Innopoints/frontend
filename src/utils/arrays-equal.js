export default function arraysEqual(arr1, arr2) {
  return (
    arr1.length === arr2.length
    && arr1.every((x, idx) => x === arr2[idx])
  );
}
