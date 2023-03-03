import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入store仓库
import store from '@/store'
// 使用路由插件
Vue.use(VueRouter)
// 引入路由组件
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import UserCenter from '@/pages/UserCenter'
// 二级路由
import GroupOrder from '@/pages/UserCenter/GroupOrder'
import MyOrder from '@/pages/UserCenter/MyOrder'


let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 第一个参数：往哪跳以及携带参数
// 第二个参数：成功回调
// 第三个参数：失败回调
// 重写push
VueRouter.prototype.push = function (location, resolve, reject) {
    // console.log(this);
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
// 重写replace
VueRouter.prototype.replace = function (location, resolve, reject) {
    // console.log(this);
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


// 配置路由
let router = new VueRouter({
    routes: [
        {
            path: '/userCenter',
            component: UserCenter,
            meta: { showFooter: true, isLogin: false },
            // 我的订单 团购订单 二级路由
            children: [
                {
                    path: 'groupOrder',
                    component: GroupOrder,
                    meta: { showFooter: true, isLogin: false },
                },
                {
                    path: 'myOrder',
                    component: MyOrder,
                    meta: { showFooter: true, isLogin: false },
                },
                {
                    path: '/userCenter',
                    redirect: '/userCenter/myOrder'
                },
            ]
        },
        {
            path: '/paySuccess',
            component: PaySuccess,
            meta: { showFooter: true, isLogin: false },
            beforeEnter: (to, from, next) => {
                if (from.path == '/pay') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/pay',
            component: Pay,
            meta: { showFooter: true, isLogin: false },
            beforeEnter: (to, from, next) => {
                if (from.path == '/trade') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/trade',
            component: Trade,
            meta: { showFooter: true, isLogin: false },
            // 路由独享守卫
            beforeEnter: (to, from, next) => {
                if (from.path == '/shopCart') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/shopCart',
            component: ShopCart,
            meta: { showFooter: true, isLogin: false }
        },
        {
            path: '/addCartSuccess',
            component: AddCartSuccess,
            meta: { showFooter: true, isLogin: false }
        },
        {
            path: '/detail/:skuid',
            component: Detail,
            meta: { showFooter: true }
        },
        {
            path: '/home',
            component: () => import('@/pages/Home'), // 路由的懒加载方式 引入
            meta: { showFooter: true }
        },
        {
            name: 'search',
            // ?表示keyWord参数可传可不传
            path: '/search/:keyword?',
            component: Search,
            meta: { showFooter: true },
            // props参数
            // 1.对象写法
            // props: { a: 1 } 不常用
            // 2.布尔值  只能传递params参数
            // props: true
            // 3.函数写法
            // props($route) {
            //     return { keyword: $route.params.keyword, k: $route.query.k }
            // }
        },
        {
            path: '/login',
            component: Login,
            meta: { showFooter: false }
        },
        {
            path: '/register',
            component: Register,
            meta: { showFooter: false }
        },
        // 重定向，让用户一打开就是首页
        {
            path: '*',
            redirect: '/home'
        }
    ],
    // 路由跳转的滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 返回的y:0代表在页面的顶部
        return { y: 0 }
    }
})
// 全局前置守卫:在路由跳转之前触发
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    if (token) {
        // 已经登录，就不能去登录页面了
        if (to.path == '/login') {
            next('/home')
        } else {
            // 登陆了 但去的不是login
            if (store.state.user.userInfo.name) {
                // 有用户信息 放行
                next()
            } else {
                // 没有用户信息
                try {
                    // 获取用户信息成功
                    await store.dispatch('user/getUserInfo')
                    next()
                } catch (error) {
                    // token失效了 重新派发logout 清空用户数据 并让用户重新登录
                    await store.dispatch('user/logout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录
        if (to.meta.isLogin == false) {
            let toPath = to.path
            next(`/login?redirect=${toPath}`)
        } else {
            next()
        }
    }
})

export default router