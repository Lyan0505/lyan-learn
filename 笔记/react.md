## JSX
* 是js 的一种扩展
* 编译之后jsx 会转为 普通的js 对象
* 大括号来定义以 JavaScript 表达式为值的属性
* JSX 的特性是比较接近JS 而不是HTML ，react Dom 使用小驼峰命名 cameCase
* class 变成className 而tabindex 则对应tabIndex （JSX class 关键字）
## 组件定义
* 组件名字必须大写字母开头
* 使用组件的时候引用或者定义
* 组件的返回值只能有一个根元素，（vue也是） 要用div 包裹

## 将函数扩展为类

* 创建一个名称为 React.Component
* 创建一个render 方法
* 将函数体一到render 的空方法中
* 在render()方法中，使用this.props 替换props


```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

```
> 此时Clock定义为一个类 而不是一个函数，使用类 允许使用其它的特性。

## 为一个类添加局部的状态

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
> componentDidMount && componentWillUnmount

## 状态变更

* 不能直接修改，如果直接修改的话，不会重新渲染 组件
* 应该使用setSate
* 构造函数 是唯一一个初始化this.state 的地方
* this.props 和this.state 可能是异步的，此时应该接受一个函数 而不是一个对象，先前的状态作为第一个参数，更新被应用时的props

```
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));

```
## 事件处理
* React 事件绑定属性的命名采用驼峰写法， 而不是小写
* 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数

```
<button onclick="activateLasers()">
  Activate Lasers
</button>

react 写法：

<button onClick={activateLasers}>
  Activate Lasers
</button>

```
> 阻止默认行为： 初始写法 可以采用false  react ：必须明确 使用preventDefault 

```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

```

> 必须谨慎对待JSX 回调函数中的this，类的方法 是不会绑定this 的，如果你忘记绑定this.handleClick,,调用函数的时候 this 的值会是undefined
> 如果绑定this 很烦；可以使用初始化器 来绑定回调函数； 或者在回调函数中使用剪头函数

```
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

> 补充遗忘的点 箭头函数 this： 箭头函数 没有自己的this 是继承来的 

```
function foo(){
    setTimeout(()=>{
        console.log(this);
    },100);
}
foo();

foo() 被window 调用foo() 函数作用域中的this 也是window ，剪头函数和父级函数共享this 所以结果还是window

```

## 条件渲染

*  创建 状态组件
* &&  true&& express 返回 express ;false&&express 返回false 也就是说，如果前面一个成立,&& 右边才会执行


```
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

```
* 三目运算
```
{isLoggedIn ? 'currently' : 'not'}

```
## 阻止组件渲染

*  如果想要不渲染的时候 可以 调用 render 返回null
*  组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调

## 基础列表组件
* 循环渲染，key
* 用key 提取组件，提取组件的时候key 应该放在 提取的组件上而不是放在 组件内的li 上
* 当map() 方法 的内部调用方法，最好在每一个元素上加上独一无二的key
* 

## 表单














