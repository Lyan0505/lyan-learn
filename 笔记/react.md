## JSX
* 是js 的一种扩展
* 编译之后jsx 会转为 普通的js 对象
* 大括号来定义以 JavaScript 表达式为值的属性
* JSX 的特性是比较接近JS 而不是HTML ，react Dom 使用小驼峰命名 cameCase
* class 变成className 而tabindex 则对应tabIndex （JSX class 关键字）

# 生命周期
> react 生命周期 分为三种状态 初始化》 更新 》销毁
### 初始化
* getDefaultProps
* getInitialState() 此时可以访问props
* componentWillMount() 组件初始化的视乎调用，以后组件更新不调用，整个生命周期只调用一次，此时可以调用 state
* render()  最重要的步骤 就是创建虚拟Dom 进行diff 算法，更新dom 树 都在此进行。此时不能修改 state
* componentDidMount()组件渲染之后调用


---
### 更新

* componentWillReceiveProps() 接受新的prop 时候调用
* shouldComponentUpdate( nextProps,nextState)  组件接受新的state 或者props 然后 对比以前的 是否相同，如果相同 则返回false 阻止更新
* componentWillUpdata(nextProps, nextState) 组件更新时候调用，此时可以调用 state
* render()
* componentDidUpdate() 组件初始化不调用 然后 组件更新完成时候调用，此时可以修改 state

---

### 卸载
 * componentWillUnmount()


> 执行顺序 由上而下 也就是说获取外部数据加载到组件上，只能在组件已经挂载到真实网页才可以。否则 加载不到组件
* componentDidMount() 组件已经挂载到网页上才会被调用执行，

## 组件传值

>如果使用事件模式，是可以解决组件之间的回调，但是频繁的使用 会使整个程序数据流 越来越乱，尽量遵循单项数据流


### 父>子
> 通过props 将数据传给子组件

> context 可以让子组件访问组件的数据，无需从祖先组件一层一层传递

```
class Parent extends component{
     getChildContext() {
        return {color: "purple"};
     }
    render(){
        const children = this.props.messages.map((message) =>
          <Button text={message.text} />
        );
        return <div>{children}</div>;
    }
}

Parent.childContextTypes = {
    color:PropTypes.string  
}

```



```
class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string
};
```

> 父组件添加getChildContext() 方法 和childContextTypes 属性。 react 会自动将color 传递给子树组件中的任何组件。不过子组件必须定义 contextTypes 属性不然 获取到context 为空；



### 子>父
> 父组件 通过props 一个callback 传给子组件，子组件内调用这个callback 即可改变 父组件的数据


### 兄弟之间



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

* setState 不同于props 的一点就是，state 是可以被修改的
* setState 可以接受两个参数，第二个是一个函数，会在setState调用完成并且开始重新渲染的时候 被调用，可以用来监听 是否完成；
* props 是外部传入的数据参数，是不可变的；
* 没有state 的叫做无状态组件，有state 的叫做有状态组件；
* 


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


## 表单
* 在react 可变的状态通常保存在组件的状态中，只能用setState() 方法进行更新；
* 受控组件，每个状态都有一个与之相关

## 非受控组件
* 没有添加value 属性的组件


## 受控组件
* 就是为某个表单组件添加value属性
```
render: function() {
    return <input type="text" value="Hello!" />;
  }
```
* 组件的value 值一旦设置某个具体的值，需要调用者来控制组件的value 的改变
* 渲染后的input组件的用户交互，用户输入的任何值将不起作用，input输入框中的值始终为Hello!。这与HTML中input表现不一致
* 为了控制组件的值，需要控制内部的state ，即组件内部要维护一个状态state以便配合input组件的onChange和setState方法来完成对组件的控制

>受控元素：一般用在需要动态设置初始值的情况，
> 非受控元素：一般用于无任何状态初始值信息的情况，例如：from 表单创建信息时，input 表单元素 没有初始值，需要用户输入；

## 组合继承 
* 组件 直接使用children 将子元素 直接传递出去；
* 有时候组件有多个入口的时候 ，自己可以使用自己约定的属性；
```
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}

```
## react 理念

> React 数据流是单向的，并在组件层次向下传递。 所以state 的位置？

* 
* 
## 深入JSX
* JSX 编译后会调用 React.creatElement 方法，所以在你的JSX 要首先声明react 变量;

* 组件建议大写开头，小写开头 的标签名会认为是HTML 原生标签；
* if 语句和for 循环 在js 中不是表达式，所以不能直接在JSX 中使用，但是可以放在周围的代码中
* 将字符串变量作为属性值传递
* 如果你已经有了个props 并且想在JSX 传递它，你可以使用... 作为扩展操作符来传递整个属性对象，可以
* 






























