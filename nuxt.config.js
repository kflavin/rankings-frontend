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
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/themes/abomb/style.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/themes/abomb-child/style.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-includes/css/dashicons.min.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/plugins/wunderground/assets/css/wunderground.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/plugins/arqam/assets/style.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/plugins/avantlink-wp/css/rp_style.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/plugins/avantlink-wp/css/ps_style.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/plugins/contact-form-7/includes/css/styles.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/plugins/theia-post-slider/css/font-theme.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/plugins/theia-post-slider/fonts/style.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/plugins/wp-rss-excerpts-thumbnails/css/styles.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/plugins/wp-rss-widget/assets/css/frontend-styles.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/themes/abomb/style.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/themes/abomb-child/style.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/plugins/tablepress-responsive-tables/css/responsive.dataTables.min.css', type: 'text/css', media: 'all' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/tablepress-combined.min.css', type: 'text/css', media: 'all', id: 'tablepress-default-css' },
      { rel: 'stylesheet', href: 'https://www.uhnd.com/wp-content/plugins/contact-form-7/includes/css/styles.css', type: 'text/css', media: 'all', id: 'redux-google-fonts-reedwan_options-css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto%3A400%2C100%2C700%2C900%7COswald%3A400%2C300&#038;subset=latin', type: 'text/css', media: 'all' },
    ],
    script: [
      { src: 'https://use.fontawesome.com/a3373709c1.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-includes/js/jquery/jquery.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-includes/js/jquery/jquery-migrate.min.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-includes/js/jquery/ui/core.min.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-includes/js/jquery/ui/widget.min.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-includes/js/jquery/ui/position.min.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-includes/js/jquery/ui/menu.min.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-includes/js/wp-a11y.min.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-includes/js/jquery/ui/autocomplete.min.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-content/plugins/wunderground/assets/js/widget.min.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-content/plugins/theia-post-slider/js/balupton-history.js/jquery.history.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-content/plugins/theia-post-slider/js/async.min.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-content/plugins/theia-post-slider/js/tps.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-content/plugins/theia-post-slider/js/tps-transition-none.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-content/plugins/top-10/includes/js/top-10-tracker.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-content/plugins/wp-rss-widget/assets/js/frontend.js', type: 'text/javascript' }
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

