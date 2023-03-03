// 表单验证

import Vue from 'vue'
// 引入表单验证插件
import VeeValidate from 'vee-validate'
// 中文的提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同` //让确认密码与密码相同
    },
    attributes: {
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        isCheck: '协议'
    }
})