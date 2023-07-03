

const reqControl = async (urls, limit, fn)=>{
    const res = []
    const pool = []

    for(var url of urls){
        const p = Promise.resolve(fn(url))
        res.push(p)

        if(limit <= urls.length){
            const e = p.then(v=>{
                pool.splice(pool.indexOf(e),1)
            })

            pool.push(e)

            if(limit<= pool.length){
                await Promise.race(pool)
            }

        }
    }
    return Promise.all(res)
}




// 模拟请求函数
const mockRequest = async (url) => {
    // 模拟异步请求
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
    console.log(`Request finished for ${url}`);
    return url;
  };
  
  // 测试函数
  const testReqControl = async () => {
    const urls = [
      'https://example.com/url1',
      'https://example.com/url2',
      'https://example.com/url3',
      'https://example.com/url4',
      'https://example.com/url5',
    ];
    const limit = 2;
  
    try {
      console.log('Starting requests...');
      const results = await reqControl(urls, limit, mockRequest);
      console.log('All requests finished:', results);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // 运行测试
  testReqControl();
  