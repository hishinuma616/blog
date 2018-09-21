const contentful = require('contentful')
const contentfulClient = contentful.createClient({
  space: "73eynbkzierp",
  accessToken: "9e3cd460b700634368abbf527877323b5e78d42e43d00e9b5073e28724876a18"
})

module.exports = {
  //読み込むプラグイン一覧。appに挿入される
  plugins: [
    '~/plugins/contentful',
    '~/plugins/markdown-it'
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
   fallback: '404.html',
   routes () {
     return contentfulClient.getEntries().then(({ items }) => {
       return items.map(post => `/${post.fields.slug}`)
     })
   }
 },
}
