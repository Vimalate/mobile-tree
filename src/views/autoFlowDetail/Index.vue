<template>
  <div class="egress">
    <keep-alive>
      <van-tabs v-model="active">
        <van-tab title="发起">
          <AutoAdd :active.sync="active" :queryId="queryId" :flowInfo="flowInfo" :formId="formId"/>
        </van-tab>
        <van-tab title="列表">
          <EgressList ref="list" :active.sync="active" :queryId.sync="queryId" />
        </van-tab>
      </van-tabs>
    </keep-alive>
    <sh-loading :loading="loading"></sh-loading>
  </div>
</template>

<script>
import EgressList from './components/List'
import AutoAdd from './components/Add'
import { AUTOTABLE_FORM_DETAIL } from '@/apis/autoflow'
export default {
  components: {
    EgressList,
    AutoAdd
  },
  watch: {
    queryId (val) {
      if (val) {
        this.loadInfo()
      }
    }
  },
  data () {
    return {
      active: 0,
      formId: '',
      queryId: '',
      flowInfo: {},
      loading: false,

    }
  },
  methods: {
    loadInfo () { // 加载业务单信息
      this.loading = true
      this.$post(
        AUTOTABLE_FORM_DETAIL,
        {
          dataId: this.queryId,
          formId: this.formId
        },
        data => {
          this.flowInfo = data.data
          this.loading = false
        },
        error => {
          this.$toast.fail(error.msg)
          this.loading = false
        }
      )
    }
  },
  created () {
    let flowName = this.$route.query.name
    this.formId = this.$route.query.id
    this.$queryToken(() => {
      if (flowName) {
        document.title = flowName
        this.loadInfo()
      }
    })
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