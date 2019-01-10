#  Mobx

### mobx 问题记录

### 一个由mobx observer引发的React Route路由
### 问题描述：
> 页面 有路由 做切换，NavLink ，点击左边的侧边栏，切换路由的时候，虽然 Url 信息发生了变化但是页面没有刷新

### 问题分析：
* 首先我们通过history.listen(()=>{})观察发现，用户触发Link点击事件时，路由变化被我们的回调函数所捕获。问题并不可能出现在Link 和 listen过程。
* 在Router这个组件中创建history.listen回调的。当Url发生变化，触发history.listen注册的回调后，会通过修改state, 触发Router Render过程，默认情况下，会触发他的子组件Render过程。而当Route发生componentWillReceiveProps时，会通过Router的getChildContext方法，拿到变化的URL。
* 通过Debug我们发现，TopBar的render，Switch, Route的render过程都没有触发。而TopBar中有部分状态托管在mobx model中，所有问题差不多可以定位到：因为TopBar外层封装了observer，而observer又会重写shouldComponentUpdate，shouldComponentUpdate拦截了后续render过程，导致没有触发到后续Route组件的shouldComponentUpdate过程

### 问题解决：
* React Router提供了一个Hoc组件withRouter，利用此组件可以将location注入到TopBar中:

* 或者
```
import React, { Component } from 'react'
import { NavLink ,withRouter} from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import './header.less'

@withRouter
@inject('store')
@observer
class Header extends Component {

}
```



---
### observer
* 从代码层面来看, 主要针对ComponentDidMount, componentWillUnmount, componentDidUpdate(mixinLifecicleEvents)三个接口进行修改。同时如果用户没有重写shouldComponentUpdate, 也会优化shouldeComponentUpdate
