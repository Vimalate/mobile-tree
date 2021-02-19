<template>
 <div class="form">
    <van-form>
      <van-cell class="cell-border-bottom" is-link :value="countReplenishCard||'自动计算'">
        <template #title>
          <span class="custom-title">已补卡</span>
        </template>
      </van-cell>
      <van-cell class="cell-border-bottom" is-link :value="form.replenishCardTime || '请选择'" @click="onformatDate">
        <template #title>
          <span class="custom-title">补卡时间</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
      </van-cell>
      <van-cell class="cell-border-bottom" is-link :value="form.replenishCardType != null ? listReplenishCardType[form.replenishCardType].name : '请选择'" @click="onreplenishCardType">
        <template #title>
          <span class="custom-title">补卡类型</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
      </van-cell>
      <div class="form-replenishCardReason">
        <van-cell class="cell-title" :value="isDisabled ? form.replenishCardReason : ''">
          <template #title>
            <span class="custom-title">补卡理由</span>
            <img class="require-img" src="../img/u256.png" alt="">
          </template>
        </van-cell>
        <van-field
          v-if="!isDisabled"
          clearable
          type="textarea"
          v-model="form.replenishCardReason"
          placeholder="请输入补卡理由"/>
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
    <!-- 日期弹窗 -->
    <sh-select-time :show.sync="dateShow" @confirm="onConfirmDate"></sh-select-time>
    <!-- <van-calendar v-model="dateShow" :min-date="minDate" @confirm="onConfirmDate" /> -->
    <!-- 下拉弹框 -->
    <van-action-sheet v-model="sheetShow" :actions="listReplenishCardType" @select="replenishCardTypeSelect" />
  </div>
</template>

<script>


import { REPLENISH_CARD_COUNT } from '@/apis/workflow'
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
     if (val) {
        this.form = {...val}
        this.form.replenishCardTime ? this.form.replenishCardTime = this.$dayjs(this.form.replenishCardTime).format("YYYY-MM-DD HH:mm") : ''
        this.getReplenishCardCount(this.form.creatorId,this.form.replenishCardTime)
     }
    }
  },
  data () {
    return {
      form: {
        replenishCardTime: '',
        replenishCardType: null,
        replenishCardReason: '',
        remarks: '',
        creatorId: ''
      },
      person: {
        id: '',
        name: '',
        handlerAccount: ''
      },
      countReplenishCard:null,
      replenishCardTypeName:'',
      dateShow:false,
      minDate: new Date(2010, 0, 1),
      sheetShow:false,
      listReplenishCardType: [{'name':'上班卡','value':'0'},{'name':'下班卡','value':'1'}]
    }
  },
  methods: {
    //打开选择日期弹框
    onformatDate (param) { 
      if (this.isDisabled) return
      this.dateShow = true
    },
    //选择日期
    onConfirmDate(date) { 
        this.dateShow = false
        if(date>new Date()){
            this.$toast('补卡时间不能大于当前时间')
            return
        }
        this.form.replenishCardTime = this.$dayjs(date).format("YYYY-MM-DD HH:mm")
        this.getReplenishCardCount(this.form.creatorId,this.form.replenishCardTime)
    },
    onreplenishCardType(){
      this.sheetShow = true
    },
    replenishCardTypeSelect(item){
      this.form.replenishCardType = item.value
      this.sheetShow = false
    },
    getReplenishCardCount(creatorId,replenishCardTime){
        if(!creatorId){
          replenishCardTime = this.form.replenishCardTime
        }
        this.$post(
          REPLENISH_CARD_COUNT,
          {"creatorId":creatorId,"replenishCardTime":replenishCardTime},
          data => {
            this.countReplenishCard = data.data+''
          }
        )  
    },
    resetForm () {
      this.form = {
        replenishCardTime: '',
        replenishCardType: null,
        replenishCardReason: '',
        remarks: '',
        creatorId: ''
      }
    }
  },
  mounted () {
    // this.getReplenishCardCount()
  }
}
</script>

<style lang="scss" scoped>
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