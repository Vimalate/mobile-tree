<template>
  <div class="workflow">
    <div class="heights"></div>
    <!-- 业务表单 -->
    <auto-form :isDisabled="isDisabled" :flowInfo="flowInfo" :formData="form" ref="form"></auto-form>
    <div class="heights"></div>
    <!-- 审批列表 -->
    <WorkflowDetails :list="processList" :copyList="copyList"/>
    <div class="heights"></div>
    <div class="ends" v-if="!isView || isShowRecall">
      <van-button v-if="isShowRecall" plain type="info" @click="onRecall" :class="{width: isView && isShowRecall}">撤 回</van-button>
      <van-button v-if="!isView" type="info" @click="onSubmit" :class="{width: !isView && !isShowRecall}">提 交</van-button>
    </div>
    <sh-loading :loading="loading" :text="loadingText"></sh-loading>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      loading: false,
      loadingText: '正在加载...',
      form: {}
    }
  },
  methods: {
    onRecall () {  // 撤回
      this.loading = true
      this.loadingText = '正在撤回...'
      this.form = this.$refs.form.form
      
      
    },
    onSubmit() {  //提交流程
      this.form = this.$refs.form.form
      this.keyObj = this.$refs.examine.keyObj
     
    },
    isAndroid() {
        // 判断设备为安卓
      var u = navigator.userAgent;
      if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {  //是否是ios
        return false;
      }
      return true;
    },
    getDetail () {
      this.loading = true
      this.loadingText = '正在加载...'
      
      
    }
  },
  created () {
    this.formName = this.$route.query.name
    this.formId = this.$route.query.id
    this.$queryToken(() => {
      if (this.formName) {
        document.title = this.formName
        this.getDetail()
      }
    })
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