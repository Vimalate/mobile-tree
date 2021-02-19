<template>
  <div class="auth" v-if="!isAuthorize">
    <div class="auth-box">
      <div class="auth-icon">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="auth-name">建协云</div>
      <p class="auth-warning">登录后将获得以下权限</p>
      <p class="auth-item"><span class="dot"></span>获得您的公开信息(昵称、头像等)</p>
    </div>
    <div class="auth-btn">
      <van-button type="primary" block @click="onAuthorize">授权并登录</van-button>
      <form :action="loginApi" method="post" :model="form" id="form" ref="form" labelWidth="0"></form>
    </div>
  </div>
</template>

<script>
import { AUTHORIZE, AUTHORIZE_FIND} from '@/apis/base'
export default {
  data () {
    return {
      isAuthorize: true,
      menuId: ''
    }
  },
  methods: {
    getAuthorize () {
      this.$post(
        AUTHORIZE_FIND,
        {menuId: this.menuId},
        data => {
          if (data.data.isAuthorize) {
            window.location.href = data.data.redirectUri
          } else {
            this.isAuthorize = data.data.isAuthorize
          }
        },
        error => {
          this.$toast.fail(error.msg)
        }
      )
    },
    onAuthorize () {
      this.$post(
        AUTHORIZE,
        {menuId: this.menuId},
        data => {
          window.location.href = data.data.redirectUri
        },
        error => {
          this.$toast.fail(error.msg)
        }
      )
    }
  },
  created () {
    this.isAuthorize = true
    let query = this.$route.query
    if (query.active) {
      this.active = query.active
    }
    if (query.token) {
      sessionStorage.setItem('token', query.token)
      this.$store.commit('token', query.token)
    }
    if (query.userId) {
      sessionStorage.setItem('token', {id: query.userId})
      this.$store.commit('token', {id: query.userId})
    } 
    if (!query.token && !this.$store.state.token) {
      this.$toast.fail('获取不到令牌!')
    }
    this.menuId = this.$route.query.menuId
    this.getAuthorize()
  }
}
</script>

<style lang="scss" scoped>
.auth{
  margin-top: 20%;
  &-box{
    width: 80%;
    margin: auto;
  }
  &-icon{
    width: 80px;
    margin: auto;
    img{
      width: 100%;
    }
  }
  &-name{
    text-align: center;
    font-size: 20px;
    line-height: 40px;
    margin: 0 auto 30px auto;
    padding-bottom: 30px;
    border-bottom: 1px solid #e2e2e2;
  }
  &-warning{
    font-weight: 600;
  }
  &-item{
    color: #aaa;
    line-height: 50px;
    .dot{
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #aaa;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
  &-btn{
    width: 90%;
    margin: auto;
    ::v-deep.van-button{
      margin-top: 20px;
    }
  }
}
</style>