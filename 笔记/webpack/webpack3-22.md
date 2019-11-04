#### 今天学到的知识点：
#### JD 项目里移动端采用flexible.js 作为移动端适配：
*  用法就是引用 flexible_css.js,flexible.js文件；（感兴趣可以看下js 主要核心的也就二十行）
*  主要是执行js 之后 会在元素上面添加一个data-dpr 属性；font-size 样式，js 根据不同的设备添加不同的dpr 1，2，3，页面元素都可以通过rem 设置做对应的计算
#### 遇到vue 相关：
* 原来很少自己封装一个基础组件；注册组建 components，引入组建，到导出，prop接收；
* slot：
    * 单个slot：简单来说，只使用这个标签的话，可以将父组件放在子组件的内容，放到想让他显示的地方。
    * 具名slot:
       > 父组件在要分发的标签里添加 slot=”name名” 属性;子组件在对应分发的位置的slot标签里，添加name=”name名” 属性，然后就会将对应的标签放在对应的位置了。

#### webpack 简单熟悉：
 * 一些简单的文件参数：
    * entry 页面入口文件的配置；
    * output 有入口当然也有出口，出口的配置
         * path：入口文件最终要输出到哪里
         * filename： 输出文件的名称；打包之后文件可设置hash 生产环境；
         * publicPath：公共资源的路径；
    ```
     entry: {

        'common': ['./src/page/common/index.js'],
        
        'app': ['./src/page/login/index.js'],
        
        'index': ['./src/page/index/index.js']
    },

    ```
    > 入口 单页和多页不同，单页也许指定几个入口，从每个入口往下查找，最后都打包成一个js； 而多页打包每个页面都是一个入口；entry 也要查找所有的路径（还不会配置，，如果理解有误请指正，还未实践）

   ```
   module:{
       loaders:[
           {
                 //以下目录不处理
                exclude: /node_modules/,
                //处理以下目录
                include: /src/,
                loader: "babel-loader?cacheDirectory",
                //配置的目标运行环境自动启用需要的 babel 插件
                query: {
                    presets: ['latest']
                }
           }
       ]
   }
   ```
   > 这个模快加载一些loader 

   ---

>  重新研究 webpack 刚开始学习webpack 插件 以及配置方法的时候就比较懒，一知半解的，仅仅了解

## 为什么要使用webpack
> 其实就是一个打包机，分析项目结构，找到JS 模块以及其他浏览器不能直接运行的扩展语言，将其转换打包为合适的格式 以供浏览器使用
* 模块化 - 可以让我们把复杂的代码程序细化为小的文件
* scss less 等预处理器

## webpack 和Grunt 以及Gulp 相比的特性
* Gulp 和Grunt 是一种能够优化前端开发流程的工具，而Webpack 是一种模块化的解决方案

* Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。

* 在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，工具之后可以自动替你完成这些任务。


##  webpack 中最常见的 module 、resolve、 plugins

## 为了更好的开发 出来了很多利器

## Source Map 为了调试助理
* 有时候打包之后的文件很难找到出错的地方，source map 就是解决这个问题
* webpack 可以在我们打包的时候为我们生成 source map 为我们提供一种对应编译文件和源文件的方法，使编译的代码可读性提高了不少
*  配置的方法 如下：

>  devtool: 'eval-source-map' 
*  有四种不同的配置，各有优点，具体参考文档，自己选择就行

##  webpack 热更新 webpack-dev-sever

> npm install --save-dev webpack-dev-server

* webpack 提供一个可选的本地服务，本地的服务是基于node 构建
 ### 热更新原理：
 * 本地编辑代码进行修改， Webpack Compiler 将Js 编译成Bundle，进行打包，
 * 打包好之后，HMR Sever将更新的文件输出给 HMR RunTime
 * Bundle Sever:提供文件在浏览器中访问
 * HRM Sever : 被注入到浏览器中




## 方便打包的命令

> npx webpack --config config/webpack.config.js
*  方便我们本地开发，浏览器 监听代码的修改，提高开发的效率
* devserver 是webpack 配置选项的一项，

> port监听的端口； 

>inline : 当设置为true ，当源文件发生改变的时候 自动刷新页面； 

> historyApiFallback：在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html





## Loaders

* Loader 是很重要的一个部分
* 这就是webpack 得神奇之处，它有能力调用外部的脚本工具，实现对不同格式的文件的处理，比如 scss 转css ，或者是吧下一代的js 文件转换为浏览器兼容的js 文件

