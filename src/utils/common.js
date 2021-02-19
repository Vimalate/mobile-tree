import { get, post } from '@/utils/ajax'
import dayjs from 'dayjs'
/**
 * 获取token
 * @param {function} callback 回调函数
 */
const queryToken = function (callback) {
  let query = this.$route.query
  if (query.token) {
    sessionStorage.setItem('token', query.token)
    this.$store.commit('token', query.token)
  }
  if (!query.token && !this.$store.state.token) {
    this.$toast.fail('获取不到令牌!')
  } else {
    callback()
  }
}
/**
 * 表单校验规则
 * @param {String, Array} val 传入值
 * @param {String} label 字段名
 * @return {Array} arr 校验规则
 */
const formRules = function (val, label) {
  let arr = []
  if (val) {
    if (typeof val == 'string') {
      val = [val]
    }
    val.forEach(item => {
      if (typeof item == 'string') {
        arr.push({ required: true, message: `请输入${label}` })
      } else {
        arr.push(item)
      }
    })
  }
  return arr
}

export default {
  install (Vue){
      Vue.prototype.$get = get
      Vue.prototype.$post = post
      Vue.prototype.$dayjs = dayjs

      Vue.prototype.$queryToken = queryToken
      Vue.prototype.$formRules = formRules
      
  }
}