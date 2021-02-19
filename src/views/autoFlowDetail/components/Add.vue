<template>
  <div class="addFrom">
    <div class="heights"></div>
    <auto-form :isDisabled="isDisabled" :flowInfo="flowInfo" ref="form"></auto-form>
    <div class="heights"></div>
    <div class="ends">
      <van-button plain v-if="queryId" type="info" @click="onDelete">删 除</van-button>
      <van-button plain class="saves" type="info"  @click="onSave">保 存</van-button>
      <van-button type="info" @click="onSubmit">提 交</van-button>
    </div>
    <sh-loading :loading="loading" :text="loadingText"></sh-loading>
  </div>
</template>
<script>
import AutoForm from './Form'
import { AUTOTABLE_FORM_SUBMIT, AUTOTABLE_FORM_SAVE, AUTOTABLE_FORMFLOW_DETAILS } from '@/apis/autoflow'
export default {
  components: { AutoForm},
  props: {
    flowInfo: Object,
    formId: String,
    active: Number,
    queryId: String
  },
   watch: {
    active (val) {
      if (val == 1) {
        this.$refs.form.resetForm()
      }
    }
  },
  data () {
    return {
      loading: false,
      loadingText: '正在加载...'
    }
  },
  methods: {
    onDelete () {},
    onSave () {
      this.$refs.form.$refs.form.validate(valid => {
        let form = this.$refs.form.form
        form.formId = this.formId
        this.loading = true
        this.loadingText = '正在保存...'
        this.$post(
          AUTOTABLE_FORM_SAVE,
          form,
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
    onSubmit () {
      this.$refs.form.$refs.form.validate(valid => {
        let form = this.$refs.form.form
        form.formId = this.formId
        this.loading = true
        this.loadingText = '正在提交...'
        this.$post(
          AUTOTABLE_FORM_SUBMIT,
          form,
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
}
</style>
