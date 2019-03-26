## webpack 构建 流程
> webpack 整体是一个插件的架构，所有的功能都是插件的方式集成在构建流程中，通过发布订阅来触发各个插件的执行，webpack 的核心使用Tapable

### webpack 关键节点对应的事件
* entry-option 初始化 option
* run 开始编译
* make 从entry 开始递归的分析依赖模块进行build
* before-resolve -after-resolve 对其中的一个模块进行解析
* build-module 开始构建这个module 这里将使用文件对应的loader加载
* normal-module-loader 对用loader加载完成的module(是一段js代码)进行编译,用 acorn 编译,生成ast抽象语法树
* program 开始对ast进行遍历，当遇到require等一些调用表达式时，触发call require事件的handler执行，收集依赖，并。如：AMDRequireDependenciesBlockParserPlugin等
* seal 所有依赖build完成，下面将开始对chunk进行优化，比如合并,抽取公共模块,加hash
* emit 把各个chunk输出到结果文件

----

> webpack 准备阶段
> modules 和chunks 的生成阶段
> 文件生成 阶段


### webpack 准备工作
*  当我们 运行webpack 的时候就会创建Compiler 实例并且加载内部插件，这里跟构建流程相关性比较大的内部插件是 EntryOptionPlugin
* EntryOptionPlugin 会解析webpack 配置中的entry 属性,然后生成不同的插件应用到Compiler实例上，不管哪个插件内部都会监听Compiler 实例对make任务点

> 这里的make  任务点将成为后面解析modules和chunks的起点

* 当Compiler实例加载完成之后，下一步就会直接调用compiler.run方法来启动，值得注意的是此时只有options 属性是解析完成的

* run 一旦执行就开始了编辑和构建流程 其中比较关键的几个webpack 事件节点
   * compile 开始编译
   *  make 从入口点分析模块及其依赖的模块，创建这些模块对象
   *  build-module 构建模块
   *  after-compile 完成构建
   *  seal 封装构建结果
   *  emit 把各个chunk输出到结果文件
   *  after-emit 完成输出


* 接下来Compiler 对象开始实例化两个核心工厂的对象 NormalModuleFactory 和 ContextModuleFactory。 这两个对象工厂会在任务点compile 触发时传递过去，所以任务点compile 是间接监听这两个对象任务点的一个入口





```
module.exports = class EntryOptionPlugin {
	/**
	 * @param {Compiler} compiler the compiler instance one is tapping into
	 * @returns {void}
	 */
	apply(compiler) {
		compiler.hooks.entryOption.tap("EntryOptionPlugin", (context, entry) => {
			if (typeof entry === "string" || Array.isArray(entry)) {
				itemToPlugin(context, entry, "main").apply(compiler);
			} else if (typeof entry === "object") {
				for (const name of Object.keys(entry)) {
					itemToPlugin(context, entry[name], name).apply(compiler);
				}
			} else if (typeof entry === "function") {
				new DynamicEntryPlugin(context, entry).apply(compiler);
			}
			return true;
		});
	}
};
```
* 当compilation 实例创建完成之后，webpack 准备工作已经完成，下一步将开始modules 和chunks 的生成阶段


### modules 和chunks 的生成阶段

> 这个阶段的主要内容，是先解析项目依赖的所有的modules ，再根据modules生成chunks;
modules解析主要包含： 创建实例、loader应用以及依赖手机 chunks 生成，主要步骤找到chunk 所需要包含的modules
> chunks 生成，主要的步骤就是找到chunk所需要包含的modules

*  上一个阶段完成，任务点 make 触发，此时内部插件 SingleEntryPlugin 的监听器开始执行，监听器调用Compilation 实例的 addEntry 方法，该方法将第一批module 解析

 #### modules 解析过程
 * 第一个步骤是创建 NormalModule 实例
  > NormalModuleFactory 的creat 方法 创建 NormalModule 实例的入口 主要解析的 module 需要用到一些属性
    比如要用到的 loaders, 资源路径 resource 等等 将解析完的参数给 NormalModule 构建函数直接实例化
 * 在创建完 NormalModule 实例之后会调用 build 方法继续进行内部的构建
   > 这时候loader 将会开始使用， 应用 loaders 的过程相对简单，直接调用了 loader-runner 这个模块
   > NormalModule 最终都是js 模块，所以loader 作用之一就是将不同的资源文件转为 js 模块
   > 我们需要得到这个 module 所依赖的其他模块，所以就有一个依赖收集的过程。webpack 的依赖收集过程是将 js 源码传给 js parser
   * parser 将 js 源码解析后得到对应的AST。 然后 webpack 会遍历 AST，按照一定规则触发任务点
   > 有了AST的任务点，依赖收集就相对简单了。比如遇到任务点 callrequire，说明在代码中是有调用了 require函数，那么就应该给 module 添加新的依赖。
   * 当 parser 解析完成之后，module 的解析过程就完成了，就会触发任务点 succeed-module。。最终我们会得到所有依赖的module，此时任务点 make 结束
   * Compialtion 实例的 seal 方法会被调用并马上触发任务点 seal。 webpack 会开始生成 chunks
####  chunk  生成
* webpack 先将entry 对应的 module 生成一个新的 chunk
* 遍历 module 的依赖列表，将依赖的 module 也加入到 chunk 中
* 如果一个依赖 module 是动态引入的模块，那么就会根据这个 module 创建一个新的 chunk，继续遍历依赖
* 重复上面的过程，直至得到所有的 chunks

#### 对module 和chunk 进行优化 操作
* 这些任务点一般是 webpack.optimize 属性下的插件会使用到


###  文件生成
>根据chunks 生成最终文件 :模板hash 更新，模板渲染chunk，生成文件

###  webpack 基本框架
* webpack的基础架构 是基于一种类似时间的方式，webpack 的大部分功能通过注册任务点的方式来实现。
* 在我们运行 webpack的时候 会注册 一个Compiler 实例，然后 调用WebpackOptionsApply这个模块给 Compiler添加插件


---- 

###  hansh 和 chunkhash 的问题

* 如果使用hansh 对js css 签名每次都不一样，这样导致无法利用缓存，

* hansh 在js 和css 中不实用，所以在项目中所有的文件都准备了
chunkhansh ，但是img 和font等资源中使用了chunkhash 会报错：因为chunkhash 只适用js 和css img 中没有这种东西，仍然需要hash

* 打包时发现，js和js引入的css的 chunkhash 是相同的，导致无法区分css和js的更新，如下

> webpack 把css 当成js 的一部分，所以计算chunkhash 是混合在一起计算的，解决的办法： css是使用 ExtractTextPlugin 插件引入的，这时候可以使用到这个插件提供的 contenthash，


```
  new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
```


* 在webpack 中配置 CommonsChunkPlugin 时需要注意
    
    *  配置webpack的output项时,filename 和 chunkFilename 必要使用chunkhash 不要使用hash，否则
    * 对于抽取的css样式文件，需要使用contenthash, 与file-loader中的hash意义相同。此处不能为chunkhash，否则其与抽取该样式文件的entry chunk的chunkhash保持一致，打不到缓存的目的


































