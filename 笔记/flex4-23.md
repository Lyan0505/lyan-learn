## flex 
* 今天面试 的时候一般都会问到布局的问题，左边固定宽度 右边自适应的布局方式（一般都能打出来 ） 我常用的也就是float ；没有总结过，方法有很多中；
## 左边固定宽度 右边自适应；
*  .left{ float:left} .right{width:100%}
* 外面盒子{display:flex;} .left{width:100px} .right{flex:1}  display：flex; 设置为弹性盒子，其子元素可以通过设置 flex 的数值来控制所占空间的比例
* 设置浮动 + 在 css 中使用 calc() 函数;
> .left{ float:left}  .right{ float:left; width:calc(100% - 200px)}

* 使用 负 margin

* [demo 左边定宽 右边自适应](./flex4-23.html)

## flex -webkit-box box-flex -webkit-flex
* 一直对这几个 有种傻傻不清楚的感觉；
* flex 是2012年的语法
* box 是2009年的 已经过时 是需要加上对应前缀的
```
    display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
    display: -moz-box; /* Firefox 17- */
    display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
    display: -moz-flex; /* Firefox 18+ */
    display: -ms-flexbox; /* IE 10 */
    display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */

[链接](https://www.zhihu.com/question/22991944/answer/23302749)

以上不一定正确 知识参考
```

* 其实 flexbox 实施的时间不同 各自也有不可替代的地方；
* dispaly：flex 可以参考 [https://css-tricks.com/snippets/css/a-guide-to-flexbox/](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

> Android UC浏览器只支持display: box语法。而iOS UC浏览器则支持两种方式（同一家公司的浏览器，由于平台不一样，支持程度还不一样，也是醉了）

* display:box; 作用下，float、clear、text-align、vertical-align 仍起作用。 

* display:flex; 作用下，上述四属性失效。