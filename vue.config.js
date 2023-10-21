const { defineConfig } = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({

  devServer: {
    host: 'localhost',
    hot: true,
    // disableHostCheck: true,
    https: false
  },

  chainWebpack: config => {
    config.module
        .rule('thejs')
        .test(/\.js$/)
        .include
        .add(path.resolve('src'))
        .add(path.resolve('node_modules/element-ui/packages'))
        .end()
        .use('babel-loader')
        .loader('babel-loader')
        .end()
  },

  transpileDependencies: true
})
