import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url';
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
    scss: { includePaths: ['./static/css'] },
    postcss: { plugins: [autoprefixer] },
  }),
];

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        ...sapperEnv(),
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.VAPID_PUBLIC_KEY': process.env.VAPID_PUBLIC_KEY,
      }),
      eslint(),
      svelte({
        extensions: ['.html', '.svelte'],
        preprocess: preprocessChain,
        dev,
        hydratable: true,
      }),
      // TODO: figure out the new image caching mechanism
      url({
        sourceDir: path.resolve(__dirname, 'static/images'),
        publicPath: '/client/',
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
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.VAPID_PUBLIC_KEY': process.env.VAPID_PUBLIC_KEY,
        'process.env.BOT_API_TOKEN': process.env.BOT_API_TOKEN,
        'process.env.BOT_REPORT_CHAT_ID': process.env.BOT_REPORT_CHAT_ID,
      }),
      svelte({
        extensions: ['.html', '.svelte'],
        preprocess: preprocessChain,
        generate: 'ssr',
        hydratable: true,
        dev,
      }),
      url({
        sourceDir: path.resolve(__dirname, 'static/images'),
        publicPath: '/client/',
        emitFiles: false,  // already emitted by client build
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
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.API_HOST': process.env.SAPPER_APP_API_HOST_BROWSER,
      }),
      commonjs(),
      !dev && terser(),
    ],
    preserveEntrySignatures: false,
    onwarn,
  },
};
