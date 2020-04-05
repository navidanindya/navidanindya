module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "NavidAnindya." || process.env.DEFAULT_PAGE_TITLE
        return args
      })
  }
}