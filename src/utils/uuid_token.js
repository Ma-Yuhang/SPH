import { v4 as uuidv4 } from 'uuid';
// 要生成一个随机的字符串 一旦生成后就不会再改变
export const getUUID = () => {
    // 看看本地存储里边是否有
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 第一次肯定没有 需要设置  设置完之后就不会改变了
    if (!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}