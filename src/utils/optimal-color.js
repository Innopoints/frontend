function trimHex(color) {
  if (!color) {
    return '';
  }
  const unhashed = color.replace(/[^0-9a-f]/gi, '');
  if (unhashed.length === 3) {
    return unhashed.split('').map(x => x.repeat(2)).join('');
  }
  return unhashed;
}

function transform(color) {
  color /= 255;
  if (color <= 0.03928) {
    return color / 12.92;
  } else {
    return Math.pow((color + 0.055) / 1.055, 2.4);
  }
}

function luminance([r, g, b]) {
  return transform(r) * 0.2126 + transform(g) * 0.7152 + transform(b) * 0.0722;
}

// Returns the contrast between the background and content colors,
// specified as [r, g, b] arrays of numbers in range [0; 255].
function getContrast(background, content) {
  return (luminance(background) + 0.05) / (luminance(content) + 0.05);
}

// Converts the RGB color ([r, g, b] array of numbers in range [0; 255])
// to the HSL color ([h, s, l] array of floats in range [0; 1]).
function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;

  const maxComp = Math.max(r, g, b);
  const minComp = Math.min(r, g, b);

  let h, s;
  const l = (minComp + maxComp) / 2;
  if (maxComp === minComp) {
    h = s = 0;
  } else {
    const delta = maxComp - minComp;
    s = (l > 0.5 ? delta / (2 - maxComp - minComp) : delta / (maxComp + minComp));

    /* eslint-disable indent */
    switch (maxComp) {
      case r: {
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      }
      case g: {
        h = (b - r) / delta + 2;
        break;
      }
      case b: {
        h = (r - g) / delta + 4;
        break;
      }
    }
    /* eslint-enable indent */

    h /= 6;
  }

  return [h, s, l];
}

// Returns the optimal background color for the color given as
// a hex string without the hash.
export default function getBackground(color) {
  color = trimHex(color);
  if (!color) {
    return null;
  }

  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);

  const [h, s] = rgbToHsl([r, g, b]);
  const contrast = getContrast([255, 255, 255], [r, g, b]);
  const bgL = (contrast > 1.08 ? 0.97 : 0.96);

  return `background: hsl(${Math.floor(h * 360)}, ${s * 100}%, ${bgL * 100}%);`;
}
