# http  各种缓存：

> 
1、缓存是一种保存资源副本并在下次请求时直接使用该副本的技术
2、缓存  提高性能 和 缓解服务端的压力
3、缓存的种类有很多，从前前端的角度 主要 讨论 浏览器的缓存和代理的缓存。除此之外，还有网关的缓存 、CDN、反向代理缓存和负载均衡器等部署在服务器上


-------

## request Header
```
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7
Cache-Control: no-cache
Connection: keep-alive
Host: open.xiaoyastar.com
Pragma: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36

```
### Accept 
> 接受媒体的类型 （如果服务器无法返回就会返回一个406的错误）

### Connection: keep-alive
> 客服端和服务武器之间用于传输HTTP 数据的TCP 链接不会关闭，再次访问的时候会继续建立链接

### Referer
> 当浏览器想web 服务器发送请求的时候，一般都是会带上Referer，告诉服务器，我是从哪个页面过来的

### Cache-Control
> 网页缓存控制：private、no-cache、max-age、must-revalidate，默认是private

* 1、打开新的窗口：

值为private、no-cache、must-revalidate，那么打开新窗口访问时都会重新访问服务器
Cache-control: max-age=5(表示当访问此网页后的5秒内再次访问不会去服务器)

* 2、在地址栏回车

值为private或must-revalidate则只有第一次访问时会访问服务器，以后就不再访问。

值为no-cache，那么每次都会访问。

值为max-age，则在过期之前不会重复访问。

* 3、按 后退按钮

值为private、must-revalidate、max-age，则不会重访问，

值为no-cache，则每次都重复访问

* 4、按刷新按钮
无论何值都会重新访问

### cookie

> 用来存储一些用户信息让服务器辨别身份

### If-Modified-Since

把浏览器缓存页面最后修改的时间发送到服务器，服务器会把这个时间与服务器上实际文件的最后修改的时间进行对比，如果一致大的话，返回304，客户端就直接
使用本地缓存

### If-None-Match
>If-None-Match 和ETag 一起工作，工作原理是在HTTP Response中添加ETag信息，当用户再次发起请求资源的时候，
将在HTTP Request 中加入If-None-Match信息(ETag的值)。如果服务器验证资源的ETag没有改变（该资源没有更新），将返回一个304状态告诉客户端使用本地缓存文件。否则将返回200状态和新的资源和Etag.  使用这样的机制将提高网站的性能

### Forwarded 

> 披露客户端通过http代理连接web服务的源信息

----

##  Responses Header 响应头

* Access-Control-Allow-Origin 指定哪些站点可以参与跨站资源共享
* Accept-Patch 指定服务器支持的补丁文档格式，适用于http的patch方法
* Accept-Ranges 服务器通过byte serving支持的部分内容范围类型
* Cache-Control 告诉服务端到客户端所有的缓存机制是否可以缓存这个对象，单位是秒
* Connection 设置当前连接和hop-by-hop协议请求字段列表的控制选项
* 
* 



## http 缓存控制
1、 禁止缓存 
> Cache-Control: no-store

2、强制确认缓存:

此方式下，发送请求的时候，缓存都会将请求发送到服务器上（此时应该带有本地缓存验证的字段），然后服务端验证是否 过期，如果没有过期采用本地缓存 资源，此时返回304， 当用户再次请求该资源时，将在HTTP Request 中加入If-None-Match信息(ETag的值)。如果服务器验证资源的ETag没有改变（该资源没有更新），将返回一个304状态告诉客户端使用本地缓存文件。否则将返回200状态和新的资源和Etag.  使用这样的机制将提高网站的性能

> Cache-Control: no-cache

3、私有缓存 和共有缓存
> Cache-Control: private
Cache-Control: public

4、缓存过期机制

最重要的指令是 "max-age=<seconds>" 表示 资源能够被缓存的最大时间

> Cache-Control: max-age=31536000


5、缓存的新鲜度
 
 （1）缓存的新鲜度 指缓存保持的时间，资源不是一层不变的，有限的空间用于存储资源的副本，所以一定时间的会清除，资源也会被更新。
 （2）当客户端发起一个请求时，缓存检索到已有一个对应的陈旧资源（缓存副本），则缓存会先将此请求附加一个If-None-Match头，然后发给目标服务器，以此来检查该资源副本是否是依然还是算新鲜的，若服务器返回了 304 (Not Modified)（该响应不会有带有实体信息），则表示此资源副本是新鲜的
 （3） 对于含有特殊头部的信息的，会去计算缓存的寿命。
 > 1、比如Cache-control: max-age=N的头，相应的缓存的寿命就是N。
 2、如果没有Cache-control: max-age=N 检查是否含有Expires,通过里面的Date 来判断缓存是否过期
 3、如果max-age和expires属性都没有，找找头里的Last-Modified信息。如果有，缓存的寿命就等于头里面Date的值减去Last-Modified的值除以10



### http 缓存 验证

* 

