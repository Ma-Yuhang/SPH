<template>
  <!-- 三级联动组件已经被注册成了全局组件，不需要在引入 -->
  <div>
    <TypeNav />
    <ListContainer />
    <recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import recommend from '@/pages/Home/recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: { ListContainer, recommend, Rank, Like, Floor, Brand },
  mounted() {
    // 派发actions floor轮播图
    this.$store.dispatch('home/getFloorList')
  },
  computed: {
    ...mapState('home', ['floorList'])
  }

}
</script>

<style>
</style>