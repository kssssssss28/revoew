class Axios{
    constructor(){
        // 新建一个属性叫拦截器 
        // axios 怎么新建拦截器的
        // axios.interceptors.use() 就是call的这个属性上的方法
        this.interceptors = {
            request: new InterceptorsManage,
            response: new InterceptorsManage
        }

    }

    request(config) {
    // 拦截器和请求组装队列
    // 简而言之 以你的请求为中心 左右两边扩展拦截器队列
    // 请求拦截 请求拦截 请求 占位符(undfeind) 响应拦截 响应拦截 
    let chain = [this.sendAjax.bind(this), undefined] // 成对出现的，失败回调暂时不处理

    // 请求拦截 从最后一个开始 做到一个 因此unshift
    // 请求拦截器后设置的先执行，响应拦截器先设置的先执行
    this.interceptors.request.handlers.forEach(interceptor => {
        chain.unshift(interceptor.fullfield, interceptor.rejected)
    })

    // 响应拦截 从第一个开始 做到最后一个
    this.interceptors.response.handlers.forEach(interceptor => {
        chain.push(interceptor.fullfield, interceptor.rejected)
    })

    // 执行队列，每次执行一对，并给promise赋最新的值
    let promise = Promise.resolve(config);
    while(chain.length > 0) {
        // 一对一对 定义到promise上 一次弹出两个哈 因为一个是成功的回调 一个是失败的
         promise = promise.then(chain.shift(), chain.shift())
    }
    return promise;
    }


    sendAjax(config){
        return new Promise(resolve => {
            const {url = '', method = 'get', data = {}} = config;
            // 发送ajax请求
            console.log(config);
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.onload = function() {
                console.log(xhr.responseText)
                resolve(xhr.responseText);
            };
            xhr.send(data);
        })}
}

// 拦截器也是一个类 这个类维护一个数组来存放拦截器-》因为不止一个
class InterceptorsManage {
    constructor() {
      this.handlers = [];
    }
  // use方法向数组里添加拦截器 接受参数是一个任务 成功和失败的回调
  // 组成的对象
    use(fullfield, rejected) {
      this.handlers.push({
        fullfield,
        rejected
      })
    }
  }
  





// 支持 axios.get/post.delet/....（）的调用
// 这些方法加在了 原型上 但是我们拿到的是axios -》 即request方法
// 怎么办？
// 把这些方法挂到request上
const methodsArr = ['get', 'delete', 'head', 'options', 'put', 'patch', 'post'];
methodsArr.forEach(met => {
    Axios.prototype[met] = function() {
        console.log('执行'+met+'方法');
        // 处理单个方法
        if (['get', 'delete', 'head', 'options'].includes(met)) { // 2个参数(url[, config])
            return this.request({
                method: met,
                url: arguments[0],
                ...arguments[1] || {}
            })
        } else { // 3个参数(url[,data[,config]])
            return this.request({
                method: met,
                url: arguments[0],
                data: arguments[1] || {},
                ...arguments[2] || {}
            })
        }

    }
})



const utils = {
    extend(a,b, context) {
      for(let key in b) {
        if (b.hasOwnProperty(key)) {
          if (typeof b[key] === 'function') {
            a[key] = b[key].bind(context);
          } else {
            a[key] = b[key]
          }
        }
        
      }
    }
  }
  



// 支持axios（）
const createAxios = ()=>{
    let axios = new Axios()
    //返回一个function 这个function和这个axios的对象
    // 绑定
    let req = axios.request.bind(axios)
    // 把位于Axios 原型上的方法搬运给request
    utils.extend(req, Axios.prototype, axios)
    // 同样的把拦截器搬运给request
    utils.extend(req, axios)
    return req
}
// 实际上是把Axios的request方法赋值给了axios
let axios = createAxios()
