module.exports = {
  "root": true,
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  },
  "extends": ["eslint:recommended"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "allowImportExportEverywhere": false
  },
  "plugins": ["svelte3"],
  "overrides": [
    {
      "files": ["**/*.svelte"],
      "processor": "svelte3/svelte3"
    }
  ],
  "globals": {
    "__DEBUG__": false,
    "__DEV__": false,
    "__HOT__": false,
  },
  "settings": {
    "svelte3/ignore-styles": function(attrs) { return attrs.lang === 'scss'; },
  },
  "rules": {
    "semi": [2, "always"],
    "spaced-comment": 0,
    "space-before-function-paren": 0,
    "no-class-assign": 0,
    "brace-style": 0,
    "no-return-assign": 0,
    "no-trailing-spaces": 0,
    "no-constant-condition": "off",
    "curly": [0, "multi"],
    "indent": "off",
    "comma-dangle": ["warn", "always-multiline"],
    "no-unused-vars": [
      "error",
      { "vars": "all", "args": "none", "ignoreRestSiblings": true }
    ],
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "keyword-spacing": "error",
  }
}