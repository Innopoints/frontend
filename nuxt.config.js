/* eslint-env node */

module.exports = {

  // Server configuration
  server: {
    port: process.env.PORT || 3000
  },

  // Headers of the page
  head: {
    titleTemplate: '%s | innopoints',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/images/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700&display=swap&subset=cyrillic' }
    ]
  },

  // Customize the progress bar color
  loading: { color: '#3B8070' },

  css: [
    '~static/css/normalize.css',
  ],

  build: {

    // Run ESLint on save
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            emitWarning: true
          }
        });
      }
    }
  }
};

