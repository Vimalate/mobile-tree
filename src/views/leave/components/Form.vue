<template>
 <div class="form">
    <van-form>
      <van-cell class="cell-border-bottom" is-link :value="columns[form.leaveType - 1] || '请选择'" @click="isDisabled ? '' : showPicker = true">
        <template #title>
          <span class="custom-title">请假类型</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
      </van-cell>
      <van-cell class="cell-border-bottom" is-link :value="form.leaveStartTime || '请选择'" @click="openDateTime('leaveStartTime')">
        <template #title>
          <span class="custom-title">开始时间</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
      </van-cell>
      <van-cell class="cell-border-bottom" is-link :value="form.leaveEndTime || '请选择'" @click="openDateTime('leaveEndTime')">
        <template #title>
          <span class="custom-title">结束时间</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
      </van-cell>
      <!-- <van-cell class="cell-border-bottom" is-link :value="form.duration || '自动计算'">
        <template #title>
          <span class="custom-title">时长(小时)</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
      </van-cell> -->
      <van-cell class="cell-border-bottom"  >
        <template #title>
          <span class="custom-title">时长(小时)</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
        <template #extra>
          <van-field :disabled="isDisabled" v-model="form.duration" class="cell-input" :label-width="0"  input-align="right" placeholder="自动计算" />
        </template>
      </van-cell>

      <div class="form-reasons">
        <van-cell class="cell-title" :value="isDisabled ? form.reasons : ''">
          <template #title>
            <span class="custom-title">请假事由</span>
            <img class="require-img" src="../img/u256.png" alt="">
          </template>
        </van-cell>
        <van-field
          v-if="!isDisabled"
          clearable
          type="textarea"
          v-model="form.reasons"
          placeholder="请输入请假事由"/>
      </div>
      <slot></slot>
      <div class="form-remarks">
        <van-cell title="备注" class="title cell-title" :value="isDisabled ? form.remarks : ''"></van-cell>
        <van-field
          clearable
          v-if="!isDisabled"
          type="textarea"
          v-model="form.remarks"
          placeholder="请输入备注"/>
      </div>
      <div class="heights"></div>
    </van-form>
    <van-action-sheet v-model="showPicker" >
      <van-picker show-toolbar title="标题" item-height="0.8rem" :columns="columns" @confirm="onConfirmPicker" />
    </van-action-sheet>
    <sh-select-time :show.sync="timeShow" @confirm="onConfirmTime"></sh-select-time>
  </div>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    formData: Object,
    id: String,
    active: Number
  },
  watch: {
    active: {
      handler (val) {
        if (!val) {
          this.resetForm()
        }
      },
      immediate: true
    },
    formData (val) {
      this.form = {...val}
      this.form.egressEndTime ? this.form.egressEndTime = this.$dayjs(this.form.egressEndTime).format("YYYY-MM-DD HH:mm") : ''
      this.form.egressStartTime ? this.form.egressStartTime = this.$dayjs(this.form.egressStartTime).format("YYYY-MM-DD HH:mm") : ''
      this.form.originDate ? this.form.originDate = this.$dayjs(this.form.originDate).format("YYYY-MM-DD HH:mm") : ''
      this.form.createTime ? this.form.createTime = this.$dayjs(this.form.createTime).format("YYYY-MM-DD HH:mm") : ''
    }
  },
  data () {
    return {
      form: {
        leaveType: null,
        leaveStartTime: '',
        leaveEndTime: '',
        reasons: '',
        remarks: '',
        duration: ''
      },
      person: {
        id: '',
        name: '',
        handlerAccount: ''
      },
      activeTimeParam: '',
      timeShow: false,
      showPicker: false,
      columns: ['年假', '事假', '病假', '其他']
    }
  },
  methods: {
    openDateTime (param) { //打开选择日期弹框
      if (this.isDisabled) return
      this.activeTimeParam = param
      this.timeShow = true
    },
    onConfirmTime(date) { //选择日期
      this.form[this.activeTimeParam] = date
      // 计算时长
      if (this.form.leaveStartTime && this.form.leaveEndTime) {
        let num = this.$dayjs(this.form.leaveEndTime).diff(this.form.leaveStartTime,'minute') / 60
        if (num <= 0) {
          this.form[this.activeTimeParam] = ''
          this.form.duration = ''
          this.$toast('结束时间不能小于开始时间')
          return
        }
        this.form.duration = num
      }
    },
    onConfirmPicker (name, index) {
      this.form.leaveType = index + 1
      this.showPicker = false
    },
    resetForm () {
      this.form = {
        leaveType: null,
        leaveStartTime: '',
        leaveEndTime: '',
        reasons: '',
        remarks: '',
        duration: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cell-input{
  width: 60%;
  padding: 0;
  ::v-deep.van-field__control{
    color: #969799;
  }
}
.cell-title{
  ::v-deep.van-cell__title{
    flex: inherit;
    width: 90px;
  }
}
.require-img{
  width: 6px;
  vertical-align: text-top;
  margin-left: 4px;
  margin-top: 2px;
}
.form-reasons{
  .van-cell::after{
    border: none;
  }
  .van-field{
    padding-top: 0;
  }
}
.form-remarks{
  .title::after{
    top: 0;
    bottom: auto;
  }
  .van-field{
    padding-top: 0;
  }
}
.van-cell::after{
  border: none;
}
</style>