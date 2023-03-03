// 产品详情页的小仓库
import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
// 引入封装的uuid模块
import { getUUID } from '@/utils/uuid_token'
export default {
    namespaced: true,
    actions: {
        // 获取产品的详细信息
        async getGoodInfo({ commit }, skuid) {
            let result = await reqGoodsInfo(skuid)
            // console.log(result);
            if (result.code === 200) {
                commit('GETGOODINFO', result.data)
            }
        },
        // 添加或修改购物车
        async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
            // 发请求 服务器没有返回数据 所以没必要三连环
            let result = await reqAddOrUpdateShopCart(skuId, skuNum)
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations: {
        // 获取产品的详细信息
        GETGOODINFO(state, result) {
            state.goodInfo = result
        }
    },
    state: {
        goodInfo: {},
        // 用户的身份鉴定
        uuid_token: getUUID()
    },
    getters: {
        categoryView(state) {
            return state.goodInfo.categoryView || {}
        },
        skuInfo(state) {
            return state.goodInfo.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.goodInfo.spuSaleAttrList || {}
        },
    }
}
