# Babel 
## Babel是一个 JavaScript 编译器
> Babel 是一个编译器（输入源码=>输出编译后的代码） ,就像其他的编译器一样，编译过程分为三个阶段：
解析-> 转换 -> 打印输出

> babel 可使用各种花样去使用的编译器，因此默认情况下它反而什么都不做，必须要告诉他要做什么
所以要安装插件 plugins 和 预设（presets，也是一组插件）

> Babel 用了优秀的 core-js 用作 polyfill，并且还有定制化的 regenerator 来让 generators（生成器）和 async functions（异步函数）正常工作

> babel 分为三个阶段：parsing、transforming、generating 以ES6代码转译为ES5代码！plugins 用于转译的过程，尤其是transforming

> ES6 代码输入 => babylon 进行解析 => 得到AST树 => plugin 用babel-traverse 对AST 树进行遍历转译 => 得到最新的AST => 用babel-generator通过AST树生成ES5代码


## Babel 的包构成

###  核心包

* babel-core ： babel 转移器本身，提供babel 的转译API
* Babylon ： js 的词法解析器
* babel-traverse：用于对AST（抽象语法树）的遍历，主要给plugin 用
* babel-generator ：根据AST 生成代码


### 功能包

* babel-types：用于体验、构建和改变AST树的节点
* babel-template：辅助函数，字符串形式的代码来构建AST 树节点
* babel-code-frames：用于生成错误信息，打印出错误点源代码帧以及指出出错位置

### babel-core

* 如果你需要使用编程的方式使用Babel
* babel-plugin-xxx：babel转译过程中使用到的插件，其中babel-plugin-transform-xxx是transform步骤使用的
* babel-preset-xxx：transform阶段使用到的一系列的plugin
* babel-polyfill：JS标准新增的原生对象和API的shim，实现上仅仅是core-js和regenerator-runtime两个包的封装
* babel-runtime：功能类似babel-polyfill，一般用于library或plugin中，因为它不会污染全局作用域

### 工具包
* babel-cli：babel的命令行工具，通过命令行对js代码进行转译
* babel-register：通过绑定node.js的require来自动转译require引用的js代码文件


----

### babel-preset
* babel-preset 只支持特殊语法的编译，比如说箭头函数，解构等。但是具体的函数方法是不会编译的。需要引入额外的垫片

### babel-preset-env


### babel-plugin

* babel-preset 是babel-plugin 的集合

### babel-polyfill
* 他是入侵的，污染原来代码的方式，完全模拟一个ES2015的环境，包含了core-js和regenerator runtime

> 当引入它，整个垫片库都会被引入(比较大)，但是一劳永逸


* @babel/polyfill  模块包含 core-js 和自定义 regenerator runtime 
> 这就意味着 你可以使用 Promise 或者 WeakMap 这样新的内置的函数，像 Array.from 或 Object.assign 这样的静态方法，像Array.prototype.includes 这样的实例方法，以及 generator 函数（提供给你使用 regenerator 插件）

> npm install --save @babel/polyfill

* 有一个 useBuiltIns 选项，当设置为‘usage’时，实际上将应用上面提到的最后一个优化，只包括你需要的 polyfill，如果没有这个设置，就必须在其他代码之前require 一次完整的 polyfill

> 我们使用 @babel/cli 从终端运行 Babel，@babel/polyfill 来实现所有新的 JavaScript 功能，env preset 只包含我们使用的功能的转换

### babel-runtime
* 可以没有全局污染的按需引入，使用内置的语法比如Promise，set，Symbol 等，
* 自动引入 babel-runtime/regenerator 当你使用了 generators/async 函数
* 自动引入 babel-runtime/core-js 中的你具体使用的es6特性
* 移除内联的 Babel helpers 使用 babel-runtime/helpers 替代
* 由此也可见，babel-runtime就是一个提供了regenerator、core-js和helpers的运行时库
* 建议不要直接使用babel-runtime，因为transform-runtime依赖babel-runtime，大部分情况下都可以用transform-runtime达成目的。



### polyfill和runtime 区别
* ployfill 是会污染全局环境的，这样很容易发生冲突，这个时候babel-runtime 就可以派上用场了
* runtime 是不会污染全局的空间，所以实例方法是无法工作的，（因为这个必须在原型链上添加这个方法，这是和polyfill 最大的不同）
* core-js包才上述的polyfill、runtime的核心，因为polyfill和runtime其实都只是对core-js和regenerator的再封装，方便使用而已


### transform-runtime和babel-runtime
* babel-runtime 是真正提供runtime 环境的包，也就是transform-runtime 插件是js 代码中使用到的新的原生对象和 静态方法转换成runtime 实现包的引用，
* 

### 转换插件
> 转换插件 将启用相应的语法插件，因此你不必同事指定这两种插件

### 插件顺序
* 插件的顺序很重要
* 插件在Presets 前运行
* Preset 顺序是颠倒的（后往前），这是官方帮我们做的一些预设的插件集合

```
{
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```
> 从前往后执行 ：transform-decorators-legacy ->transform-class-properties
> 每个插件都是可以

```
{
  "presets": ["es2015", "react", "stage-2"]
}

```

> 按照执行顺序 ：后往前 （都可以接受参数）



