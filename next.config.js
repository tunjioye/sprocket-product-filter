const withPlugins = require('next-compose-plugins')
const sass = require('@zeit/next-sass')
const less = require('@zeit/next-less')

module.exports = withPlugins([
  [sass],
  [less, {
    lessLoaderOptions: {
      javascriptEnabled: true
    }
  }],
])
