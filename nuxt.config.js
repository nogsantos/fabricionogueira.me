import projects from './contents/projects';
import posts from './contents/posts';
import snippets from './contents/snippets';

export default {
  mode: 'universal',
  generate: {
    routes: [
      ...projects.map((slug) => `/projects/${slug}/`),
      ...posts.map((slug) => `/posts/${slug}/`),
      ...snippets.map((slug) => `/snippets/${slug}/`)
    ],
    fallback: true
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/main.scss',
    '@primer/css/support/index.scss',
    '@primer/css/buttons/index.scss',
    '@primer/css/header/index.scss',
    '@primer/css/layout/index.scss',
    '@primer/css/subhead/index.scss',
    '@primer/css/markdown/index.scss',
    '@primer/css/utilities/index.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-sass-resources-loader',
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://fabricionogueira.me',
    gzip: true,
    routes: projects.map((slug) => `/projects/${slug}/`)
  },

  markdownit: {
    injected: true
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader'
      });
    }
  }
};