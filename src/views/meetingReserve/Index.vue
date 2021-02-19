<template>
  <div class='meeting'>
    <van-tabs v-model="active">
      <van-tab title="预定">
        <Reserve :active.sync="active" :queryId="queryId"/>
      </van-tab>
      <van-tab title="列表">
        <ReserveList ref="list" :active.sync="active" :queryId.sync="queryId"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Reserve from './components/Reserve'
import ReserveList from './components/List'
export default {
  components:{
    Reserve,
    ReserveList
  },
  data () {
    return {
      active: 0,
      queryId: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.meeting{
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