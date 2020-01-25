const withCSS = require("@zeit/next-css")
const withScss = require("@zeit/next-sass")
const withLess = require("@zeit/next-less")

module.exports = withCSS(
  withScss(
    withLess({
      lessLoaderOptions: {
        javascriptEnabled: true
      }
    })
  )
)
