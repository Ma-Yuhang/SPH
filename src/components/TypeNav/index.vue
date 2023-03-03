<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveList" @mouseenter="enterList">
        <h2 class="all">全部商品分类</h2>
        <!-- 列表展示的过渡动画效果 -->
        <transition name="sort">
          <div class="sort" v-show="showList">
            <!-- goSearch事件委派 所有的子节点都有了点击事件 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 当currentIndex==index  就添加一个动态的类名cur(背景颜色) -->
              <div class="item" :class="{cur:currentIndex==index}" v-for="(c1,index) in categoryList"
                :key="c1.categoryId">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                </h3>
                <!-- 通过动态绑定style样式控制二三级数据的显示与隐藏 -->
                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                  <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c1.categoryName"
                          :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c1.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入lodash插件中的防抖函数
import throttle from 'lodash/throttle'
// 自己写的鼠标进入事件的函数防抖
//#region 
// function debounce(fn, dalay) {
//   let timer = null
//   return function (...args) {
//     if (timer) clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.call(this, ...args)
//     }, dalay)
//   }
// }
//#endregion
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      showList: true
    }
  },
  methods: {
    // 鼠标进入让currentIndex等于当前的index
    //#region 
    // 1.不考虑防抖的情况
    // changeIndex(index) {
    //   this.currentIndex = index
    // },
    // 2.自己写的防抖函数
    // changeIndex: debounce(function (index) {
    //   this.currentIndex = index
    //   console.log(index);
    // }, 50),
    //#endregion
    // 3.lodash插件的防抖函数
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    // 鼠标离开时让currentIndex重新等于-1(不为0-15都可)
    leaveList() {
      this.currentIndex = -1
      // 在search模块中 鼠标离开需要隐藏列表
      if (this.$route.path !== '/home') {
        this.showList = false
      }
    },
    goSearch(event) {
      // 最好的解决方案是利用 编程式路由导航+事件委派
      // 给a标签添加自定义属性 :data-categoryName 注意：(浏览器自动将自定义属性名变为了categoryname)
      // 给a标签添加自定义属性 :data-category1ID 注意：(浏览器自动将自定义属性名变为了category1id)
      // 节点有一个dataset，可以获取到自定义属性的属性值和属性名
      let { categoryname, category1id, category2id, category3id } = event.target.dataset
      if (categoryname) {
        // 一定是a标签
        // 整理路由跳转携带的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        if (this.$route.params) {
          location.params = this.$route.params
        }
        // 整理完参数
        location.query = query
        // console.log(location);
        this.$router.push(location)
      }

    },
    // 在search模块中 鼠标进入需要展示列表
    enterList() {
      this.showList = true
    }
  },
  mounted() {
    // 在搜索模块 一上来隐藏商品列表
    if (this.$route.path != '/home') {
      this.showList = false
    }
  },
  computed: {
    // 获取home仓库中的categoryList 三级联动数据
    ...mapState('home', ['categoryList'])
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          // 通过css控制二三级数据的显示与隐藏
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 列表展示的过渡动画效果
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>