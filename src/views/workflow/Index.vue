<template>
  <div class="workflow">
    <div class="heights"></div>
    <!-- 业务表单 -->
    <component :is="componentsForm[this.type]" ref="form" :isDisabled="isDisabled" :formData="form"></component>
    <div class="heights"></div>
    <!-- 审批列表 -->
    <WorkflowDetails :list="processList" :copyList="copyList"/>
    <div class="heights"></div>
    <!-- 流程审批 -->
    <div v-if="!isView">
      <WorkflowExamine ref="examine" :approStatus="form.approStatus"/>
      <div class="heights"></div>
    </div>
    <div class="ends" v-if="!isView || isShowRecall">
      <van-button v-if="isShowRecall" plain type="info" @click="onRecall" :class="{width: isView && isShowRecall}">撤 回</van-button>
      <van-button v-if="!isView" type="info" @click="onSubmit" :class="{width: !isView && !isShowRecall}">提 交</van-button>
    </div>
    <sh-loading :loading="loading" :text="loadingText"></sh-loading>
  </div>
</template>

<script>
import WorkflowDetails from './components/Details'
import WorkflowExamine from './components/Examine'
import { mapState } from 'vuex'
import { LOGIN, LOGIN_UC, PERSON_INFO } from '@/apis/base'
import { 
  PROCESS_DETAIL,
  EGRESS_TURN, EGRESS_BACK, EGRESS_INVALID, EGRESS_OVER, EGRESS_RECALL,
  LEAVE_TURN, LEAVE_BACK, LEAVE_INVALID, LEAVE_OVER, LEAVE_RECALL,
  VEHICLE_TURN,VEHICLE_BACK,VEHICLE_INVALID,VEHICLE_OVER,VEHICLE_RECALL,
  BUSINESS_TURN, BUSINESS_BACK, BUSINESS_INVALID, BUSINESS_OVER, BUSINESS_RECALL,
  REPLENISH_CARD_TURN, REPLENISH_CARD_BACK, REPLENISH_CARD_INVALID, REPLENISH_CARD_OVER,REPLENISH_CARD_RECALL
  } from '@/apis/workflow'
