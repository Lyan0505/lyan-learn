## module.exports、exports、export、export default之间的关系和区别

## CommonJS


> CommonJS 的核心的思想是通过require方法来同步加载依赖的其他的模块，通过module.exports 导出需要暴露的接口，根据这个规范，每个文件都是一个模块，有自己的作用域，有自己的作用域，在一个文件里面定义的变量、函数、类都有私有的，对其他文件不可见。

> CommonJS定义的模块分为: 模块标识(module)、模块定义(exports) 、模块引用(require)


### module.exports

```
let aa='12332';
let get=function(id){
  return id*2
}

module.exports={
  aa,bar
}

-----

let utils=require('./utils')
console.log(utils.aa)
console.log(utils.get(2))

```


### exports 
* 为了方便 Node 为每个模块提供一个exports 变量，指向module.exports 


> let exports = module.exports;

> exports = module.exports = {}; 指向一块内存区域，export 只是module.exports 的引用，辅助后者添加内容用的，尽量都用module.exports 导出，用require导入

>

> 不能将 exports 变量指向一个值，因为这样等于切断exports 与 module.exports

```

let exports = module.exports
let appId = '123456'
// 错误写法
exports = {
	appId
}
// 正确写法
exports.appId = appId


```

## ES6 模块规范

> 不同于 CommonJS ，ES6 使用export 和import 来导出和导入

### export

```

// utils.js
export const appid = '123234'
export function getAppid() {
  return '123456'
}

-------------------------------------------------

// 导出的几种方式：
import { appid , getAppid } from './utils' // 导入多个导出
import * as utils from 'utils' // 作为命名空间导入整个模块
console.log(appid) // 123234
console.log(getAppid ()) // 123456


```

### export.default
>  为模块指定默认输出 

```
// 错误写法
export default const AA = '123456'
// 正确写法
const AA = '123456'
export default AA

----------------------------------------------------

import utils from './utils' // 导入默认值
console.log(utils) // 123456
————————————————


```


```
import { foo, bar } from ‘./utils’ // 导入多个导出
import * as utils from ‘utils’ // 作为命名空间导入整个模块
import utils from ‘utils’ // 导入默认值
import utils , { foo , bar } from ‘./utils’ // 导入多个导出与默认导出
import { foo , bar } , * as utils from ‘utils’ // 导入命名空间整个模块与多个导出
import(’./utils’).then (res) => { // do something} // import动态导入函数，当使用它的时候，会返回一个promise。
let module = await import(’./utils’) // 支持await关键字

```

### export 和export default 的区别

* 均可导出常量，函数文件和模块等
* 在一个文件或者模块中，export,import 可以有多个，export default 仅有一个
* 通过export 方式导出，在导入的时候加{} ，export default 仅有一个
* export 能直接导出变量表达式，export default 不行

 

### import

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import


