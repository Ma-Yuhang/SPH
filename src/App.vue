<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- Footer组件在登录和注册页面不显示 -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header, Footer
  },
  mounted() {
    // 通知vuex发请求 在App根组件下数据只能执行一次 可以避免重复发送ajax请求
    this.$store.dispatch('home/categoryList')

  }
}
</script>


