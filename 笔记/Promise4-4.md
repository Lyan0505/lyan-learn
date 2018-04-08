# Promise
## promise.prototype.then()
## promise.prototype.catch()
## promise.prototype.finally()
## promise.all()
## promise.resolve()
## promise.reject()
## promise.try()

## promise 对象：
* pending 进行中
* fulfilled 已经成功
* rejected 已失败
## 一旦状态改变就不会再变，任何时候 都可以得到这个结果
* promise 对象 只有2种 ；从pending变为fulfilled和从pending变为rejected。只要这2种情况发生，状态就凝固了不会再变化，这时候称为 resolved （已定型）
*  如果改变发生了 再对promise 添加 回调函数也会立即得到这个结果；
## 基本用法：
* Promise 实例完成之后，可以用then 方法分别制定resolved 状态和rejected 状态的回调函数’
* Promise 新建之后 就会立即执行
  ```
  let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
    resolve();
    });

    promise.then(function() {
    console.log('resolved.');
    });

    console.log('Hi!');

    // Promise
    // Hi!
    // resolved

  ```
  * promise 两个参数 reslove 和reject 函数，他们的参数 都会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例

    ```
    const p1 = new Promise(function (resolve, reject) {
    // ...
    });

    const p2 = new Promise(function (resolve, reject) {
    // ...
    resolve(p1);
    })
    
    p2 的resolve 方法将p1 作为参数，即是一个异步操作的结果返回另外一个异步的
    
    ```
    > p1 的状态传给p2 ，也就是说p1 的状态决定p2 ，如果p1的状态已经是 resolved 或者rejected ，那么p2 立即执行；

  * 调用resolve 或者reject 并不会终结Promise 的参数函数的执行；

    ```
    new Promise((resolve, reject) => {
    resolve(1);
    console.log(2);
    }).then(r => {
    console.log(r);
    });
    //2
    //1
    
    ``` 
    > 调用resolve(1) 以后，后面的console.log(2) 还是会执行的， 这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
    
    * Promise 实例具有then方法，也就说，then 方法定义在原型对象 Promise.prototype。 它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的 第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
    > then 方法 返回的是一个新的Promise 实例 （但是不是原来的那个实例）
    
    * Promise.prototype.catch 方法 是.then(null,rejected) 用于指定 错误发生时的回调函数。
     
     ```
     getJSON('/posts.json').then(function(posts) {
        // ...
      }).catch(function(error) {
        // 处理 getJSON 和 前一个回调函数运行时发生的错误
        console.log('发生错误！', error);
      });
     ```
     > getJson 方法 返回一个Promise 对象，如果该对象 状态变为resolved 则会调用 then 方法指定的回调函数如果异步操作 抛出错误，另外，then 方法指定的函数，如果运行中抛出错误，也会调用catch 方法：

     > 错误 会向后面传递，直到被捕获为止，也就是说，错误会被下一个catch语句捕获；

     ```
     // bad
      promise
        .then(function(data) {
          // success
        }, function(err) {
          // error
        });

      // good
      promise
        .then(function(data) { //cb
          // success
        })
        .catch(function(err) {
          // error
        });

        上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。因此，建议总是使用catch方法，而不使用then方法的第二个参数。
     ```
     > Promise 内部的错误不会影响外部的代码，通俗的说法，Promise 会吃掉错误；
     
    * Promise.prototype.finally()
       * 不管最后状态如何 都会执行，是ES2018 引入的
       ```
       promise
        .finally(() => {
          // 语句
        });

        // 等同于
        promise
        .then(
          result => {
            // 语句
            return result;
          },
          error => {
            // 语句
            throw error;
          }
        );
       ```
