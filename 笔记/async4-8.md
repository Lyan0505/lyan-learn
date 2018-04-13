# async 函数
> 2017 标准引入
> 原来的理解 就停留在 异步的请求，写成同步的形式；

## 原理
 * async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已
 * async 和await 比起原来的* 更加清楚了，async 表示函数里面有异步操作 await表示紧跟在后面的表达式需要等待结果。
 * async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖
## 用法
* async 函数 返回一个Promise 对象，then 方法添加毁掉函数，当函数执行的时候，只要遇到await 就会先返回，等待异步操作 返回结果之后 才接着执行
* 其实总结上： 执行顺序，async 表明内部有异步操作，然后调用的时候返回一个Promise 对象，然后如果遇到 await 就会等到异步操作 返回结果然后指向 下面的操作；这也就是 异步操作同步化。
    ```
    function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
    }

    async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
    }

    asyncPrint('hello world', 50);

    ```
## 错误处理机制

* async 函数return 返回的值，会传到then 方法 中作为参数，
* async 内部如果抛出错误的话，会导致 返回出来的对象的状态变为 reject， 这时候就会 走catch 回调；

## Promise 对象的状态变化
* 上面我已经说了 async 会返回Promise 对象，然后，如果里面有await 。这时候就会等所有的await 命令候面的Promise 对象执行完成，才会发生状态变化。也就是说async 函数内部的异步操作执行完成之后，才会执行then 方法指定的回掉函数；

```
    async function getTitle(url) {
    let response = await fetch(url);
    let html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];
    }
    getTitle('https://www.baidu.com/').then(console.log)
    ：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行then方法里面的console.log


```
### await
 * 一般的await 是一个Promise 对象，如果不是 就立即转为resolve 的Promise 对象，（如果不是的话 感觉也没有必要写await）
 * 只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行。

```
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```
> 但是正常情况下，我们一般希望前一个失败后一个也可以执行，如果不是互相依赖的话。 这时候用到了 try...catch

```
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world

这样不管这个异步操作是否成功，第二个await都会执行

```
* 如果有多个await

```
async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}
```
* 容错机制： await 运行的结果可能是 rejected 所以，最后 都放在try...catch.代码块里面。

### 请求并发
* 看资料说，一般 如果多个await 没有相互依赖的话，可以 同事触发，可以使用Promise.all方法，这个很少用到，这里就不多说了；

###





