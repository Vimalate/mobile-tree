<template>
  <div class="backlogInfo">
    <keep-alive>
      <van-tabs v-model="active" color='#02A7F0'>
        <van-tab title="报告信息">
          <ReportInfo :active.sync="active" @readReport='readReport' :queryId.sync="queryId"/>
        </van-tab>
        <van-tab title="报告预览">
          <ReportPreview ref="list" :active.sync="active" :queryId.sync="queryId" />
        </van-tab>
      </van-tabs>
    </keep-alive>
  </div>
</template>

<script>
import ReportInfo from './components/Info'
import ReportPreview from './components/Preview'
  export default {
    data(){
      return {
        active:0,
        queryId:''
      }
    },
    components:{
      ReportPreview,
      ReportInfo
    },
    methods:{
      readReport(){
        console.log('点击查看报告1231')
        // this.queryId=v
        this.active=1
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>