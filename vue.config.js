module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = process.env.DEAFULT_PAGE_TITLE || "NavidAnindya."
        return args
      })
  }
}