## CommonJs 和ES6模块 分析：
### CommonJs
* 对于基础数据类型，属于赋值；也就是 会被模块缓存，在另外一个模块可以对该模块输出的变量进行重新赋值
* 对于复杂数据类型，属于浅拷贝。由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。
* 当使用require命令加载某个模块时，就会运行整个模块的代码
* 当使用require命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
* CommonJS 规范的主要适用场景是服务器端编程，所以采用同步加载模块的策略
* 该模块 包含 require 和module 关键字段
* 


### ES6模块
* ES6模块中的值属于【动态只读引用】。
* 对于只读来说，即不允许修改引入变量的值，import的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到import命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值
* 对于动态来说，原始值发生变化，import加载的值也会发生变化。不论是基本数据类型还是复杂数据类型。
* 循环加载时，ES6模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行。


### ES7
* ES7在ES6的基础上添加了三项内容：求幂运算符（**）、Array.prototype.includes()方法、函数作用域中严格模式的变更。
*  3**2  效果等同于 Math.pow(3,2)

### ES8 Async function(异步函数)

```
变体
异步函数存在以下四种使用形式：

函数声明： async function foo() {}
函数表达式： const foo = async function() {}
对象的方式： let obj = { async foo() {} }
箭头函数： const foo = async () => {}
```



### 箭头函数 和 普通函数  以及this

* js 函数中的this 不是函数声明的时候定义的，而是在函数调用的时候定义的

* 箭头函数中的this ：
 箭头函数 内部其实没有this ，它会捕获上下文的this 作为自己的this；
 函数体内的this 对象 就是定义是所在的对象，而不是使用是所在的对象；
 this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数；


* ES5规范中，this 对象指向是可变的，但是ES6 的箭头函数 中，this 是固定的


* react 也遵循 js 的 特性：  render()以及componentDIdMount()、componentDIdUpdate()等其他生命周期函数中的this都是组件实例；




```
第一种
 <button onClick={this.handleClick.bind(this)}>
    Click me
  </button>


```

```
第二种
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}


```
第三种
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}


```

```
   * 这样绑定this 每次组件渲染onClick 的回调函数 都是不同的匿名函数，如果组件的回调函数通过props 传递到 子组件中那么由于 每次props 变化 都会导致 子组件的额外的渲染
   * bind 和 上面的情况是一样的 都会生成一个新的回调函数
   * 建议使用第三种 除非需要传额外的参数



