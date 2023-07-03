const CancelToken = axios.CancelToken;

const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');





























// source就是一个对象 由token cancel 两个属性
CancelToken.source = function source() {
    var cancel;

    // 函数的目的 是把一个c赋值给外部的cancle属性
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    // touken 是个 实例  
    // 通过剧透可以知道 这里传递的C 就是内部的promise的resolve 方法 
    // 让source可以在外部 修改promise状态
    return {
      token: token,
      cancel: cancel
    };
  };
  


  // axios/lib/cancel/CancelToken.js
function CancelToken(executor) { // 参数executor

    // 参数类型判断为函数
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }
    
    var resolvePromise;
    // 实例挂载一个promise，这个promise会在变量resolvePromise执行后resolved
    // 如果这个promise被resolve就是执行取消操作

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
  
  
    var token = this; // 实例即token
    // 执行器执行，将函数cancel传递到外界
// 这一对就是C 即 把这个函数赋值给了cancel属性
    executor(function cancel(message) {
        // 通过判断有没有reseaon来判断有没有被去效果
      if (token.reason) {
        // 如果token挂载了reason属性，说明该token下的请求已被取消
        return;
      }
      // token挂载reason属性
      token.reason = new Cancel(message);
      // 外界可以通过执行resolvePromise来将该token的promise置为resolved
      resolvePromise(token.reason);
    });
  }


// 有没有canceltoekn和定义取消操作
  if (config.cancelToken) {
    // 请求时带上了cancelToken，如果上面token的promise resolve就会执行取消请求的操作
    config.cancelToken.promise.then(function onCanceled(cancel) {
      if (!request) {
        return;
      }
// xhr通知结束请求 并且关闭连接 -》 但是如果以及被处理 可能取消不掉 onabort监听
      request.abort();
      reject(cancel);
      // Clean up request
      request = null;
    });
  }
