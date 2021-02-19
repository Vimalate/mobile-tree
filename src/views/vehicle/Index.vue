<template>
  <div class="vehicle">
    <keep-alive>
      <van-tabs v-model="active">
        <van-tab title="发起">
          <VehicleAdd :active.sync="active" :queryId="queryId"/>
        </van-tab>
        <van-tab title="列表">
          <VehicleList ref="list" :active.sync="active" :queryId.sync="queryId" />
        </van-tab>
      </van-tabs>
    </keep-alive>
  </div>
</template>

<script>
import VehicleList from './components/List'
import VehicleAdd from './components/Add'
import { LOGIN, LOGIN_UC, PERSON_INFO } from '@/apis/base'
export default {
  components: {
    VehicleList,
    VehicleAdd
  },
  data () {
    return {
      active: 0,
      queryId: ''
    }
  },
  methods: {
    getUser () {
      this.$post(
        PERSON_INFO,
        '',
        data => {
           sessionStorage.setItem('user', JSON.stringify(data.data))
          this.$store.commit('user', data.data)
        }
      )
    },
    getToken (token) {
      this.$post(
        LOGIN,
        {
          ucToken: token
        },
        data => {
          sessionStorage.setItem('token', data.data)
          this.$store.commit('token', data.data)
          this.getUser()
        },
        error => {
          console.log(error)
        }
      )
    },
    loginUserCenter () {
      this.$post(
        LOGIN_UC,
        {
          // loginName: '3h1251',
          // password: 'wmn123456'
          // loginName: '3h1250',
          // password: '3H1250aa'
          loginName: '3h1096',
          password: '123'
        },
        data => {
          this.getToken(data.data)
          // console.log(data.data)
        },
        error => {
          console.log(error)
        }
      )
    }
  },
  mounted () {
    let query = this.$route.query
    if (query.active) {
      this.active = parseInt(query.active)  // 转Number
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
    } else if (!query.userId && !this.$store.state.user) {
      this.getUser()
    }
    if (!this.$store.state.user && !query.token) {
      this.loginUserCenter()
    }
  }

}
</script>


<style lang="scss" scoped>
.egress{
  padding-top: 42px;
  ::v-deep.van-tabs__wrap{
    position: fixed;
    width: 100%;
    z-index: 99;
    top: 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

}
</style>