export default {
  components: {
    EgressForm: () => import('../egress/components/Form'),
    LeaveForm: () => import('../leave/components/Form'),
    BusinessForm: () => import('../business/components/Form'),
    VehicleForm: () => import('../vehicle/components/Form'),
    ReplenishCardForm: () => import('../replenishCard/components/Form'),

    WorkflowDetails,
    WorkflowExamine
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      componentsForm: {
        egress: 'EgressForm',
        leave: 'LeaveForm',
        business: 'BusinessForm',
        vehicle: 'VehicleForm',
        replenishCard:'ReplenishCardForm'
      },
      loading: false,
      loadingText: '正在加载...',
      form: {},
      keyObj: {},
      processList: [],
      queryId: '',
      type: '',
      approStatus: 0,  // 流程状态
      api: '',
      isDisabled: true,
      egressApi: {
        turn: EGRESS_TURN,
        back: EGRESS_BACK,
        invalid: EGRESS_INVALID,
        over: EGRESS_OVER,
        recall: EGRESS_RECALL
      },
      leaveApi: {
        turn: LEAVE_TURN,
        back: LEAVE_BACK,
        invalid: LEAVE_INVALID,
        over: LEAVE_OVER,
        recall: LEAVE_RECALL
      },
      businessApi: {
        turn: BUSINESS_TURN,
        back: BUSINESS_BACK,
        invalid: BUSINESS_INVALID,
        over: BUSINESS_OVER,
        recall: BUSINESS_RECALL
      },
      vehicleApi:{
        turn: VEHICLE_TURN,
        back: VEHICLE_BACK,
        invalid: VEHICLE_INVALID,
        over: VEHICLE_OVER,
        recall: VEHICLE_RECALL
      },
      replenishCardApi:{
        turn: REPLENISH_CARD_TURN,
        back: REPLENISH_CARD_BACK,
        invalid: REPLENISH_CARD_INVALID,
        over: REPLENISH_CARD_OVER,
        recall: REPLENISH_CARD_RECALL
      },
      isView: true,
      isShowRecall: false,  // 是否显示撤回
      copyList: [],
      typeTitle: {
        egress: '外出',
        leave: '请假',
        business: '出差',
        vehicle: '车辆申请',
        replenishCard:'补卡'
      }
    }
  },
  methods: {
    onRecall () {  // 撤回
      this.loading = true
      this.loadingText = '正在撤回...'
      this.form = this.$refs.form.form
      this.$post(
        this[`${this.type}Api`].recall,
        this.form,
        data => {
          this.$toast.success(data.msg)
           // 撤回成功,延迟跳转
          setTimeout(() => {
            this.loading = false
            this.$router.push({path: `/${this.type}`, query: {active: 1}})
          },1000)
        },
        error => {
          this.$toast.fail(error.msg)
          this.loading = false
        }
      )
    },
    onSubmit() {  //提交流程
      this.form = this.$refs.form.form
      this.keyObj = this.$refs.examine.keyObj
      // 获取api
      let apiList = this[`${this.type}Api`]
    
      if(this.form.egressStartTime == ''){
        this.$toast("开始时间不能为空");
        return false;
      }
      if(this.form.egressEndTime == ''){
        this.$toast("结束时间不能为空");
        return false;
      }
      if(this.form.reasons == ''){
        this.$toast("外出事由不能为空"); 
        return false;
      }
      let formData = {}
      // 表单，字段名首字符大写
      formData[`zt${this.type.substring(0,1).toUpperCase() + this.type.substring(1)}`] = this.form
      //审批意见
      formData.approvalOpinion =  this.keyObj.approvalOpinion

      if (this.keyObj.examMarkStatus == 1 || this.keyObj.examMarkStatus == 4) {  //1.转审，4.重新发起
        if (!this.keyObj.id) {
           this.$toast("审核人不能为空")
           return false
        }
        formData.url =  `${window.location.origin+ window.location.pathname}/#/workflow?type=${this.type}`
        formData.multiAssignees = this.keyObj.id
        this.api = apiList.turn
      } else if (this.keyObj.examMarkStatus == 2) {  // 退回
        formData.url =  `${window.location.origin + window.location.pathname}#/workflow?type=${this.type}`
        formData.startUserId = this.processList[0].assignee
        this.api = apiList.back
      } else if (this.keyObj.examMarkStatus == 3 && this.keyObj.radio == 1) {  //3.结束-同意
        formData.result = 3
        formData.url =  `${window.location.origin + window.location.pathname}#/workflow?type=${this.type}`
        formData.copyAccountIds = this.$refs.examine.personIds
        formData.copyManageIds = this.$refs.examine.orgIds
        this.api = apiList.over
      } else if (this.keyObj.examMarkStatus == 3 && this.keyObj.radio == 2) {  //3.结束-拒绝
        formData.result = 4
        this.api = apiList.over
      } else if (this.keyObj.examMarkStatus == 5) {  //作废
        this.api = apiList.invalid
      }
      this.loading = true
      this.loadingText = '正在提交...'

      this.$post(
        this.api,
        formData,
        data => {
          this.$toast.success(data.msg)
          // 提示审批成功,延迟跳转
          setTimeout(() => {
            this.loading = false
            if (this.isAndroid()) { // 判断设备是安卓还是ios
              android.back()
            } else {
              webkit.messageHandlers.back.postMessage({})
            }
          },1000)
          
        },
        error => {
          this.loading = false
          this.$toast.fail(error.msg)
        }
      )
    },
    isAndroid() {
        // 判断设备为安卓
      var u = navigator.userAgent;
      if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {  //是否是ios
        return false;
      }
      return true;
    },
    getUser () {
      this.$post(
        PERSON_INFO,
        '',
        data => {
          sessionStorage.setItem('user', JSON.stringify(data.data))
          this.$store.commit('user', data.data)
          this.getDetail()
        }
      )
    },
    getDetail () {
      this.loading = true
      this.loadingText = '正在加载...'
      this.$post(
        PROCESS_DETAIL,
        {
          businessKey: this.queryId,
          type: this.type
        },
        data => {
          this.copyList = data.data.copies
          this.processList = data.data.auditList
          this.form = data.data.business

          // 判断登录的是否是当前审批人
          let len = this.processList.length
          if (len > 0 && this.user && this.processList[len-1].assignee === this.user.id && this.processList[len-1].result == null) {
            this.isView = false
          } else {
            document.title = `${this.typeTitle[this.type]}详情`
          }
          // 判断是否显示撤回按钮
          if (len == 2 && this.user && this.processList[0].assignee === this.user.id && this.processList[1].result == null) {
            this.isShowRecall = true
          }

          // 判断是否禁用
          if(this.form.approStatus == 1 && !this.isView) {
            this.isDisabled = false
          }
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
    let query = this.$route.query
    this.type = query.type
    this.queryId = query.id
    document.title = this.typeTitle[this.type]
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
      this.getDetail()
    } else {
      this.getDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.workflow{
  margin-bottom: 65px;
}
.heights {
  width: 100%;
  height: 10px;
  background:#f2f2f2;
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
  .width {
    width: 96%;
    margin: 15px 2%;
    text-align: center;
  }
}
</style>