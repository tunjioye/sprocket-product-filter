const withPlugins = require('next-compose-plugins')
const css = require('@zeit/next-css')
const sass = require('@zeit/next-sass')
const less = require('@zeit/next-less')

module.exports = withPlugins([
  [css],
  [sass],
  [less, {
    lessLoaderOptions: {
      javascriptEnabled: true
    }
  }],
])
