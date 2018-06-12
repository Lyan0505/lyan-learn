## 面试题
> 梳理一下最近的面试题，可能没有那么全面
## CSS 
* 上下垂直居中有几种解决方法（这个应该是问的最多的一个题目！！！）

##JS
* 数组去重
* 数组排序（问复杂程度）
* 原型 继续 [原型继承](https://www.cnblogs.com/humin/p/4556820.html)
* 

## ES6
### 箭头函数和普通函数的区别
* [箭头函数和普通函数](https://www.cnblogs.com/freelyflying/p/6978126.html)
* 箭头函数的this 只想在定义它时，它所处的对象，不是执行时候的对象，定义它的时候可能是window （即继承父类的this）
```
<script>
  var obj = {
    say: function () {
      setTimeout(function () {
        console.log(this)
      });
    }
  }
  obj.say();
</script>
```
> 匿名函数,定时器中的函数,由于没有默认的宿主对象,所以默认this指向window
## Vue

## React

## HTTp 协议

### HTTP 常用的方法
### get 和post 的区别（这个也是很长问的，但是我回答的很浅）

### 状态码相关 



#### 返回的状态

* 1XX 指示信息-表示


[别人遇到的http 面试](https://www.cnblogs.com/sunny-sl/p/6529830.html)
