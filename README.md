# lyan
前端开发 一些基础 零碎的笔记
## 整理的笔记：
### map forEach 区别？
  * map 的回调函数中支持return 不影响原来的数组，相当于clone 一份；
  * forEach 按照顺序一个一个来具体怎么操作无所谓；forEach(当前项，当前位置，原始数组) forEach 方法中的this 是arr 回调函数中的this 默认是window
 * map() forEach() filter() reduce()  会跳过空位但是会保留这个值，join()和toString()会将空位视为undefined
### defer和async的区别？
  * 没有defer和async的时候，立即加载并执行指定的脚本
  * 相同：两者都是异步的；不同的是：它俩的差别在于脚本下载完之后何时执行
  * 因为浏览器在遇到script标签的时候，文档的解析会停止，不再构建document，有时打开一个网页上会出现空白一段时间，浏览器显示是刷新请求状态(也就是一直转圈)，这就会给用户很不好的体验，defer和async的合理使用就可以避免这个情况，而且通常script的位置建议写在页面底部(移动端应用的比较多，这两个都是html5中的新属性)。
  * 没有这2个时候：文档解析停止，并立即下载并执行脚本
  * async模式：文档解析不会停止，其他线程将下载脚本，脚本下载完成后开始执行脚本，async 则是一个乱序执行的主
  * defer属性，加载后续文档的过程和js脚本的加载(此时仅加载不执行)是并行进行的(异步)，js脚本的执行需要等到文档所有元素解析完成之后，DOMContentLoaded事件触发执行之前。

### document.ready和onload的区别?
  * 一是ready，表示文档结构已经加载完成（不包含图片等非文字媒体文件）
  * 二是onload，指示页面包含图片等文件在内的所有元素都加载完成。
  * $(function(){}) 这个其实就是jq ready（）的简写
  * 一般情况下 页面响应的顺序是，域名解析》加载html》加载js和css》加载图片等其他的信息
  * window.onload=function(){//do }
  * Dom Ready是在dom加载完成后就可以直接对dom进行操作，比如一张图片只要<img>标签完成，不用等这个图片加载完成，就可以设置图片的宽高的属性或样式等；
Dom Load是在整个document文档（包括了加载图片等其他信息）加载完成后就可以直接对dom进行操作，比如一张图片要等这个图标加载完成之后才能设置图片的宽高的属性或样式等；
比如一个图片浏览的效果，通常如果图片尺寸很大的情况下，为了防止图片把页面撑开通常会限定图片的宽度或高度，如果是单张图片或者是多张规格比例统一的图片下我们可以直接在<img>上价格宽度或者高度的属性<img src=“img.jpg” alt=”码头的大照片” width=“100” height=“90”>，比如（推荐）或者可以在css样式中加宽度或者高度的属性。但是如果这些张规格比例不统一的图片要浏览呢？那就有问题，你设置宽高很可能造成图片严重失真。在ie6之后ie7，ie8还有其他主流浏览器支持css2.1中min-width，max-width，min-height，max-width，这样我们就可以用min-width，max-width，min-height，max-width解决这些问题，但是ie6除非是抛弃性能问题用css表达式（当然old9(http://old9.blogsome.com/2008/10/26/css-expression-reloaded/)和怿飞(http://www.planabc.net/2009/09/21/optimization_of_css_eexpression/)有关于css表达式性能问题的解决方案,大家可以看一下）。这个时候ie的做好解决方案就是用Dom Ready而不是Dom Load，因为通常大图片加载的时候会一点一点的加载，这个在尺寸大，字节多，网速慢的时候表现的非常明显，用Dom Load，通常是先把页面撑开，加载完成后再把图片重设宽高，图片加载多少时间，这个页面就会撑开多久，用户会非常难受！！
这点可以看我做的一个的一个小demo：http://www.css88.com/demo/domready/(注意第二次测试的时候要清除缓存)
 
