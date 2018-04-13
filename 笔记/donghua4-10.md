# animation 实现
>实现jq 的animation 的方法；移动也就是 偏移量的改变 然后加上 缓动


* jq animation

```
$("#box").animate({height:"300px",width:"200px",left:"200px"});

```
* 封装一个low Animation 的方法；
```
 //构造函数
   function Animate(obj,json,sp){
     this.start=function(){
         this.moveTo();

     },
     this.moveTo=function(){
        var current=100;
        obj.timer=setInterval(function(){
            var flag=true;
           
            for (const key in json) {
                if (!json.hasOwnProperty(key)) {
                    continue   
                }
                const element = json[key];
                var speed=(element-100)*sp;
                
                current=current+speed; 
                obj.style[key]=current+"px";

                  if(current != json[key]){
                        flag = false;
                    } 
            }

            if(flag){
                clearInterval(obj.timer);
            }

        },1000/60)  
     },
     this.getStyle=function(){
         alert(false)

     }
   }

   //调用
      $div[0].onclick=function(){
       var Animates=new Animate(this,{left:500,},0.01);
       Animates.start();   
   
    }
```
* 上个不支持时间参数
```
        var $div = document.getElementsByClassName('item');
        var $btn = document.getElementsByClassName("restBtn");
      

        //构造函数
        function Animate(obj, json, time, sp, fn) {
            this.start = function () {
                this.moveTo();
                console.log(this);

            },
            //移动
            this.moveTo = function () {
                var _this = this;
                clearInterval(obj.timer);
                var pretime = new Date();
                obj.timer = setInterval(function () {
                    var currenttime = new Date();
                    var flag = true;

                    for (const key in json) {
                        if (!json.hasOwnProperty(key)) {
                            continue
                        }
                        var current = 0;
                        const element = json[key];
                        console.log(this);
                        current = parseInt(_this.getStyle(obj, key));
                        if (currenttime - pretime > time) {
                            clearInterval(obj.timer);

                        } else {
                            var speed = (element - current) * ((currenttime - pretime) / time);
                            obj.style[key] = speed+current + "px";
                        }


                        // if(current != json[key]){
                        //     flag = false;
                        // } 


                    }


                }, 1000 / 60)
            },
            // 获取json 里面的属性值
            this.getStyle = function (obj, key) {
                if (obj.currentStyle) {
                    return obj.currentStyle[key];
                } else {
                    return window.getComputedStyle(obj, null)[key];
                }
            },

            this.easeInOutCubic=function(t, b, c, d){
                const cc = c - b;
                t /= d / 2;
                if (t < 1) {
                return cc / 2 * t * t * t + b;
                } else {
                return cc / 2 * ((t -= 2) * t * t + 2) + b;
                }
            }
        }

    for (const key in $div) {
        
        $div[key].onclick=function(){
            var _this = $div[key];
            debugger
            var Animates = new Animate(_this, { width: 500, height: 200,left:400 }, 1000);
            Animates.start();
        }
    }
```
* 样式获取 ：
    * 内嵌样式
    * 内部样式
    * 外联样式
* style ：标准样式，可用来查询 标签里面的 指定的样式
* currentStyle 可用的 查询 外联或者内联。 代表了在全局样式表、内嵌样式和 HTML 标签属性中指定的对象格式和样式。当使用currentStyle做条件判断是，要加上body,document.body.currentStyle，这样才能兼容上IE6,7。
* getComputedStyle：用于Firefox、Chrome、Safari、Opera等浏览器，作用与currentStyle相同。
* getComputedStyle 和Style的区别
     * 只读与可写： getComputedStyle 方式只是可读 只能去样式 不能设置，
     * style 能读能写 

* getComputyStyle 和 defaultView 
      * jq 里面的 css（） 的实现使用的不是window.getComputedStyle 而是 document.default.getComputedStyle.

