import fs from 'fs';
import path, { extname } from 'path';

const markupPreprocess = (
  { content, filename },
  removeAttrs = false,
  customAttrs = {}
) => {
  if (extname(filename) === '.svelte') {
    const svgs = () => {
      const match = content.match(/<svg[^>]*\ssrc="[^"]*"[^>]*\/>/gi) || [];

      return match.map(svg => {
        const [, attrLeft, attrRight] =
          svg.match(/<svg([^>]*)\ssrc="[^"]*"([^>]*)\/>/i) || [];
        const [, url] = svg.match(/\ssrc="([^"]*)"/) || [];
        if (!url) console.error('NO URL in <svg src="" />');
        return { url, attrs: attrLeft + ' ' + attrRight };
      });
    };

    const stringToObj = (str = '') => {
      let obj = {};
      (str.match(/[-a-zA-z0-9]+="[^"]*"/gi) || []).forEach(attr => {
        const [, key, value] = attr.match(/(.*)="(.*)"/i) || [];
        obj[key] = value;
      });
      return obj;
    };

    const objToString = (obj = {}) => {
      let result = '';
      for (let key of Object.keys(obj)) {
        result = result + `${key}="${obj[key]}" `;
      }
      return result;
    };

    const usePriority = (obj = {}, priority = {}) => {
      for (let attr of Object.keys(obj)) {
        if (attr in priority) {
          obj[attr] = priority[attr].toString();
        }
      }
      return obj;
    };

    const mergeAttrs = (svgAttrs = '', objAttrs = '') => {
      const leftAttrs = stringToObj(svgAttrs);
      const rightAttrs = stringToObj(objAttrs);

      const mergedAttrsObj =
        [leftAttrs, rightAttrs].reduce((accum, cur) => {
          return (
            Object.keys(cur).forEach(curAttr => {
              if (!accum[curAttr]) accum[curAttr] = cur[curAttr];
              else accum[curAttr] = accum[curAttr] + ' ' + cur[curAttr];
            }),
            accum
          );
        }, {}) || {};

      const prioritized = usePriority(
        usePriority(mergedAttrsObj, customAttrs),
        rightAttrs
      );
      return objToString(prioritized);
    };

    for (let obj of svgs()) {
      const pathToSvg = path.join(__dirname, 'static/', obj.url || '');
      if (fs.existsSync(pathToSvg)) {
        const svgFile = fs.readFileSync(pathToSvg, 'utf8');
        const svgParsed = svgFile.match(/<svg([^>]*)>([^]*)<\/svg>/i) || [];
        const [, svgAttrs, svgChildren] = svgParsed;
        let svg;
        if (!removeAttrs) {
          svg = `<svg ${mergeAttrs(svgAttrs, obj.attrs)}>${svgChildren}</svg>`;
          // if (filename === '/Users/vanish/Desktop/innopoints-frontend/src/components/footer.svelte') {
          //   console.log(filename);
          //   console.log(mergeAttrs(svgAttrs, obj.attrs));
          //   console.log(svg);
          // }
        } else {
          svg = `<svg>${svgChildren}</svg>`;
        }
        content = content.replace(/<svg[^>]*\ssrc="[^"]*"[^>]*\/>/i, svg);
      }
    }

    return { code: content };
  }
};

export default markupPreprocess;
