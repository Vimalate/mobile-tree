import axios from 'axios'
// import qs from 'qs'
import store from '@/store'
import { LOGIN } from '@/apis/base'
// import router from '@/router'

// axios 配置
axios.defaults.timeout = 30000
// axios.defaults.baseURL = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.transformRequest = [function (data) {
//   return qs.stringify(data)
// }]
// axios.defaults.baseURL='http://14.116.210.102:9009'
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500
}

// http request 拦截器
axios.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers.Authorization = 'Bearer ' + store.state.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(
  resp => {
    return resp
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * get请求方法
 * @param {String} url 接口
 * @param {Object} data  请求参数
 * @param {functiong} success 成功回调
 * @param {functiong} failure 失败回调
 * @param {Object} config 配置
 */
const get = function (url, data = {}, success = () => { }, failure = () => { }, config = {}) {
  axios.get(url, {params: data}, config)
  .then(resp => {
    success && success(resp.data)
    if (resp.data.code == 0) {
      success && success(resp.data)
      // token过期重新请求token
    }  else if (resp.data.code == 2) {
      reLogin(url, data = {}, success = () => { }, failure = () => { }, config = {}, 'get')
    } else  {
      failure && failure(resp.data)
    }
  })
  .catch((error) => {
    failure && failure({ code: 5, msg: '服务器出错，请重新尝试!' })
  })
}

const post = function (url, data = {}, success = () => { }, failure = () => { }, config = {}) {
  axios.post(url, data, config)
    .then(resp => {
      if (resp.data.code == 0) {
        success && success(resp.data)
        // token过期重新请求token
      } else if (resp.data.code == 2) {
        reLogin(url, data, success, failure, config, 'post')
      } else {
        failure && failure(resp.data)
      }
    })
    .catch((error) => {
      failure && failure({ code: 5, msg: '服务器出错，请重新尝试!' })
    })
}

const reLogin = function (url, data, success, failure, config, type) {
  axios.post(LOGIN, {ucToken: store.state.token}, {})
    .then(resp => {
      if (resp.data.code == 0) {
        if (type == 'post') {
          post(url, data, success, failure, config)
        } else {
          get(url, data, success, failure, config)
        }
      } else {
        failure && failure(resp.data)
      }
    })
    .catch((error) => {})
}

export default axios

export {
  get,
  post
}
