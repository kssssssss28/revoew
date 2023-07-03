const axios = require("axios")

const source = axios.CancelToken.source();

// 取消的操作底层是哪个实现？
// xhr.abort 

// 怎么知道要取消的？
// promise

// 怎么知道取消哪个？
// config里传递之后 req发送之后会把取消的操作定义到这个token的promise的then方法里

axios(
    {
        method:"get",
        url:"http://localhost:5000/getTest",
        cancelToken:source.token,
    })
.then(v=>{
    console.log(v.data)
})

source.cancel("请求取消的原因");

// source实际上就是一个对象有两个，一个是token，一个是cacel
// return {
//     token: token,
//     cancel: cancel
//   };
// cancel是call内部promise的resolve方法 来让用户在合适的时机取消请求

// function cancel(message) {
//     // 通过判断有没有reseaon来判断有没有被去效果
//   if (token.reason) {
//     // 如果token挂载了reason属性，说明该token下的请求已被取消
//     return;
//   }
//   // token挂载reason属性
//   token.reason = new Cancel(message);
//   // 外界可以通过执行resolvePromise来将该token的promise置为resolved
//   resolvePromise(token.reason);
// }


// token是cancelTOken的实例 接受一个函数作为参数 这个函数的目的就是把resolve方法传递出来
// 即把传递给excutor的方法传递给外部的的cancel属性 也就是上面这个函数传给cancel 
// var token = this; // 实例即token
// 将这个实例传递给token


// 请求的取消 利用的就是这个promise的then req执行的时候会先发送
// 然后检查config上有没有 canceltonken 有的话就定义取消的操作 
// config.cancelToken.promise.then(function onCanceled(cancel) {
//     if (!request) {
//       return;
//     }
// // xhr通知结束请求 并且关闭连接 -》 但是如果以及被处理 可能取消不掉 onabort监听
//     request.abort();
//     reject(cancel);
//     // Clean up request
//     request = null;
//   });

//   调用cacel实际上是修改的token里这个promise的状态