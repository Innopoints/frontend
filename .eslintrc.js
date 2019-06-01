module.exports = {
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "babel-eslint",
    "sourceType": "module",
    "allowImportExportEverywhere": false
  },
  "extends" : [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  "plugins": [
    "vue"
  ],
  "env"     : {
    "browser" : true,
    "jquery": true
  },
  "globals" : {
    "__DEBUG__": false,
    "__DEV__": false,
    "__HOT__": false
  },
  "rules": {
    "semi" : [2, "always"],
    "spaced-comment": 0,
    "space-before-function-paren": 0,
    "jsx-quotes": 0,
    "no-class-assign": 0,
    "brace-style": 0,
    "no-return-assign": 0,
    "no-trailing-spaces": 0,
    "curly": [0, "multi"],
    "vue/html-indent": ["error", 2],
    "vue/max-attributes-per-line": ["error", {
      "singleline": 3,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/script-indent": ["error", 2, { "baseIndent": 1 }],
    "vue/require-default-prop": "off",
    "vue/require-v-for-key": ["error"],
    "vue/singleline-html-element-content-newline": "off",
    "indent": "off",
    "no-console": ["warn"]
  }
}
