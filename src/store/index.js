import Vue from 'vue'
import Vuex from 'vuex'

// 使用Vuex插件
Vue.use(Vuex)
// 引入home仓库
import home from './home'
// 引入search仓库
import search from './search'
// 引入detail仓库
import detail from './detail'
// 引入shopCart仓库
import shopCart from './shopCart'
// 引入登录和注册仓库
import user from './user'
// 引入支付页面仓库
import trade from './trade'


export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }
})
