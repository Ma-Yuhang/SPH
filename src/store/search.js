// search模块的小仓库
import { reqSearchInfo } from "@/api"
export default {
    namespaced: true,
    // 书写业务逻辑 也可以处理异步操作
    actions: {
        async getSearchList({ commit }, params = {}) {
            // params形参 当用户派发actions时传过来 至少是一个空对象
            let result = await reqSearchInfo(params)
            // console.log(result);
            if (result.code === 200) {
                commit('GETSEARCHLIST', result.data)
            }
        }
    },
    // 唯一操作数据的手段
    mutations: {
        GETSEARCHLIST(state, result) {
            state.searchList = result
        }
    },
    // 存储数据
    state: {
        searchList: {}
    },
    // 可以理解为computed计算属性 用于简化仓库数据
    getters: {
        attrsList(state) {
            // 如果网络有问题 则返回一个空数组
            return state.searchList.attrsList || []
        },
        goodsList(state) {
            return state.searchList.goodsList || []
        },
        trademarkList(state) {
            return state.searchList.trademarkList || []
        }
    }
}