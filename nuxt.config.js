export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'fire',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: []
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/scss/reset.scss', '~/assets/scss/global.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/vant.js' }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vant'],
    postcss: {
      plugins: {
        autoprefixer: {},
        'postcss-px-to-viewport': {
          unitToConvert: 'px',
          viewportWidth: 320,
          unitPrecision: 5,
          propList: ['*','!font-size'],
          viewportUnit: 'vw',
          fontViewportUnit: 'px',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: [],
          landscape: false,
          landscapeUnit: 'vw',
          landscapeWidth: 568
        }
      }
    }
  },
  telemetry: false
}
