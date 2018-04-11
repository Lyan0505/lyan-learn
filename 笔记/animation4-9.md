# 动画
## css 动画
### Transitions, Transforms和Animation
> [张鑫旭 CSS3 Transitions, Transforms和Animation使用简介与应用展示](http://www.zhangxinxu.com/wordpress/2010/11/css3-transitions-transforms-animation-introduction/)
> 感觉写的很有意思，也许这就是大神门 写这些的 意义所在，让菜鸟们 能够站在巨人的肩膀上 嘚瑟一下；
### 收获点：
* 原来傻傻分不清楚（后来清楚了）
* transition 分别过渡 也就是a-》b 如何 过去，加了这个就像 滑过去一样（速度节奏可以控制）。如果不加，直接跳过去，没有过渡，很是僵硬。
* transform 变换：就是一个状态到另外一个状态的变，旋转，缩放，偏移，等等；
* animation 动画：
#### transition:
* [demo](./aanimation4-9.html)
* transiton属性是下面几个属性的缩写：
```

transiton属性是下面几个属性的缩写：

transition-property
指定过渡的属性值，比如transition-property:opacity就是只指定opacity属性参与这个过渡。
transition-duration
指定这个过渡的持续时间
transition-delay
延迟过渡时间
transition-timing-function
指定过渡动画缓动类型，有ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier()
其中，linear线性过度，ease-in由慢到快，ease-out由快到慢，ease-in-out由慢到快在到慢。

```
#### transform 
* transform就是指的这个东西，拉伸，压缩，旋转，偏移。见下面示例代码：

```
.trans_skew { transform: skew(35deg); }
.trans_scale { transform:scale(1, 0.5); }
.trans_rotate { transform:rotate(45deg); }
.trans_translate { transform:translate(10px, 20px); }

```
* 加上trasition 就没有那么突兀了
```
.trans_effect {
    -webkit-transition:all 2s ease-in-out;
    -moz-transition:all 2s ease-in-out;
    -o-transition:all 2s ease-in-out;
    -ms-transition:all 2s ease-in-out;    
    transition:all 2s ease-in-out;
}
.trans_effect:hover {
    -webkit-transform:rotate(720deg) scale(2,2);
    -moz-transform:rotate(720deg) scale(2,2);
    -o-transform:rotate(720deg) scale(2,2);
    -ms-transform:rotate(720deg) scale(2,2);
    transform:rotate(720deg) scale(2,2);        
}
```
#### animation
> animations这物似乎还是只在webkit核心的浏览器上起作用

```
@-webkit-keyframes glow {
    0% {
        -webkit-box-shadow: 0 0 12px rgba(72, 106, 170, 0.5);
        border-color: rgba(160, 179, 214, 0.5);         
    }
    100% {
        -webkit-box-shadow: 0 0 12px rgba(72, 106, 170, 1.0), 0 0 18px rgba(0, 140, 255, 1.0);
        border-color: rgba(160, 179, 214, 1.0); 
    }
}
.anim_image {
    padding:3px;
    border:1px solid #beceeb;
    background-color:white;
    -moz-box-shadow: 0 0 8px rgba(72, 106, 170, 0.5);
    -webkit-box-shadow: 0 0 8px rgba(72, 106, 170, 0.5);
    box-shadow: 0 0 8px rgba(72, 106, 170, 0.5);
}
.anim_image:hover {
    background-color:#f0f3f9;
    -webkit-animation-name: glow;
    -webkit-animation-duration: 1s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    -webkit-animation-timing-function: ease-in-out;    
}

hover 上去无限执行，改变box-shaow
animation-iteration-count：infinte 表示无限
```
  * [demo](http://www.zhangxinxu.com/study/201011/css3-transition-animate-demo-11.html)




## js 动画

* 原生js 实现jq 的animate 的方法，实际事
* 写动画的过程 插入一个 知识点[getComputedStyle](http://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/)
* [style 和getComputedStyle](https://www.cnblogs.com/cythia/p/6721145.html)