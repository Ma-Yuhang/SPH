import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
// 登录和注册模块的仓库
export default {
    namespaced: true,
    actions: {
        // 注册模块
        // 获取验证码
        async getCode({ commit }, phone) {
            let result = await reqGetCode(phone)
            if (result.code === 200) {
                commit('GETCODE', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 点击注册按钮
        async userRegister({ commit }, user) {
            let result = await reqUserRegister(user)
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },

        // 登录模块
        // 点击登录按钮
        async userLogin({ commit }, data) {
            let result = await reqUserLogin(data)
            if (result.code === 200) {
                commit('USERLOGIN', result.data.token)
                // 持久化token
                localStorage.setItem('TOKEN', result.data.token)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 获取用户信息
        async getUserInfo({ commit }) {
            let result = await reqUserInfo()
            if (result.code === 200) {
                commit('GETUSERINFO', result.data)
                return 'ok'
            } else {
                return Promise.reject('faile')
            }
        },
        // 退出登录
        async logout({ commit }) {
            let result = await reqLogout()
            if (result.code === 200) {
                commit('CLEAR')
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations: {
        // 获取验证码
        GETCODE(state, result) {
            state.code = result
        },
        // 点击登录按钮
        USERLOGIN(state, result) {
            state.token = result
        },
        // 获取用户信息
        GETUSERINFO(state, result) {
            state.userInfo = result
        },
        // 退出登录后清空token和用户数据
        CLEAR(state) {
            state.token = ''
            state.userInfo = {}
            localStorage.removeItem('TOKEN')
        }
    },
    state: {
        code: '',
        token: localStorage.getItem('TOKEN'),
        userInfo: {}
    },
    getters: {

    }
}