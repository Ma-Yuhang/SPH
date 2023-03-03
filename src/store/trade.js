import { reqAddressInfo, reqOrderInfo, reqSubmitOrder } from '@/api'

export default {
    namespaced: true,
    actions: {
        // 获得用户地址
        async getUserAddress({ commit }) {
            let result = await reqAddressInfo()
            if (result.code === 200) {
                commit('GERUSERADDRESS', result.data)
            }
        },
        // 获取商品清单的数据
        async getOrderInfo({ commit }) {
            let result = await reqOrderInfo()
            if (result.code === 200) {
                commit('GETORDERINFO', result.data)
            }
        }
    },
    mutations: {
        GERUSERADDRESS(state, result) {
            state.address = result
        },
        GETORDERINFO(state, result) {
            state.orderInfo = result
        }
    },
    state: {
        address: [],
        orderInfo: {}
    },
    getters: {

    }
}