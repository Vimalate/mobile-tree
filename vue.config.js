
const CompressionPlugin = require("compression-webpack-plugin")
let timeStamp = new Date().getTime();  // 获取当前的时间戳
module.exports = {
  publicPath: "./",   // 打包相对路径
  devServer: {
    port: 8080,       // 运行端口号
    proxy: {
      // '/usercenter': {
      //   target: 'http://usercenter.website.test.com',        //测试
      //   // target: 'http://uc.3hmis.com',        //正式
      //   changeOrigin: true                      // 是否跨域
      // },
      '': {
        // target: 'http://m.jxcloud.3hmis.com',        //正式
        target: 'http://14.116.210.102:9009',        //测试
        // target: 'http://192.169.0.220:8090/zyy',        //测试
        changeOrigin: true                      // 是否跨域
      }
    }
  },
  lintOnSave: false,
  configureWebpack: () => {
    return {
      output: { // 输出重构 打包编译后的js文件名称,添加时间戳.
        filename: `js/[name].${ timeStamp }.js`,
        chunkFilename: `js/[name].${ timeStamp }.js`,
      },
      externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios'
      },
      plugins: [
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
          threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
          deleteOriginalAssets: false // 是否删除原文件
        })
      ]
    }
 },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    },
    extract:{ // 打包后css文件名称添加时间戳
      filename:`css/[name].${ timeStamp }.css`,
      chunkFilename:`css/[name].${ timeStamp }.css`,
    }
  }
}
