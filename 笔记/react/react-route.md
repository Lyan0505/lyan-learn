# react-route
> 其实一句话 就是实现 URL 和UI 界面同步，Url 对应的是 location 对象，而UI 对应的是react components 来决定 这样就能达到同步

## React Route 的核心依赖History

## Link Router Switch Route
### Link

### Router
* Router组件的是整个路由结构中顶层组件，其主要作用是通过监听history.listen,捕获路由变换，并将其置于React Context中，其核心代码如下:

### Route
* 这应该是整个React Router中最核心的功能了。基本作用就是从context中捞取pathname并与用户定义的path进行匹配，如果匹配成功，则渲染响应组件。

### Switch 
* Switch的作用是渲染第一个子组件(<Route>, <Redirect>)
* 遍历子组件 的props ,只渲染 第一个匹配到pathname 的Route



### API 层面大大致流程:

![tupian](/img/WechatIMG160.png)

![avatar](http://baidu.com/pic/doge.png)






