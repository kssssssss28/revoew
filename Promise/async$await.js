// //async await es7
// function* gen() {
//     console.log("enter");
//     const a = yield 1;
//     const b = yield () => 2;
//     return 3;
//   }
//   const g = gen();
//   console.log(g.next());
//   console.log(g.next());
//   console.log(g.next());
//   console.log(g.next());
  
// // generatir由next驱动 不然卡在yield
// // next的返回时当前yield的值和是否return 即使 一个迭代器对象
// // 由 value和done组成

// // thunk函数 其实就是 定制化批量生产的函数
// // 例如你要判断类型 你看写无数个函数 分别判断array function,,, 你也可以是一个函数 isType然后有这个函数构造isArray isFuntion....


// // 一个例子
const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000))

// async function test() {
//   const data = await getData()
//   console.log('data: ', data);
//   const data2 = await getData()
//   console.log('data2: ', data2);
//   return 'success'
// }

// // 这样的一个函数 应该再1秒后打印data 再过一秒打印data2 最后打印success async会包装返回为promise
// test().then(res => console.log(res))




function* testG() {
    // await被编译成了yield
    const data = yield getData()
    console.log('data: ', data);
    const data2 = yield getData()
    console.log('data2: ', data2);
    return 'success'
  }
  
const gen = testG() // 构造一个迭代器
var dataPromise = gen.next()  // 返回一个迭代器对象 包含value和done
// 注意 next 会卡在 yield 但是！ 不会给data赋值 那么data的值什么时候确定？
// 下一个 next被调用的时候 即 你call 第一个 next 会只执行到getData() 然后等着 你再call nect 才会赋值 然后做console
// 能用但是是一个美美的回调地狱
dataPromise.value.then(v=>{
    var data2Promise = gen.next()
        data2Promise.value.then(v=>{
            console.log(v)
        })

})


/// 完美版
// 接受 一个 generator 函数
function asyncToGenerator(generatorFunc) {
// 返回一个函数
    return function() {
        // 产生迭代器先
      const gen = generatorFunc.apply(this, arguments)
      // 返回一个promise
      return new Promise((resolve, reject) => {
        // 定义一个执行器函数叫step
        function step(key, arg) {
            // 定义变量
          let generatorResult
          // gen[key] - 》： 你看下面 这个的意思是 拿出gen上的next方法 往后走一步
          try {
            generatorResult = gen[key](arg)
          } catch (error) {
            return reject(error)
          }
          const { value, done } = generatorResult
          if (done) {
            return resolve(value)
          } else {
            return Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
          }
        }
        step("next")
      })
    }
}
