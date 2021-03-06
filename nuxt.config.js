// var scriptCode = require('./utils/scriptCode.js')
// import { preBidHeaderOne } from '@/utils/scriptCode'
// console.log('loading')
// console.log(scriptCode)
// console.log('loaded')
// console.log(scriptCode.preBidHeaderOne)

const session = require('express-session')
const bodyParser = require('body-parser')

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
    bodyAttrs: {
      class: 'home page-template page-template-templates page-template-template-home page-template-templatestemplate-home-php page page-id-35795 bomb_res wpb-js-composer js-comp-ver-5.0 vc_responsive',
      'data-bgimage': 'https://www.uhnd.com/wp-content/uploads/2017/03/uhnd-bg.jpg',
      'data-bgoverlay': 'https://www.uhnd.com/wp-content/themes/abomb/images/overlays/5.png'
    },
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
      // { innerHTML: scriptCode.preBidHeaderOne },
      // { innerHTML: scriptCode.preBidHeaderTwo },
      // { innerHTML: scriptCode.dfp },
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
      { innerHTML: `
          /* <![CDATA[ */
            var ajax_tptn_tracker = {"ajax_url":"https:\/\/www.uhnd.com\/wp-admin\/admin-ajax.php","top_ten_nonce":"839d2e0a81","top_ten_id":"35795","top_ten_blog_id":"1","activate_counter":"11","tptn_rnd":"1236359532"};
            /* ]]> */
      `, type: 'text/javascript' },

      { src: 'https://www.uhnd.com/wp-content/plugins/top-10/includes/js/top-10-tracker.js', type: 'text/javascript' },
      { src: 'https://www.uhnd.com/wp-content/plugins/wp-rss-widget/assets/js/frontend.js', type: 'text/javascript' }
      // { src: 'https://www.uhnd.com/wp-content/themes/abomb/js/source.js', type: 'text/javascript' },
      // { src: 'https://www.uhnd.com/wp-content/themes/abomb/js/abomb.js', type: 'text/javascript' }
    ],
    // __dangerouslyDisableSanitizersByTagID: { description: ['innerHTML'] }
    __dangerouslyDisableSanitizers: ['script']
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
    },
    vendor: ['axios']
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
    // clientConfigs: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
      // nuxt: '~/apollo/client-configs/nuxt.js'
      // test: '~/apollo/client-configs/test.js'
    }
  },
  router: {
    middleware: ['check-auth']
  },
  css: [
    '@/assets/styles.css'
  ],
  env: {
    // RANKINGS_HOST2: process.env.RANKINGS_HOST || '127.0.0.1',
    // RANKINGS_PORT2: process.env.RANKINGS_PORT || '5000',
    // TEST: 'hello world',
    // RANKINGS_TEST: process.env.RANKINGS_TEST || 'nothing set',
    RANKINGS_HOST: process.env.RANKINGS_HOST || '127.0.0.1',
    RANKINGS_PORT: process.env.RANKINGS_PORT || '5000',
    nuxtUrl: process.env.NUXT_URL || 'http://localhost:3000'
  },
  plugins: [
    // ssr: false to only include it on client-side
    { src: '~/plugins/vue-env.js' }
  ],
  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: process.env.FRONTEND_KEY || 'secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    })
  ]
}
