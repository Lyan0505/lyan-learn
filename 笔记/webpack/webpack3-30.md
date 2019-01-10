# webpack：
> 今天终于看了 传说中的webpack：

## webpack 核心概念：

   * 1、入口 entry
   * 2、出口 output
   *  3、loader
   * 4、插件（plugins）

## webpack
* webpack 是以commonJS 的形式来书写脚本，支持import 或者require 的写法来 引入各个模块；
* webpack还可以直接替代能替代不少原本属于gulp的工作，比如打包，压缩，混淆，图片转base64等
* webpack 提供了 配套的dev-sever 并且支持热更新；
* 
### 入口entry

   * webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的 
   * 也就是说，，webpack 要找到一个入口，开始处理，最后输出到bundle是文件中
   
   ```
   举一个vue 项目的例子
   webpack.config.js

   modules.exports={
        entry: {
            "app": [config.srcPath + 'app.js'], //入口文件
            "common": ['vue', 'vue-router', 'vuex'],  //vue模块
            "polyfill": ['babel-polyfill'], //补全es6原生对象
            "ued": [config.srcPath + '/ued/index.js'], //ued组件
            "comp": [config.srcPath + '/component/index.js'], //ued组件
        },
   }

   ```
### 出口 
   * 其实就是告诉webpack 在哪里输出创建的bundles，以及如何命名这些文件；
   
   ```
     webpack.config.js

     本地环境:
     dev.config.js:
        output: {
        path: path.join(__dirname, '../dev/'), //构建目录
        filename: '[name].js'
    },

    线上环境：
    打包之后的文件 输出到dist 文件里； 文件的命名意name+八位哈希值
     prod.config.js:
    output: {
        path: path.join(__dirname, '../dist/'), //构建目录
        filename: '[name].[chunkhash:8].js'
    },

   ```
### 插件plugins：

  * 插件包括打包优化和压缩，一直到重新定义环境中的变量；
  * 那么如何使用呢，你只要require() 然后 把它添加到plugins 数组中，多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

  #### 用法：
  * 你必须在webpack 配置中 向plugins 属性 传入new 实例；

   ```
   
   这是一个本地dev 配置

        const path = require('path');

        const webpack = require('webpack');

        const HtmlWebpackPlugin = require('html-webpack-plugin'); //webpack html 打包模块

        const webpackMerge = require('webpack-merge');

        const mainConfig = require('./main.config');

        const config = require('./config');

        Object.keys(mainConfig.entry).forEach(function (name) {

        mainConfig.entry[name] = [__dirname + '/dev.client'].concat(mainConfig.entry[name])
        })

        console.log(mainConfig);

        module.exports = webpackMerge(mainConfig, {
            devtool: '#source-map',
            output: {
                path: path.join(__dirname, '../dev/'), //构建目录
                filename: '[name].js'
            },

            module: {
                rules: []
            },
            plugins: [
                new webpack.optimize.OccurrenceOrderPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('development')
                }),

                //根据模板插入css/js等生成最终HTML
                new HtmlWebpackPlugin({
                    // favicon: config.srcPath + '/favicon.ico',
                    filename: 'index.html', 
                    template: config.srcPath + '/index.html', 
                    inject:true,

                    minify:{    //压缩HTML文件
                        removeComments:true,    //移除HTML中的注释
                        collapseWhitespace:true    //删除空白符与换行符
                    }
                })
            ]

        });

   ```
   * 这些插件 该用哪个，具体哪个 是做什么得，现在还是懵逼，，继续往下学习；
   * 


### loader
  * 是用来对模块代码进行转换，这样可以是你在import 或者加载模块的时候预处理文件，
  ```
    module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 6000,
              name: 'images/[name]_[hash].[ext]'
            }
          },
        ]
      },
      // 其他的loader
      {

      },
    ]
    }
  ```
  * loader 可以是同步的也是异步的，，loader 通过（loader）预处理函数，为 JavaScript 生态系统提供了更多能力。 用户现在可以更加灵活地引入细粒度逻辑，例如压缩、打包、语言翻译
  

### 如何配置呢？
  
  * 一般都是require() 导入其他文件
  * 通过require() 使用npm 的工具函数；
  * 使用js 控制流表达式，，？： （不懂）
  * 还可以支持多种配置类型，对一个菜鸟来说 我还是先 学简单的配置把，后续根据要求来学习；
  * 





