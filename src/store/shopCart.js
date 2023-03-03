import { reqCartList, reqDeleteCart, reqChangeChecked } from '@/api'

export default {
    namespaced: true,

    actions: {
        // 获取购物车数据
        async getCartList({ commit }) {
            let result = await reqCartList()
            if (result.code === 200) {
                commit('GETCARTLIST', result.data)
            }
        },
        // 删除某个商品
        // 不需要三连环 服务器没返回具体数据 只需要知道成功还是失败
        async deleteCartList({ commit }, skuId) {
            let result = await reqDeleteCart(skuId)
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 勾选或取消勾选某个商品
        // 不需要三连环 服务器没返回具体数据 只需要知道成功还是失败
        async changeChecked({ commit }, { skuId, isChecked }) {
            let result = await reqChangeChecked(skuId, isChecked)
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 删除所有选中的商品
        deleteAllCheckedCart({ dispatch, getters }) {
            // 准备一个数组存放promise实例
            let promiseAll = []
            getters.cartList.cartInfoList.forEach(item => {
                if (item.isChecked == 1) {
                    // 只有isChecked等于1的才删除
                    let promise = dispatch('deleteCartList', item.skuId)
                    promiseAll.push(promise)
                }
            });
            // 所有选中的都删除成功才成功 只要有一个失败就失败
            return Promise.all(promiseAll)
        },
        // 勾选或取消勾选全选按钮
        changeAllChecked({ dispatch, getters }, isChecked) {
            let promiseAll = []
            getters.cartList.cartInfoList.forEach(item => {
                let promise = dispatch('changeChecked', { skuId: item.skuId, isChecked })
                promiseAll.push(promise)
            })
            return Promise.all(promiseAll)
        }
    },
    mutations: {
        // 获取购物车数据
        GETCARTLIST(state, result) {
            state.cartList = result
        }
    },

    state: {
        cartList: []
    },

    getters: {
        cartList(state) {
            return state.cartList[0] || {}
        }
    }
}