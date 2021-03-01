import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import substituteSvgs from './src/utils/substitute-svgs.js';
import sapperEnv from 'sapper-environment';
import autoPreprocess from 'svelte-preprocess';
import makeAttractionsImporter from 'attractions/importer.js';
import autoprefixer from 'autoprefixer';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message))
  || (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message))
  || onwarn(warning);

const preprocessChain = [
  {
    markup: substituteSvgs,
  },
  autoPreprocess({
    scss: {
      importer: makeAttractionsImporter({
        themeFile: './static/css/_attractions-theme.scss',
      }),
      includePaths: ['./static/css'],
    },
    postcss: { plugins: [autoprefixer] },
  }),
];

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        values: {
          ...sapperEnv(),
          'process.browser': true,
          'process.env.NODE_ENV': JSON.stringify(mode),
          'process.env.VAPID_PUBLIC_KEY': JSON.stringify(process.env.VAPID_PUBLIC_KEY),
        },
        preventAssignment: true,
      }),
      eslint(),
      svelte({
        extensions: ['.html', '.svelte'],
        preprocess: preprocessChain,
        emitCss: false,
        compilerOptions: {
          dev,
          hydratable: true,
        },
      }),
      resolve({
        browser: true,
        dedupe: ['svelte'],
      }),
      alias({
        resolve: ['.jsx', '.js', '.svelte', '.svg'],
        entries: [
          { find: /^src\//, replacement: __dirname + '/src/' },
          { find: /^static\//, replacement: __dirname + '/static/' },
        ],
      }),
      commonjs(),
      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          babelHelpers: 'runtime',
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
    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        values: {
          'process.browser': false,
          'process.env.NODE_ENV': JSON.stringify(mode),
          'process.env.VAPID_PUBLIC_KEY': JSON.stringify(process.env.VAPID_PUBLIC_KEY),
          'process.env.BOT_API_TOKEN': JSON.stringify(process.env.BOT_API_TOKEN),
          'process.env.BOT_REPORT_CHAT_ID': JSON.stringify(process.env.BOT_REPORT_CHAT_ID),
        },
        preventAssignment: true,
      }),
      svelte({
        extensions: ['.html', '.svelte'],
        preprocess: preprocessChain,
        emitCss: false,
        compilerOptions: {
          generate: 'ssr',
          hydratable: true,
          dev,
        },
      }),
      resolve({
        dedupe: ['svelte'],
      }),
      alias({
        resolve: ['.jsx', '.js', '.svelte', '.svg'],
        entries: [
          { find: /^src\//, replacement: __dirname + '/src/' },
          { find: /^static\//, replacement: __dirname + '/static/' },
        ],
      }),
      commonjs(),
    ],
    external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),
    preserveEntrySignatures: 'strict',
    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        values: {
          'process.browser': true,
          'process.env.NODE_ENV': JSON.stringify(mode),
          'process.env.API_HOST': JSON.stringify(process.env.SAPPER_APP_API_HOST_BROWSER),
        },
        preventAssignment: true,
      }),
      commonjs(),
      !dev && terser(),
    ],
    preserveEntrySignatures: false,
    onwarn,
  },
};
