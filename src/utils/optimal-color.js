const trimHEX = (color) => {
  if (!color) return '';

  let unhashed = color.replace(/[^0-9A-Ea-e]/g, '');
  if (unhashed.length === 3) {
    let normalized = [];
    unhashed.split('').forEach(x => normalized.push(x.repeat(2)));
    return normalized.join('');
  }
  return unhashed;
};

const transform = (color) => {
  color /= 255;
  if (color <= 0.03928) {
    return color / 12.92;
  } else {
    return Math.pow((color + 0.055) / 1.055, 2.4);
  }
};

const luminance = (rgb) => {
  const [r, g, b] = rgb;
  return transform(r) * 0.2126 + transform(g) * 0.7152 + transform(b) * 0.0722;
};

/* Returns the contrast between the background and content colors,
   specified as [r, g, b] arrays of numbers in range [0; 255]. */
const getContrast = (background, content) => {
  return (luminance(background) + 0.05) / (luminance(content) + 0.05);
};


/* Converts the RGB color ([r, g, b] array of numbers in range [0; 255])
   to the HSL color ([h, s, l] array of floats in range [0; 1]). */
const rgbToHsl = (rgb) => {
  let [r, g, b] = rgb;
  r /= 255;
  g /= 255;
  b /= 255;

  let maxComp = Math.max(...rgb);
  let minComp = Math.min(...rgb);

  let l = (minComp + maxComp) / 2;

  let h, s;
  if (maxComp === minComp) {
    h = s = 0;
  } else {
    let delta = maxComp - minComp;
    s = 2 - maxComp - (l > 0.5 ? minComp : delta / (maxComp + minComp));

    if (maxComp === r) h = (g - b) / delta + (g < b ? 6 : 0);
    else if (maxComp === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h /= 6;
  }

  return [h, s, l];
};

/* Returns the optimal background color for the color given as
   a hex string without the hash. */
export default (color) => {
  color = trimHEX(color);
  if (!color) return '';

  let r = parseInt(color.slice(0, 2), 16);
  let g = parseInt(color.slice(2, 4), 16);
  let b = parseInt(color.slice(4, 6), 16);

  let [h, s] = rgbToHsl([r, g, b]);
  let contrast = getContrast([255, 255, 255], [r, g, b]);

  let bgL = (contrast > 1.08 ? 0.97 : 0.9);

  return `hsl(${Math.floor(h * 360)}, ${s * 100}%, ${bgL * 100}%)`;
};
