// 对axios进行二次封装
import axios from 'axios'
// 引入nprogress进度条
import nprogress from 'nprogress'
// 引入nprogress进度条样式
import 'nprogress/nprogress.css'  // 在这个文件下可以修改进度条样式
// 创建一个axios的实例对象 requests就是axios 只不过需要稍微配置一下
const requests = axios.create({
    baseURL: '/mock', // 基础路径 在路径上自动带上/mock
    timeout: 5000 // 超时时间
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // config 配置对象 里边的headers请求头很重要
    // 进度条开始
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调
    // 进度条结束
    nprogress.done()
    return res.data
}, (error) => {
    // 失败的回调
    return Promise.reject(new Error('faile'))
})

// 对外暴露axios实例对象
export default requests