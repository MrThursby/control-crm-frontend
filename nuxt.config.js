require("dotenv").config();

export default {
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  // mode: 'spa',
  loading: {
    color: '#6556ff',
    height: '4px',
    duration: 5000,
    continuous: true,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'control-crm-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/persistedstate',
    '~/plugins/datepicker.js',
    '~/plugins/vuelidate.js',
    '~/plugins/permissionsMixin.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    ['@nuxtjs/moment', {
      defaultLocale: 'ru',
      locales: ['ru']
    }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    '@nuxtjs/fontawesome',
    '@nuxtjs/dotenv',
    '@nuxtjs/recaptcha',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    credentials: true,
  },

  recaptcha: {
    siteKey: process.env.NOCAPTCHA_SITEKEY,
    version: 2,
    hideBadge: true,
    theme: 'dark'
  },

  proxy: {
    '/api': {
      target: `${process.env.API_URL}/`,
      changeOrigin: process.env.CHANGE_ORIGIN
    },
    '/auth': {
      target: `${process.env.API_URL}/`,
      changeOrigin: process.env.CHANGE_ORIGIN,
    }
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          maxAge: 60 * 5, // 5 min
          global: true
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 10, // 10 days 
          global: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          refresh: { url: '/auth/refresh-token', method: 'post',/*  property: 'token' */ },
          user: { url: '/api/profile', method: 'get', property: 'user' },
          logout: { url: '/auth/logout', method: 'post' }
        }
      }
    }
  },

  fontawesome: {
    component: 'fa',
    suffix: true,
    icons: {
      solid: [
        'faCog', 'faHome', 'faSearch', 'faSimCard', 'faCreditCard', 'faExchangeAlt', 'faBars', 'faTimes',
        'faChevronDown', 'faUser', 'faFileAlt'
      ]
    }
  },

  router: {
    middleware: ['auth']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
