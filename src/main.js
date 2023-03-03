import Vue from 'vue'
import App from './App.vue'
// 引入全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 按需引入element-ui
import { Button, MessageBox } from 'element-ui';
// 使用element-ui
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router'
// 引入store
import store from '@/store'
// 引入mockServer.js  不需要引入变量 只需要mockServer.js里面的代码执行一遍就行了
import '@/mock/mockServer'
// 引入swiper样式
import '../node_modules/swiper/swiper-bundle.min.css'
// 将三级联动组件注册为全局组件
Vue.component('TypeNav', TypeNav)
// 将轮播图组件注册为全局组件
Vue.component('Carousel', Carousel)
// 将分页器组件注册为全局组件
Vue.component('Pagination', Pagination)

Vue.config.productionTip = false
// 统一引入所有接口(从支付页面的提交订单开始使用)
import * as API from '@/api'
// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
import loadimage from '@/assets/loading.gif'
Vue.use(VueLazyload, {
  // 加载时的默认图
  loading: loadimage,
})
// 引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: h => h(App),
  // 配置全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this
    // 将所有接口绑定到$API这个属性上
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')
