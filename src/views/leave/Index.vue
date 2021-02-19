<template>
  <div class="egress">
    <van-tabs v-model="active">
      <van-tab title="发起">
        <EgressAdd :active.sync="active" :queryId="queryId" />
      </van-tab>
      <van-tab title="列表">
        <EgressList ref="list" :active.sync="active" :queryId.sync="queryId" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import EgressList from './components/List'
import EgressAdd from './components/Add'
import { LOGIN, LOGIN_UC, PERSON_INFO } from '@/apis/base'
export default {
  components: {
    EgressList,
    EgressAdd
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
    }
  },
  mounted () {
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
    } else if (!query.userId && !this.$store.state.user) {
      this.getUser()
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