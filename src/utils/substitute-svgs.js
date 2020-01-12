import fs from 'fs';
import path, { extname } from 'path';

const selfClosingSvgs = /<svg([^>]*)\/>/gi;
const selfClosingSvgsLocal = /<svg([^>]*)\/>/gi;
const attributesRegex = /([a-zA-Z-0-9]+)="([^"]*)"/gi;
const fullSvg = /<svg([^>]*)>([^]*)<\/svg>/i;


function processCustomSvg(svg) {
  const svgMatch = svg.match(selfClosingSvgsLocal);
  const attributes = {};

  for (let attrMatch of svgMatch[0].matchAll(attributesRegex)) {
    attributes[attrMatch[1]] = attrMatch[2];
  }

  if (!('src' in attributes)) {
    console.error('A self-closing SVG must specify a src attribute.');
    return '';
  }

  const pathToSvg = path.join(__dirname, 'static/', attributes.src);
  if (fs.existsSync(pathToSvg)) {
    const svgFile = fs.readFileSync(pathToSvg, 'utf8');
    let [, svgAttrs, svgContent] = svgFile.match(fullSvg) || [];
    delete attributes.src;

    if ('alt' in attributes) {
      svgContent = `<title>${attributes.alt}</title>${svgContent}`;
      delete attributes.alt;
    }

    if ('class' in attributes) {
      if (svgAttrs.includes('class="')) {
        svgAttrs = svgAttrs.replace(/class="[^"]*"/, `class="${attributes.class}"`);
      } else {
        svgAttrs += ` class="${attributes.class}"`;
      }
      delete attributes.class;
    }

    for (let leftAttr in attributes) {
      svgAttrs += ` ${leftAttr}="${attributes[leftAttr]}"`;
    }

    return `<svg ${svgAttrs.trim()}>${svgContent}</svg>`;
  } else {
    console.error(`Can't locate file '${pathToSvg}'.`);
    return '';
  }
}

export default function substituteSvgs({ content, filename }) {
  if (extname(filename) === '.svelte') {
    return { code: content.replace(selfClosingSvgs, processCustomSvg) };
  }

  return { code: content };
}
