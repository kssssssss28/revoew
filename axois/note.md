# feature
* 在浏览器 - 基于xml 在node 基于 http
* Promise
* 拦截请求
* XSRF防御 

# usage
axios.post({},()=>{})
axios({}).then(()=>{})

axios就是Axois的一个方法 发请求的核心是request

* tips
call bind apply 改变function的指向 换而言之 让你想的对象来call这个function 和call不同 bind是有可能你现在不需要调用 只想定义好 你就可以bind call是直接调

fly.call(K) 由K来调用fly

let newFly = fly.bind(K)
fly() -> 这个时候this指向window
newFly() -> 指向k

看个例子


class K{
    constructor(name){
        this.name = name
    }
}
function where(){
    console.log(this)
}
let k = new K(1)
let kk = new K(2)
where() -》 window
where.call(k) -》 1
let newWhere = where.bind(kk)
newWhere() -》2