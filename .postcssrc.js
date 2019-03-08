// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      "browserslists": [
        "> 0.00001%",
        "last 10 versions",
        "ios >=8",
        "android >= 3.0"
      ]
    }
  }
}
