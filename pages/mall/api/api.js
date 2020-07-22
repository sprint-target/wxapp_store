import request from '../../../utils/https'
export const getexample = params => request(`https://ssff.com/api/getexample`, params) // get举例
export const postexample = params => request(`https://ssff.com/api/postexample`, params, 'post') // post举例