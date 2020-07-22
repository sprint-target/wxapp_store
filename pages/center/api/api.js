import request from '../../../utils/https'
export const getexample = params => request(`getexample`, params) // get举例
export const postexample = params => request(`postexample`, params, 'post') // post举例