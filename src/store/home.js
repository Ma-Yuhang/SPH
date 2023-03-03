// home模块的小仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'

export default {
    namespaced: true,
    // 书写业务逻辑 也可以处理异步操作
    actions: {
        // 向服务器发请求，获取服务器的数据(三级联动数据)
        async categoryList({ commit }) {
            let result = await reqCategoryList()
            // console.log(result);
            if (result.code === 200) {
                commit('CATEGORYLIST', result.data.slice(0, 16))
            }
        },
        // 获取首页banner轮播图的数据
        async getBannerList({ commit }) {
            // console.log('获取数据');
            let result = await reqGetBannerList()
            // console.log(result);
            if (result.code === 200) {
                commit('GETBANNERLIST', result.data)
            }
        },
        // 获取首页floor小轮播图的数据
        async getFloorList({ commit }) {
            // console.log('获取数据');
            let result = await reqFloorList()
            // console.log(result);
            if (result.code === 200) {
                commit('GETFLOORLIST', result.data)
            }
        }

    },
    // 唯一操作数据的手段
    mutations: {
        // 三级联动
        CATEGORYLIST(state, result) {
            state.categoryList = result
        },
        // 轮播图
        GETBANNERLIST(state, result) {
            // console.log('修改数据');
            state.bannerList = result
        },
        // floor小轮播图
        GETFLOORLIST(state, result) {
            // console.log('修改数据');
            state.floorList = result
        }
    },
    // 存储数据
    state: {
        // 三级联动
        categoryList: [],
        // banner轮播图
        bannerList: [],
        // floor小轮播图
        floorList: []
    },
    // 可以理解为computed计算属性 用于简化仓库数据
    getters: {}
}
