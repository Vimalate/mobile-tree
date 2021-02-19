<template>
  <div class="addFrom">
    <div class="heights"></div>
    <business-form :isDisabled="isDisabled" :formData="form" :active="active" ref="form">
      <div class="heights"></div>
      <div class="fromMustRow">
        <van-cell @click="shows = true" is-link title="审核人"  :value="assigneesForm.name"/>
      </div>
      <div class="heights"></div>
    </business-form>
    <div class="heights"></div>
    <div class="ends">
      <van-button plain v-if="queryId" type="info" @click="delForm()">删 除</van-button>
      <van-button plain class="saves" type="info"  @click="validateForm">保 存</van-button>
      <van-button type="info" @click="validateForm('submit')">提 交</van-button>
    </div>
    <sh-loading :loading="loading" :text="loadingText"></sh-loading>
    <OrgPersonSelect :show.sync="shows" @getPerson="getPerson" ></OrgPersonSelect>
  </div>
</template>
<script>
import { BUSINESS_DETAIL, BUSINESS_CREATE, BUSINESS_UPDATE, BUSINESS_SUBMIT, BUSINESS_DELETE } from '@/apis/workflow'
import { mapState } from 'vuex'
import BusinessForm from './Form'
import { OrgPersonSelect } from '@/components'
export default {
  components: { BusinessForm , OrgPersonSelect},
  props: {
    active: Number,
    queryId: String
  },
  watch: {
    active (val) {
      if (val == 1) {
        this.$refs.form.resetForm()
        this.assigneesForm.name = ''
        this.assigneesForm.id = ''
      }
    },
    queryId (val) {
      if (val) {
        this.loadInfo()
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      form: {},
      isDisabled: false,
      assigneesForm: {
        id: '',
        name: '',
        handlerAccount: ''
      },
      businessData: {},
      shows: false,
      loading: false,
      loadingText: '正在加载...'
    }
  },
  methods: {
    delForm () {
      this.$dialog.confirm({
        title: '提示',
        message: '确认删除数据？',
      }).then(() => {
        this.loading = true
        this.loadingText = '正在删除...'
        this.$post(
          BUSINESS_DELETE,
          {id: this.queryId},
          data => {
            this.loading = false
            this.$toast.success(data.msg)
            this.$emit('update:active', 1)
          },
          error => {
            this.loading = false
            this.$toast.fail(error.msg)
          }
        )
      })
    },
    getPerson(data) {   //选择人员后回调
      this.assigneesForm.name = data.name
      this.assigneesForm.id = data.id
      this.assigneesForm.handlerAccount = data.loginName
      this.shows = false   
    },
    validateForm (param) {  //表单校验
      this.form = this.$refs.form.form
      if(this.form.businessStartTime == ''){
        this.$toast("开始时间不能为空");
        return false;
      }
      if(this.form.businessEndTime == ''){
        this.$toast("结束时间不能为空");
        return false;
      }
      if(this.form.reasons == ''){
        this.$toast("外出事由不能为空");
        return false;
      }
      
      if(param === 'submit' && this.assigneesForm.id == ''){
        this.$toast("审核人不能为空");
        return false;
      }
      
      if(param === 'submit'){
        if (this.assigneesForm.id == '') {
          this.$toast("审核人不能为空");
          return false;
        }
        this.onSubmit()
      } else {
        this.onSave()
      }
    },
    onSave () {  // 保存业务单
      this.loading = true
      this.loadingText = '正在保存...'
      this.$post(
        this.queryId ? BUSINESS_UPDATE : BUSINESS_CREATE,
        this.form,
        data => {
          this.loading = false
          this.$toast.success(data.msg)
          this.$emit('update:active', 1)
        },
        error => {
          this.loading = false
          this.$toast.fail(error.msg)
        }
      )
    },
    onSubmit (id) {   // 启动流程
      this.loading = true
      this.loadingText = '正在提交...'
      let param = {
        ztBusiness: this.form,
        startUserId: this.user.id,
        url: `${window.location.origin + window.location.pathname}/#/workflow?type=business`,
        multiAssignees: this.assigneesForm.id
      }
      this.$post(
        BUSINESS_SUBMIT,
        param,
        data => {
          this.loading = false
          this.$toast.success(data.msg)
          this.$emit('update:active', 1)
        },
        error => {
          this.loading = false
          this.$toast.fail(error.msg)
        }
      )
    },
    loadInfo () { // 加载业务单信息
      this.loading = true
      this.loadingText = '正在加载...'
      this.$post(
        BUSINESS_DETAIL,
        {id: this.queryId},
        data => {
          this.form = data.data
          this.loading = false
        },
        error => {
          this.$toast.fail(error.msg)
          this.loading = false
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.addFrom {
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
  .heights {
    width: 100%;
    height: 10px;
    background:#f2f2f2;
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
}
</style>
