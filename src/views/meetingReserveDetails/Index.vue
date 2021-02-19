<template>
  <div class="meetingReserveForm">
    <van-form>
        <van-cell class="cell-border-bottom" :value="form.conferenceTopic" >
        <template #title>
          <span class="custom-label">会议主题</span>
        </template>
      </van-cell>
      <van-cell class="cell-border-bottom" :value="form.meetingLocal">
        <template #title>
          <span class="custom-title">会议地点</span>
        </template>
        </van-cell>
        <van-cell class="cell-border-bottom" :value="form.conferenceStartTime">
          <template #title>
          <span class="custom-title">会议开始时间</span>
        </template>
        </van-cell>
        <van-cell class="cell-border-bottom" :value="form.conferenceEndTime">
        <template #title>
          <span class="custom-title">会议结束时间</span>
        </template>
      </van-cell>
      <van-cell class="cell-border-bottom" :value="form.duration">
        <template #title>
          <span class="custom-title">持续时间</span>
        </template>
      </van-cell>
      <van-cell class="cell-border-bottom" :value="form.conferenceType != null ? conferenceTypes[form.conferenceType-1].name : ''">
        <template #title>
          <span class="custom-title">会议类型</span>
        </template>
        </van-cell>
        <van-cell class="cell-border-bottom" :value="form.participants" @click="isDisabled ? '': confereePeronShow = true">
        <template #title>
          <span class="custom-title">参会人员</span>
        </template>
      </van-cell>
        <div  class="form-conferenceContent">
        <van-cell  class="cell-title" :value="isDisabled ? form.conferenceContent : ''">
          <template #title>
            <span class="custom-title">会议内容</span>
          </template>
        </van-cell>
        <van-field class="cell-border-bottom" v-if="!isDisabled" clearable type="textarea" v-model="form.conferenceContent" readonly/>
      </div> 
      <div class="form-remarks">
        <van-cell title="备注" class="cell-title" :value="isDisabled ? form.remarks : ''"></van-cell>
        <van-field class="cell-border-bottom" v-if="!isDisabled" clearable  type="textarea" v-model="form.remarks" readonly/>
      </div>
      </van-form>
      <!-- 弹框 -->
      <sh-loading :loading="loading" :text="loadingText"></sh-loading>
  </div>
</template>

<script>
import {MEETING_RESERVE_DETAILS} from '@/apis/base'
export default {
  data(){
    return{
      loading: false,
      detailsApi:MEETING_RESERVE_DETAILS,
      form: {},
      queryId: this.$route.query.id,
      loadingText: '正在加载...',
      conferenceTypes:[
        {name:'1-全体大会',conferenceType:'1'},
        {name:'2-研讨会',conferenceType:'2'},
        {name:'3-讲座',conferenceType:'3'},
        {name:'4-例会',conferenceType:'4'},
        {name:'5-培训',conferenceType:'5'},
        {name:'6-总结会议',conferenceType:'6'},
        {name:'7-评审会',conferenceType:'7'},
        {name:'8-启动会',conferenceType:'8'},
        {name:'9-生产促进会',conferenceType:'9'},
        {name:'10-其他',conferenceType:'10'}
      ]
    }
  },
  methods:{
    loadInfo() {
    this.loading = true
    this.loadingText = '正在加载...'
    this.$post(
      this.detailsApi,
      {id: this.queryId},
      data => {
        this.form = data.data
        this.formatFormData()
        this.loading = false
      },
      error => {
        this.$toast.fail(error.msg)
        this.loading = false
      }
    )
    },
    formatFormData(){
      this.form.conferenceStartTime ? this.form.conferenceStartTime = this.$dayjs(this.form.conferenceStartTime).format("YYYY-MM-DD HH:mm") : ''
      this.form.conferenceEndTime ? this.form.conferenceEndTime = this.$dayjs(this.form.conferenceEndTime).format("YYYY-MM-DD HH:mm") : ''
      this.form.duration = this.$dayjs(this.form.conferenceEndTime).diff(this.form.conferenceStartTime,'minute')/60
    }
  },
  mounted(){
    this.loadInfo()
  }
}
</script>

<style lang="scss" scoped>
.meetingReserveForm {
  margin-bottom: 65px;
  .fromMustRow {
    position: relative;
    border-bottom: 0.5px solid rgb(248, 246, 246);
    padding: 5px 0;
  }
  .van-cell {
    padding: 10px 15px;
  }
  .fromMustRow .van-cell {
    font-size: 14px;
    color: #666666;
  }
  .van-cell__title {
    color: #666666;
  }
  .position {
    width: 10px;
    height: 10px;
    position: absolute;
    top: 12px;
    z-index: 999;
  }
  .left {
    left: 84px;
  }
 .ends {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    text-align: right;
    border-top: 1px solid #eee;
    padding: 0 10px;
    box-sizing: border-box;
    z-index: 2000;
    .van-button {
      width: 80px;
      height: 35px;
      margin: 15px 5px;
    }
  }
  .lefts {
    left: 100px;
  }
  .titles {
    /* height: 20px; */
    font-weight: 600;
    font-size: 15px;
    color: #666666;
    margin: 8px 18px;
  }
  .boxBtn {
    margin-right: 30px;
    margin-top: 5px;
  }
  .btns {
    margin-left: 10px;
    width: 50px;
    border-radius: 5px;
    text-align: center;
    line-height: 25px;
    height: 25px;
    border: 1px solid gainsboro;
    color: #666666;
  }
  .selectBth {
    border: 1px solid rgba(66, 146, 228, 1);
    background:rgba(66, 146, 228, 1);
    color: white;
  }
  .fromMustRow_box {
    display: flex;
  }
  .boxBtn {
    display: flex;
  }
  .van-collapse-item__content {
    padding: 7px 15px;
  }
  .form-conferenceContent{
  .van-cell::after{
    border: none;
  }
  .van-field__v-model{
    padding-top: 0;
    color: #666666;
  }
}
.form-remarks{
  .title::after{
    top: 0;
    bottom: auto;
  }
  .van-field__v-model{
    padding-top: 0;
    color: #666666;
  }
}
}
.cell-title{
  padding-left: 0;
  margin-left: 15px;
  width: calc(100% - 15px);
}
.require-img{
  width: 6px;
  vertical-align: text-top;
  margin-left: 4px;
  margin-top: 2px;
}
.van-cell::after{
  border: none;
}
</style>