const axios = require("axios")
// 解释一下拦截器的原理
// 拦截器的原理就是Promise的链式调用 
// Axios class上定义有一个属性 interceptors 
// interceptors 有两个属性 request 和 response
//   this.interceptors = {
//     request: new InterceptorsManage,
//     response: new InterceptorsManage}
//   每个InterceptorsManage实例上都有一个handler 数组和use方法
// 当如下所示地call use 方法的时候 你可以看到我们传递的是一组成功和失败的回调给use use会把这一组回调
// push到这个拦截器实例的handler数组里
// 接着在执行的get时候， axios的request函数会新建一个chain 
// 初始化为let chain = [this.sendAjax.bind(this), undefined] 让http请求和一个padding的undefined 占据
// c位 接着处理拦截器 通过axios实例上的interceptors属性 遍历请求和响应拦截器实例上的handler数组
// 把handler上的东西加到chain上 对于请求 我们用unshift 响应用push即请求的先定义后执行 响应的先定义先执行
// 这个时候 chain应该长成[请求拦截2, 请求拦截1, 真的请求， undefiend， 响应拦截1， 响应拦截2]
// 接着遍历这个chian 通过promise.then方法每次取出两个-》即一组拦截器的回调放到then
// 直到chain遍历完即 所有的回调函数以及加到then的链子上了 返回promise
// let promise = Promise.resolve(config);
// while(chain.length > 0) {
//     // 一对一对 定义到promise上 一次弹出两个哈 因为一个是成功的回调 一个是失败的
//      promise = promise.then(chain.shift(), chain.shift())
// }
// return promise;


axios.interceptors.request.use(config => {
    console.log("1st req inter");
    return config;  // 返回请求对象
  }, error => {
    // 处理错误
    return Promise.reject(error);
  });
  
  axios.interceptors.request.use(config => {
    console.log("2nd req inter");
    return config;  // 返回请求对象
  }, error => {
    // 处理错误
    return Promise.reject(error);
  });
  
  axios.interceptors.response.use(response => {
    console.log("1st res inter");
    return response;  // 返回响应对象
  }, error => {
    // 处理错误
    return Promise.reject(error);
  });
  
  axios.interceptors.response.use(response => {
    console.log("2nd res inter");
    return response;  // 返回响应对象
  }, error => {
    // 处理错误
    return Promise.reject(error);
  });
  
// axios 用法
axios.get('http://localhost:5000/getTest').then(v=>{
    console.log(v.data)
})

axios({method:"get", url:"http://localhost:5000/getTest"})
.then(v=>{
    console.log(v.data)
})
