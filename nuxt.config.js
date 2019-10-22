require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/gh/loadingio/loading.css@2.0.0/dist/loading.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/gh/loadingio/ldBtn/dist/ldbtn.min.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: '@fortawesome/fontawesome-free/css/all.min.css' },
    { src: '@/assets/scss/app.scss' }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios', // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/auth', // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/proxy' // Doc: https://www.npmjs.com/package/@nuxtjs/proxy
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: '/api'
  },
  proxy: {
    '/api': {
      target: process.env.API_BASE_URL,
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  /*
  ** Axios auth module configuration
  ** See https://auth.nuxtjs.org/api/options.html
  */
  auth: {
    redirect: {
      home: '/',
      logout: '/login'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'POST', propertyName: 'token' },
          logout: { url: '/logout', method: 'DELETE' },
          user: { url: '/users/current', method: 'GET' }
        }
      }
    },
    plugins: [
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
