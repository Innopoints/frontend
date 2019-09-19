import { extname } from 'path';
import jsdom from 'jsdom';

const importsPerFile = {};

const escapeRegExp = str => str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');

export const sveltemarkup = ({ content, filename }) => {
  if (extname(filename) === '.svg') {
    content = content.replace(/<\?[^>]+\?>/gi, ''); // Remove <?xml ...?> tag
    const body = new jsdom.JSDOM(content).window.document.body;

    // Pass class from props because it is svelte component
    for (let i of body.children) i.classList.add('{$$props.class}');
    return { code: body.innerHTML };
  }

  if (extname(filename) === '.svelte') {
    const svgs = (content.match(/<svg[^>]*\ssrc="[^"]*"[^>]*\/>/gi) || []).map(
      l => l.match(/\ssrc="([^"]*)"/)[1]
    );

    importsPerFile[filename] = '';
    for (let i in svgs) {
      importsPerFile[filename] += `import SVG_${i} from '${svgs[i]}';`;
      content = content.replace(
        new RegExp(
          `<svg([^>]*\\ssrc="${escapeRegExp(svgs[i])}"[^>]*\\/>)`,
          'g'
        ),
        `<SVG_${i}$1`
      );
    }

    return { code: content };
  }
};

export const sveltescript = ({ content, attributes, filename }) => {
  if (extname(filename) === '.svelte') {
    return { code: importsPerFile[filename] + content };
  }
};
