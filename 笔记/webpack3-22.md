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