import colors from 'vuetify/es5/util/colors';

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - LandingPage',
    title: 'LandingPage',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/TipTapVuetify', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://localhost:83/api'
  },

  auth: {
    localStorage: false,
    strategies: {
      local: {
        endpoints: {
          login: { url: '/v1/users/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/v1/auth/logout', method: 'post' },
          user: { url: '/v1/auth/user', method: 'get', propertyName: 'data.attributes' }
        },
        token: {
          required: false,
          type: 'Bearer',
        },
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/dashboard'
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      },

    },
    icons: {
      iconfont: 'mdi',
      values: {
        login: 'mdi-login',
        register: 'mdi-account-plus',
        deleteUser: 'mdi-account-remove',
        userSettings: 'mdi-account-cog',
        announcementSettings: 'mdi-message-cog',
        formatBold: 'mdi-format-bold',
        formatUnderline: 'mdi-format-underline',
        formatItalic: 'mdi-format-italic',
        accountVoice: 'mdi-account-voice',
      }
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
      transpile: ['vuetify/lib', "tiptap-vuetify"]
    }
  },

  // router: {
  //   middleware: ['super-admin']
  // }
}
