/* Return the styles needed for displaying a radiobutton or a checkbox
   with the given color. */
export default function getColorPickerStyles(hexColor) {
  if (hexColor.length !== 7) {
    console.error('Values of colored radio groups must be #XXXXXX hex colors.');
    return '';
  }

  let r = parseInt(hexColor.slice(1, 3), 16);
  let g = parseInt(hexColor.slice(3, 5), 16);
  let b = parseInt(hexColor.slice(5, 7), 16);

  const whiteThreshold = 245;
  const gray = 153;
  if (r > whiteThreshold && g > whiteThreshold && b > whiteThreshold) {
    r = gray;
    g = gray;
    b = gray;
  }

  return `background-color: rgb(${r}, ${g}, ${b});
          border-color: rgb(${r}, ${g}, ${b});
          --r: ${r}; --g: ${g}; --b: ${b};`;
}
