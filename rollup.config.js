import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import alias from 'rollup-plugin-alias';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import preprocess from './src/utils/preprocess';
import sapperEnv from 'sapper-environment';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) => onwarn(warning);

const dedupe = importee =>
  importee === 'svelte' || importee.startsWith('svelte/');

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        ...sapperEnv(),
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      eslint(),
      svelte({
        extensions: ['.html', '.svelte', '.svg'],
        preprocess: {
          markup: data => preprocess(data, false, {}),
          style: ({ content }) => ({code: content}),
        },
        dev,
        hydratable: true,
      }),
      resolve({
        browser: true,
        dedupe,
      }),
      alias({
        resolve: ['.jsx', '.js', '.svelte', '.svg'],
        entries: [
          { find: /^@\//, replacement: __dirname + '/src/' },
          { find: /^ui/, replacement: __dirname + '/src/components/ui' },
          { find: /^images/, replacement: __dirname + '/static/images' },
        ],
      }),
      commonjs(),
      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          runtimeHelpers: true,
          exclude: ['node_modules/@babel/**'],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: '> 0.25%, not dead',
              },
            ],
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-transform-runtime',
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],

    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        extensions: ['.html', '.svelte', '.svg'],
        preprocess: {
          markup: data => preprocess(data, false, {}),
        },
        generate: 'ssr',
        dev,
      }),
      resolve({
        dedupe,
      }),
      alias({
        resolve: ['.jsx', '.js', '.svelte', '.svg'],
        entries: [
          { find: /^@\//, replacement: __dirname + '/src/' },
          { find: /^ui/, replacement: __dirname + '/src/components/ui' },
          { find: /^images/, replacement: __dirname + '/static/images' },
        ],
      }),
      commonjs(),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules ||
        Object.keys(process.binding('natives')),
    ),

    onwarn,
  },
};
