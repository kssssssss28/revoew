const myAll = (promises)=>{
    return new Promise((resolve, reject)=>{
        let count = 0
        let res = []

        // 注意注意 需要key的遍历 请使用map 不要for in for in是遍历key的！
        promises.map((promise, index)=>{
            promise.then(v=>{
                res[index] = v
                count = count + 1
                if(count  == promises.length){
                    resolve(res)
                }
            },
            err=>{
                reject(err)
            })
        })
    })
}




// 模拟异步操作函数
const asyncOperation = (value, delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(value);
      }, delay);
    });
  };
  
  // 测试函数
  const testMyAll = async () => {
    const promises = [
      asyncOperation(2, 1000),
      asyncOperation(4, 2000),
      asyncOperation(6, 3000),
      asyncOperation(7, 3000),
      asyncOperation(8, 2000),
    ];
  
    try {
      console.log('Starting async operations...');
      const results = await myAll(promises);
      console.log('All async operations completed:', results);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // 运行测试
  testMyAll();