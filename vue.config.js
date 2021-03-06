const VConsolePlugin = require('vconsole-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
//   publicPath: '',
//   outputDir: '',
  devServer: {
    // 设置主机地址
    // host: "0.0.0.0",
    // // 设置默认端口
    // port: 8089,
    // 设置代理
    proxy: {
      '/auth': {
        target: 'https://', // 接口的域名
        ws: true, // 如果要代理 websockets
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置,将主机标头的原点更改为目标URL
        pathRewrite: {
          '^/auth': '/auth'
        }
      }
    },
    // 警告只在终端显示，错误显示在浏览器中
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: (config) => {
    if (!isProduction) {
      console.log('--------此操作为开发及测试环境, 默认开启控制台打印任务--------');
      // 开发及测试环境
      config.plugins.push(new VConsolePlugin({ enable: !isProduction }));
    } else {
      // 线上环境
      console.log('--------此操作为正式环境环境--------');
      config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios',
        'qs': 'Qs'
      };
    }
  },

  css: {
    sourceMap: true,
    requireModuleExtension: true
  },

  lintOnSave: true
};
