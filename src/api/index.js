// 此模块是对API进行统一管理

// 引入二次封装的ajax （带有请求拦截器和响应拦截器）
import requests from "./ajax";
// 引入mock的数据对应的ajax
import mockRequests from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
// banner轮播图的接口
export const reqGetBannerList = () => {
    return mockRequests.get('/banner')
}
// floor小轮播图的接口
export const reqFloorList = () => {
    return mockRequests.get('/floor')
}


// Search模块的接口 地址：'/api/list' post 有参数(至少是一个空对象)
export const reqSearchInfo = (params) => {
    return requests({ url: '/list', method: 'POST', data: params })
}


// 获取detail数据的接口 地址：'/api/item' get 有参数(必须带id)
export const reqGoodsInfo = (skuId) => {
    return requests.get(`/item/${skuId}`)
}


// 添加到购物车或者修改购物车商品数量的接口 地址：'/api/cart/addToCart' POST 有参数(必须带id和数量)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests.post(`/cart/addToCart/${skuId}/${skuNum}`)
}


// 获取购物车列表的接口 地址：'/api/cart/cartList' get 无参数
export const reqCartList = () => {
    return requests.get(`/cart/cartList`)
}
// 删除购物车商品的接口 地址：'/api/cart/deleteCart' delete 有参数(id)
export const reqDeleteCart = (skuId) => {
    return requests.delete(`/cart/deleteCart/${skuId}`)
}
// 勾选购物车商品的接口 地址：'/api/cart/checkCart' get 有参数(id,isChecked)
export const reqChangeChecked = (skuId, isChecked) => {
    return requests.get(`/cart/checkCart/${skuId}/${isChecked}`)
}


// 注册模块获得验证码的接口 地址：'/api/user/passport/sendCode' get 有参数 手机号(phone)
export const reqGetCode = (phone) => {
    return requests.get(`/user/passport/sendCode/${phone}`)
}
// 成功注册的接口 地址：'/api/user/passport/register' post 有参数(phone,code,password)
export const reqUserRegister = (data) => {
    return requests({ url: `/user/passport/register`, method: 'post', data })
}

// 点击登录的接口 地址：'/api/user/passport/login' post 有参数(phone,password)
export const reqUserLogin = (data) => {
    return requests({ url: `/user/passport/login`, method: 'post', data })
}
// 获取用户信息的接口(需要带着用户的token向服务器要用户信息) 地址：'/api/user/passport/auth/getUserInfo' get 无参数
export const reqUserInfo = () => {
    return requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' })
}
// 退出登录的接口 地址：'/api/user/passport/logout' get 无参数
export const reqLogout = () => {
    return requests({ url: `/user/passport/logout`, method: 'get' })
}


// 获取用户地址的接口 地址：'/api/user/userAddress/auth/findUserAddressList' get 无参数
export const reqAddressInfo = () => {
    return requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' })
}
// 获取商品清单的接口 地址：'/api/order/auth/trade' get 无参数
export const reqOrderInfo = () => {
    return requests({ url: `/order/auth/trade`, method: 'get' })
}

// 从这个接口开始 不再使用vuex
// 提交订单的接口 地址：'/api/order/auth/submitOrder' post 有参数(tradeNo为query参数,其余为请求体参数)
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })
}
// 在订单提交成功页面获取支付信息的接口 地址：'/api/payment/weixin/createNative' get 有参数(orderId为params参数)
export const reqPayInfo = (orderId) => {
    return requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
}
// 在订单提交成功页面获取用户支付状态的接口 地址：'/api/payment/weixin/queryPayStatus' get 有参数(orderId为params参数)
export const reqPayStatus = (orderId) => {
    return requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
}

// 获取个人中心数据的接口 地址：'/api/order/auth' get 有参数(page,limit)
export const reqMyOrderList = (page, limit) => {
    return requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
}