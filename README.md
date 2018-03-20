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
### 创建函数的几种方式：
   * 声明函数；
   * 创建匿名函数表达式；
   * 创建具名函数表达式
   * function 构造函数；
   * 自执行函数；
### 数组常用的方法：
   * shift() 删除数组的第一项，返回删除项；如果数组为空则返回undefined；改变原来的数组； 
   * unshift() 相反，添加到数组的开头；返回的是添加之后数组的长度，也是改变数组的操作；
   * pop() 删除最后一项，返回删除的项
   * push() 从数组的尾部添加，返回的是数组的长度；
   * join() 将数组元素 组起成一个字符串，中间是分割符号；
   * sort() 排序 从小到大 实际上比较的也是字符串，因此会出现不准确； 为了解决可以接收一个比较函数，元数组也是会改变的
   * reverse()  反转数组的顺序
   * concat()  将参数添加到原数组中。这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。在没有给 concat()方法传递参数的情况下，它只是复制当前数组并返回副本
   * splice()
       * 很强大的数组方法，它有很多种用法，可以实现删除、插入和替换。
       
      * 删除：可以删除任意数量的项，只需指定 2 个参数：要删除的第一项的位置和要删除的项数。例如， splice(0,2)会删除数组中的前两项。
         插入：可以向指定位置插入任意数量的项，只需提供 3 个参数：起始位置、 0（要删除的项数）和要插入的项。例如，splice(2,0,4,6)会从当前数组的位置 2 开始插入4和6。
       *  替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定 3 个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如，splice (2,1,4,6)会删除当前数组位置 2 的项，然后再从位置 2 开始插入4和6。


      > splice()方法始终都会返回一个数组，该数组中包含从原始数组中删除的项，如果没有删除任何项，则返回一个空数组。


   * slice()  返回从原数组中指定开始下标到结束下标之间的项组成的新数组。slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下， slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项； 注意：原来的数组没有改变
   * indexOf() lasteIndexOf() :
    >  接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的开头（位置 0）开始向后查找。
   * forEach()
   * map()
   * filter()
   * every()  判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true。
   * reduce()
   > 这两个方法都会实现迭代数组的所有项，然后构建一个最终返回的值;传给 reduce()和 reduceRight()的函数接收 4 个参数：前一个值、当前值、项的索引和数组对象。这个函数返回的任何值都会作为第一个参数自动传给下一项。

   ### 一切都是对象：
   * 
   * //注意：typeof不能够区分对象和数组  
   *  typeof({}) === 'object'  
   *  typeof([]) === 'object'  
   * typeof(null) === 'object'  
   * typeof(undefined) === 'undefined'  
   *  typeof(0) === 'number'  
   *  typeof('0') === 'string'  
### 事件冒泡 事件捕获 事件委托：
   > 事件委托的原理就是事件的冒泡原理来实现的，何为事件冒泡呢？就是事件从最深的节点开始；事件流主要分为冒泡型事件和捕获型事件。IE浏览器目前只支持冒泡型事件，而支持标准DOM的浏览器比如火狐、Chrome等两者都支持

 ##### 为什么要用事件委托呢？
   * 我自身刚开始的理解就是，当目标的dom 元素没有渲染出来的时候绑定事件是没有作用的，就先把事件绑定外层的父元素上，然后分给目标元素上（理解错误，其实是为外层父元素绑定事件，触发目标元素的时候冒泡到外层 触发绑定的事件）
   * 那么为什么要使用事件委托呢？有什么好处呢？加入有100li每个li 都有相同的click 事件，我们最笨的方法就是for循环来遍历所有的li 然后添加事件；这样会有什么影响呢？
      * 添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，因为需要不断的与dom节点进行交互，访问dom的次数越多，引起浏览器重绘与重排的次数也就越多，就会延长整个页面的交互就绪时间 ；Dom 操作次数越多就会影响性能；除此之外每一个函数都是一个对象，每一个对象都是会占内存的，内存占用越大性能自然就是越差的；
      
      >window.onload = function(){
            var oUl = document.getElementById("ul1");
            var aLi = oUl.getElementsByTagName('li');
            for(var i=0;i<aLi.length;i++){
                aLi[i].onclick = function(){
                    alert(123);
                }
            }
        }


      > window.onload = function(){
            var oUl = document.getElementById("ul1");
        oUl.onclick = function(){
                alert(123);
            }
        } 
     * 这个是事件委托利用冒泡原理；，如果我想让事件代理的效果跟直接给节点的事件效果一样怎么办，比如说只有点击li才会触发，

    