* Loader 需要在webpack.congig.js 中的 modules 的关键字进行配置

> test, loader, include/exclude,query

### 解析css： css-loader, style-loader
 * css-loader 用来加载.css 文件，并且转换成commonJs 对象
 * style-loader 将样式通过style 标签插入到 head 中
 * loader 调用是链式调用，从右向左，所以 先调用 css-loader 解析css,然后将解析好的css传递给style-loader .

 ```
 rules:[
     {
         test:/.css$/,
         use:['style-loader','css-loader']
     }
 ]
 ```
 ### 解析less： 在前面的基础之上 增加一个 less-loader
  ```
 rules:[
     {
         test:/.css$/,
         use:['style-loader','css-loader','less-loader']
     }
 ]
 ```

 ### 解析字体图片 ：file-loader



## Babel 
* 其实是一个编译js 的一个平台
* 让你可以使用 最新的ES7 ES8不用管新标准是否 可以使用，浏览器是否可以支持
* 让你可以使用基于JS 进行拓展的语言 比如REact 的JSX
* babel 其实是几个模块化的包，核心的功能是 babel-core  
> @babel/core  @babel/preset-env  @babel/preset-react

* 配置的时候可以选择在 在 .babelrc 文件里面 配置。webpack 会自动调用配置选项

## 模块 化

* css 和 图片 都通过合适的loader 都可以处理

## css
  css-loader 和style -loader ，css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中

### css module
* css module 的技术意在把JS的模块化思想带入CSS中来，通过CSS模块，所有的类名，动画名默认都只作用于当前模块。Webpack对CSS模块化提供了非常好的支持，只需要在CSS loader中进行简单配置即可，然后就可以直接把CSS的类名传递到组件的代码中，这样做有效避免了全局污染。具体的代码如下

```

module.exports = {

    ...

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }
                ]
            }
        ]
    }
};

```

### css 预处理器

* 举例来说如何使用PostCSS，我们使用PostCSS来为CSS代码自动添加适应不同浏览器的CSS前缀。
> 首先安装postcss-loader 和 autoprefixer（自动添加前缀的插件）

## Plugins 插件
> 插件 是用来 拓展webpack 功能，有时候 Loader 和Plugin 常常被混，可以这么说Loader 是打包构建的过程中用来 

### 使用插件的方法
* 使用某个插件要 npm 安装 然后在webpack 配置中plugins
 关键字部分 添加改插件的实例

 ```
 const webpack = require('webpack');

module.exports = {
...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究')
    ],
};


 ```

 ###  HtmlWebpackPlugin 
 > 这个插件的作用是依据一个简单的 index.html 生成一个自动引用你打包后的js 文件的新的 index.html，这在 每次生成的js 文件名称不同的时 非常有用（比如添加 hash 值）

 ### HotModuleReplacementPlugin

 > Hot Module Replacement（HMR）也是webpack里很有用的一个插件，它允许你在修改组件代码后，自动刷新实时预览修改后的效果。

* 在webpack配置文件中添加HMR插件；
* 在Webpack Dev Server中添加“hot”参数；

具体实现的方法如下：
* Babel 和webpack 是独立的工具
* 二者可以一起工作
* 二主 都可以通过插件拓展功能
* HMR是一个webpack插件，它让你能浏览器中实时观察模块修改后的效果，但是如果你想让它工作，需要对模块进行额外的配额；
* Babel有一个叫做react-transform-hrm的插件，可以在不对React模块进行额外的配置的前提下让HMR正常工作；

#### 配置方法：
```
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
};


```


### 打包后缓存

> 缓存无处不在，最好的方法就是保证你的文件名和文件内容是匹配的（内容修改了，名称也响应的改变）

* webpack可以把一个哈希值添加到打包的文件名中，使用方法如下,添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前



```

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
..
    output: {
        path: __dirname + "/build",
        filename: "bundle-[hash].js"
    },
   ...
};


```


----

### webpackJsonp
> 用于从异步加载的文件中安装模块

###  HtmlwebpackPlugin 输出index。html到output

###  CleanWebpackPlugin 每次build 清空output 目录

### MiniCssExtractPlugin 分离单独的css 到 output

### optimization 是webpack4 新增的一个配置选项
> 主要是处理生产环境的下各类的优化 比如压缩 提取公共代码
 以下是分包的配置：
```
{
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
```




##  webpack tapable类中 常用的 钩子函数 

* 


------






