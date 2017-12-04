module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'rankings-frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Rankings front end' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  // This gets rid of the bulma warnings
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
    /*
    ** Run ESLint on save
    */
    // extend (config, ctx) {
    //   if (ctx.dev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  },
  /*
  ** Modules
   */
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/bulma'
  ],
  apollo: {
    // networkInterfaces: {
    //   default: '~/apollo/network-interfaces/default.js'
    // }
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
      // test: '~/apollo/client-configs/test.js'
    }
  },
  router: {
    middleware: 'check-auth'
  },
  css: [
    '@/assets/styles.css'
  ]

}