```
      <div id="wrap" class='wrap'>
        <ul>
            <li><div style="width:100px;height:100px;background-color:#000">
                <p class="ds" style="color:#fff">dsadadsad</p>
            </div></li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
        <p class="aa">dsdsad</p>
    </div>
    <div id="wrap" class='wrap'>
        <ul>
            <li>dsa</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
       
    </div>

```
```
     js:
     var on = function (type,target,parent,callback){
         if(!target || !type || !callback){
             return false;
         }
         if(typeof type!=="string"){
             return false;
         }
         if(typeof callback !=='function'){
             return false
         }
         if(typeof(parent)!=='string'){
             return
         }
         //最后的优化
         var _callback2=function(ev){
            var _target=ev.target||ev.srcElement;
            if(_target.nodeName.toLowerCase() == target){
                callback&&callback.call(_target,ev);
            }else{
                if(ev.currentTarget.hasChildNodes(_target)){
                    callback&&callback.call(_target,ev);
                }
            }
         }
         //除此写的时候，不知道怎么下手
        var _callback  = function(ev){
            var ev=ev||window.event;
            var _target=ev.target||ev.srcElement;
            var _parese=ev.currentTarget.querySelectorAll(target);
     
            for(var i=0;i<_parese.length;i++){
                if(_parese[i]===_target){
                    callback&&callback.call(_target,ev);
                   
                }
                 //绑定目标时间的child
                 if(_parese[i].contains(_target)&&_parese[i]!==_target){
                     
                        callback&&callback.call(_target,ev);
                    }
                
            }       
        }

            var parentlist=document.querySelectorAll(parent);      
         for(var i=0;i<parentlist.length;i++){   
            var targetlist=parentlist[i].querySelectorAll(target);   
            parentlist[i].addEventListener(type,_callback2);
         } 
        
          
     }

     
     on('click','li','.wrap',function(ev){
         console.log(this);
         
      })
      // 鼠标事件没有成功 查找原因中。。。
     on('mouseover','li','.wrap',function(){
         console.log(this);
         alert(true);
     })

```

* 我们可以发现，当用事件委托的时候，根本就不需要去遍历元素的子节点，只需要给父级元素添加事件就好了，其他的都是在js里面的执行，这样可以大大的减少dom操作，这才是事件委托的精髓所在。
* 适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress。
* mouseover和mouseout虽然也有事件冒泡，但是处理它们的时候需要特别的注意，因为需要经常计算它们的位置，处理起来不太容易。
不适合的就有很多了，举个例子，mousemove，每次都要计算它的位置，非常不好把控，在不如说focus，blur之类的，本身就没用冒泡的特性，自然就不能用事件委托了



