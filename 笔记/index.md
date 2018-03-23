
# 试试
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

 #### prototype 模式：

   * A对象得prototype对象指向B对象得实例，那么A就继承了B；
   
   ```
   Child.prototype=new Person();
   Child.prototype.constructor=Child;
   var cc=new Child();
   alert(cc.age)

  ```



 *  直接继承prototype
   第三种方法是对第二种方法的改进。由于Animal对象中，不变的属性都可以直接写入Animal.prototype。所以，我们也可以让Cat()跳过 Animal()，直接继承Animal.prototype。

 > Child.prototype= Person.prototype;
    Child.prototype.constructor=Child;
    var cc=new Child();


*  与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。

### class 继承：

  #### class基本使用：
  * 
    
 


### touch 点透事件：

  ```
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    .len1{
        width: 300px;
        height: 300px;
        background-color: rebeccapurple;

    }
    .len2{
        width: 200px;
        height: 200px;
        background-color: red;
    }
    
    </style>
</head>
<body>
    <div class="wrap">
        <div class="len1" id="len1">dind</div>
        <div class="len2">dsad</div>

    </div>
    <script>
        var $len = document.getElementById('len1');
        $len.addEventListener('touchstart', function (e) {
            console.log('开始');
        })
        $len.addEventListener('touchend', function (e) {
            console.log('触摸结束');
        })

        $len.onclick = function () {
            console.log('点击');
        }

        document.body.onclick = function () {
            console.log('body');
        }

    </script>
</body>
</html>

```

* 我们知道，当一个用户在点击屏幕的时候，系统会触发touch事件和click事件，touch事件优先处理，touch事件经过 捕获，处理, 冒泡 一系列流程处理完成后， 才回去触发click事件
* 当用户点击屏幕得时候 会自动触发 click 事件，但是在touchend 后触发，那么如何在touch 事件取消系统得click呢？ 
* 在touch事件里面，调用e.preventDefault() 就可以阻止本次点击系统触发的click事件，即本次相关的click都不会执行

* 点透发生得理由：
   * A 和 B不是后代继承关系(如果是后代继承关系的话，就直接是冒泡子类的话题了)
   * A发生touch， A touch后立即消失， B事件绑定click
   * A z-index大于B，即A显示在B浮层之上
* 点透发生的理由: 
  > 当手指触摸到屏幕的时候，系统生成两个事件，一个是touch 一个是click，touch先执行，touch执行完成后，A从文档树上面消失了，而且由于移动端click还有延迟200-300ms的关系，当系统要触发click的时候，发现在用户点击的位置上面，目前离用户最近的元素是B，所以就直接把click事件作用在B元素上面了

#### 如何解决点透事件呢：

* 阻止默认的click 事件

   ```
     level10.addEventListener('touchend', function(e) {
      e.preventDefault();
    });

   ```
*  要么是阻止本次系统生成的click事件，要么是当系统触发click的时候，当前的触发touch的那个dom节点还存在。比如将其一延迟3s在关闭

    ```
    setTimeout(() => {
            level10.style.display = 'none';
        }, 300);
    ```
