### jq 选择器的实现：
 
 #### 如何用原生js 实现jq 选择器的：
 ###### js 常用的选择器：
  * getElementById 这是最常用的选择器，通过id来定位：
  *  getElementsByName  通过名称name选取元素 返回值是一个nodeList集合
  * getElementsByTagName 通过标签名选取元素
  * getElementsByClassName className
  
  * querySelector
  * querySelectorAll
  * querySelector 和 querySelectorAll 方法是 W3C Selectors API 规范中定义的。他们的作用是根据 CSS 选择器规范，便捷定位文档中指定元素。两者不同的是querySelector返回的是一个匹配对象，querySelectorAll返回的一个集合(objNodeList )。


 ```
 document.getElementById("test");  我们也可以用

   document.querySelector("#test");
   document.querySelectorAll("#test")[0];

  ```

 
 * 获取文档中 class=”example” 的第一个 \<p> 元素: document.querySelector("p.example");
 * 获取文档中有 “target” 属性的第一个 \<a> 元素：document.querySelector("a[target]");


  ```
  var $=function(str){

    //判断参数是一个还是多个
    var ismoreOne=/\b /.test(str);
    //如果是多个的时候：
    debugger
    if(ismoreOne){
        
        var rules = [];
		   rules = str.split(" ");
           var parentNodeList=[];
          parentNodeList.push($(rules[0]));

        for (var i=1;i<rules.length;i++){
            var temp=[];
            var tempObj={};
            for (var c in parentNodeList) {
                debugger
                switch(rules[i].charAt(0))
                {
                    case "#":
                       name=rules[i].replace(/^#/,"");
                        var parentNode=document.getElementById(name);
                        return parentNode;
                    break;
                    case ".":
                       name=rules[i].replace(/^./,"");
                        var parentNode=document.getElementsByClassName(name);
                        return parentNode;

                }
            }
        }
    }else{
        var slector;
        debugger
        switch (str.charAt(0)){
            case '#':
                slector=str.replace(/^#/,'');
                return document.getElementById(slector);
                break;
            case ".":
                 slector=str.replace(/^./,'');
                 return document.getElementsByClassName(slector);

            case "[":
            //判断是否有[]

            if(new RegExp("^\\[\\w*=?\\w*\\]$").test(str)){


            }else{
                return null
            }
        }
    }
  }

 console.log($('.wrap'));
 ```


 #### 如何用原生js addClass removeClass：

```
function addClass(obj,className){
    if(obj.length){
        for(var i=0;i<obj.length;i++){
            if(!this.hasClass(obj[i],className)){
                obj[i].className+=" " +className;
            }
        }

    }else{
        if(!this.hasClass(obj,className)){
        obj.className+=" " +className;
    }
    }
   
}


function hasClass(obj,className){
    if(obj.length){
        for(var i=0;i<obj.length;i++){
            return obj[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
        }

    }else{
        return obj.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }
    
}

```


### event loop js事件循环 microtask macrotask：

  * 首先看一个面试题：
    
```
console.log('start')

const interval = setInterval(() => {  
  console.log('setInterval')
}, 0)

setTimeout(() => {  
  console.log('setTimeout 1')
  Promise.resolve()
      .then(() => {
        console.log('promise 3')
      })
      .then(() => {
        console.log('promise 4')
      })
      .then(() => {
        setTimeout(() => {
          console.log('setTimeout 2')
          Promise.resolve()
              .then(() => {
                console.log('promise 5')
              })
              .then(() => {
                console.log('promise 6')
              })
              .then(() => {
                clearInterval(interval)
              })
        }, 0)
      })
}, 0)

Promise.resolve()
    .then(() => {  
        console.log('promise 1')
    })
    .then(() => {
        console.log('promise 2')
    })

 ```

 * 首先分析一下：

    > 大家都知道js 是单线程，优先执行主线成任务，才有同步和异步的之分；
    同步任务：
    在主线程排队的任务，一个执行完成之后，才能执行下一个任务；

    > 异步任务：不进入主线程，而是进入任务队列，只有”任务队列”通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

    > 只有主线层空了，就会读取任务队列；这就是js 的运行机制；

* 任务队列不止一个Microtasks Macrotasks
  * microtasks:
    * process.nextTick
    * promise
    * MutationObserver

  * macrotasks:
    * setTimeout
    * setInterval
    * setImmediate
    * UI渲染

* 一个事件循环(event loop)会有一个或多个任务队列(task queue)
* task queue 就是 macrotask queue
* 每一个 event loop 都有一个 microtask queue

>事件循环的顺序，决定了JavaScript代码的执行顺序。它从script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的micro-task。当所有可执行的micro-task执行完毕之后。循环再次从macro-task开始，找到其中一个任务队列执行完毕，然后再执行所有的micro-task，这样一直循环下去。

>包裹在一个 script 标签中的js代码也是一个 task 确切说是 macrotask。

>同步代码执行完后有microtask执行microtask，没有microtask执行下一个macrotask，如此往复循环至结束

* 任务队列分为 macrotasks 和 microtasks，而Promise中的then方法的函数会被推入 microtasks 队列，而setTimeout的任务会被推入 macrotasks 队列。在每一次事件循环中，macrotask 只会提取一个执行，而 microtask 会一直提取，直到 microtasks 队列清空。
* 那么也就是说如果我的某个 microtask 任务又推入了一个任务进入 microtasks 队列，那么在主线程完成该任务之后，仍然会继续运行 microtasks 任务直到任务队列耗尽。

* 而事件循环每次只会入栈一个 macrotask ，主线程执行完该任务后又会先检查 microtasks 队列并完成里面的所有任务后再执行 macrotask。


### 递归算法：
 * 在函数中自己调用自身；
 * 在递归过程 要有一个出口；
 
 

### 作用域 原型链
  * 作用域链：
      * 作用域的特点就是，先在自己的变量范围中查找，如果找不到，就会沿着作用域往上找。
  * 原型链：
      * 原型链是针对构造函数的，比如我先创建了一个函数，然后通过一个变量new了这个函数，那么这个被new出来的函数就会继承创建出来的那个函数的属性，然后如果我访问new出来的这个函数的某个属性，但是我并没有在这个new出来的函数中定义这个变量，那么它就会往上（向创建出它的函数中）查找，这个查找的过程就叫做原型链。

> 每一个实例对象都有自己的属性和方法的副本；用构造函数生成实例，有一个缺点就是无法共享属性和方法；为了不浪费资源，就决定在构造函数里面设置一个prototype 属性，所有实例对象需要共享的属性和方法，都在这个对象里面，那些不需要共享的属性和方法就放在构造函数里面；


> 也就是说：实例一旦创建，将自动引用 prototype的对象的属性和方法；也就是说对象的属性和方法分为了2块：<br>
    1、一个是自身的（本地的）；<br>
    2、一种是引用的


 ##### 构造函数模式的问题：
        
   * 构造函数很好用 但是很浪费内存；
   * 每一个实例对象 对于一样的方法和属性 ，都要重复一遍；多占用内存；所以prototype 模式出来了；
   * 每一个构造函数都有prototype ，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。
   * 原来，任何一个prototype对象都有一个constructor属性，指向它的构造函数。
   * 更重要的是，每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。

   ```
   function leiyanyan(name,age){
    this.name='1',
    this.age=18

  }

  leiyanyan.prototype.wweight=100;

  var aa=new leiyanyan();

  yan.constructor==leiyanyan //true

  leiyanyan.prototype.constructor==yan.constructor==leiyanyan  //true  (每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性)

 yan.__proto__==leiyanyan.prototype //true

 ```

 #### 构造函数的继承：
 > 继承也就是一个对象继承另外一个的属性和方法；
  
  * 构造函数的绑定：
    * 使用call和apply 就是将父对象的构造函数绑定在子对象上面；
    
    ```
     function Child(name){
         Parent.apply(this,argument);
            this.name='leiyanyan'    
        }

        function Parent(age){
            this.age=12;
        }
    ```
 #### 构造函数的继承：
 > 继承也就是一个对象继承另外一个的属性和方法；
  
  * 构造函数的绑定dsd：
    * 使用call和apply 就是将父对象的构造函数绑定在子对象上面；
       
    ```
     function Child(name){
         Parent.apply(this,argument);
            this.name='leiyanyan'    
        }

        function Parent(age){
            this.age=12;
        }
    
    ```

 * prototype 模式：
   * A对象得prototype对象指向B对象得实例，那么A就继承了B；
   
   ```
   Child.prototype=new Person();
   Child.prototype.constructor=Child;
   var cc=new Child();
   alert(cc.age)
  ```

  * 直接继承prototype
   第三种方法是对第二种方法的改进。由于Animal对象中，不变的属性都可以直接写入Animal.prototype。所以，我们也可以让Cat()跳过 Animal()，直接继承Animal.prototype。

```
Child.prototype= Person.prototype;
Child.prototype.constructor=Child;
var cc=new Child();
与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。

```












 
