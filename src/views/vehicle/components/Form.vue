<template>
 <div class="form">
    <van-form>
      <van-cell class="cell-border-bottom" is-link :value="form.startTime || '请选择'" @click="openDateTime('startTime')">
        <template #title>
          <span class="custom-title">开始时间</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
      </van-cell>
      <van-cell class="cell-border-bottom" is-link :value="form.endTime || '请选择'" @click="openDateTime('endTime')">
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

      <van-cell class="cell-border-bottom" is-link :value=" form.useTypeName  || '请选择'" @click="isDisabled ? '': showPicker =true">
        <template #title>
          <span class="custom-title">用车类型</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
      </van-cell>

      <van-popup class="cell-border-bottom" v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          value-key="type"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>

      <van-cell class="cell-border-bottom"  >
        <template #title>
          <span class="custom-title">用车起点</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
        <template #extra>
          <van-field :disabled="isDisabled" v-model="form.startPoint" class="cell-input" :label-width="0"  input-align="right" placeholder="请输入起点" />
        </template>
      </van-cell>

      <!-- <van-cell-group >
        <van-field v-model="form.startPoint" label="用车起点"  input-align="right" placeholder="请输入用车起点" />
      </van-cell-group> -->

       <van-cell class="cell-border-bottom"  >
        <template #title>
          <span class="custom-title">用车目的地</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
        <template #extra>
          <van-field :disabled="isDisabled" v-model="form.endPoint" class="cell-input" :label-width="0"  input-align="right" placeholder="请输入目的地" />
        </template>
      </van-cell>

      <van-cell class="cell-border-bottom" is-link @click="showPopup" :value="form.vehicleName || '默认分配'" >
        <template #title>
          <span class="custom-title">选择车辆</span>
        </template>
      </van-cell>
      <van-popup
        v-model="show"
        :overlay="false"
        overlayClass="rightType"
        position="right"
        :style="{ width: '100%', height: '100%'}">
        <div> 
    <ShList :api="listApi" ref="list" >
      <div class="lists_content"  @click="registrationFun(scope.item)" slot-scope="scope">
        <div class="radiuces">
          <div class="flexs">
        </div>
        <div class="link">
          <p class="type">
            <span>车辆品牌：{{ (scope.item.brand) }}</span>
          </p>
          <p class="type">
            <span>车牌号：{{ (scope.item.number) }}</span>
          </p>
          <p class="type">
            <span>座位数：{{ (scope.item.seatCount) }}座</span>
          </p>
        </div>
        </div>
      </div>
    </ShList>    
    </div>
    <div class="close">      
    <van-button plain type="info" @click="upStep">返回</van-button>
    </div>
      </van-popup>

      <!-- <van-cell  >
        <template #title>
          <span class="custom-title" >驾车方式</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
        <van-field name="radio"  >
          <template #input >
            <van-radio-group  v-model="form.driveType" style="margin-left:auto;"   direction="horizontal">
               <van-radio  :name=1>司机</van-radio>
                <van-radio :name=2 >自驾</van-radio>
            </van-radio-group>
          </template>
        </van-field> 
      </van-cell> 

      <van-cell is-link :value="form.driverName || '请选择'" @click="showPerson = true">
        <template #title>
          <span class="custom-title">驾驶员</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
      </van-cell>   -->

      <van-cell class="cell-border-bottom" is-link :value="this.keyObj.copy || '请选择'" @click="isDisabled ? '': showPerson1 = true">
        <template #title>
          <span class="custom-title">内部乘车人员</span>
        </template>
      </van-cell>  

       <van-cell class="cell-border-bottom" >
        <template #title>
          <span class="custom-title">外部乘车人员</span>
        </template>
        <template #extra>
          <van-field :disabled="isDisabled" v-model="form.outerPassengers" class="cell-input" :label-width="0"  input-align="right" placeholder="人员名字之间用“,”隔开" />
        </template>
      </van-cell>

      <div class="form-reasons">
        <van-cell class="cell-title" :value="isDisabled ? form.reason : ''">
          <template #title>
            <span class="custom-title">用车事由</span>
            <img class="require-img" src="../img/u256.png" alt="">
          </template>
        </van-cell>
        <van-field
          v-if="!isDisabled"
          clearable
          type="textarea"
          v-model="form.reason"
          placeholder="请输入用车事由"/>
      </div>
      <slot></slot>
      <div class="heights"></div>
    </van-form>
    <van-action-sheet v-model="showCity" >
      <van-area title="城市" item-height="0.8rem" :area-list="areaList" :columns-num="2"  @confirm="onConfirmCity"/>
    </van-action-sheet>
    <sh-select-time :show.sync="timeShow" @confirm="onConfirmTime"></sh-select-time>
    <OrgPersonSelect :show.sync="showPerson" @getPerson="getPerson" ></OrgPersonSelect>
    <OrgPersonSelect :show.sync="showPerson1" @getPerson="getPerson1" :checkbox="true" :data="defaultCopyObj"></OrgPersonSelect>
  </div>
</template>

<script>
import { OrgPersonSelect } from '@/components'
import {  VEHICLE_TYPE, VEHICLE_SELECT } from '@/apis/workflow'
export default {
  components: {OrgPersonSelect},
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    formData: Object,
    active: Number,
    id: String
  },
  shows: false,
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
      this.form.driveType = val.driveType
      this.onConfirmTime1()
      this.form.egressEndTime ? this.form.egressEndTime = this.$dayjs(this.form.egressEndTime).format("YYYY-MM-DD HH:mm") : ''
      this.form.egressStartTime ? this.form.egressStartTime = this.$dayjs(this.form.egressStartTime).format("YYYY-MM-DD HH:mm") : ''
      this.form.originDate ? this.form.originDate = this.$dayjs(this.form.originDate).format("YYYY-MM-DD HH:mm") : ''
      this.form.createTime ? this.form.createTime = this.$dayjs(this.form.createTime).format("YYYY-MM-DD HH:mm") : ''
      // val.innerPassengers.forEach(item => {
      //   this.orgIds.push(item.id)
      //   this.personName = this.personName ? `${this.personName},` + item.managementName : item.managementName
      //   this.personIds.push(item.id)
      //   this.form.innerPassengerIds=this.personIds
      //   this.personName = this.personName ? `${this.personName},` + item.passengerName : item.passengerName
      //   })
      this.keyObj.copy = ''
      val.innerPassengers.forEach(item => {
          this.keyObj.copy = this.keyObj.copy ? `${this.keyObj.copy},` + item.passengerName : item.passengerName  
      }) 
       
      this.useTypeName=val.type
    }
    
  },
  data () {
    return {
      show: false,
      driveType: '1',
      showPerson: false,
      showPerson1: false,
      listApi: VEHICLE_SELECT,
      form: {
        vehicleName: '',
        egressEndTime: '',
        egressStartTime: '',
        reason: '',
        vehicleId: '',
        duration: '',
        startPoint: '',
        endPoint: '',
        useType: '',
        innerPassengerIds: '',
        innerManagementIds: '',
        outerPassengers: [],
        driveType: '',
        startTime: '',
        endTime: '',
        innerPassengerName: '',
        type: ''
      },
      innerPassengerName: '',
      selectType: '',
      userTypeName: '',
      orgIds: [],
      personIds: [],
      personName:'',
      showPicker: false,
      showPicker1: false,
      columns: [],
      columns1:[],      
      person: {
        id: '',
        name: '',
        handlerAccount: ''
      },
     keyObj: {
        examMarkStatus: 1,
        radio: '1',
        approvalOpinion: '同意',
        id: '',
        name: '',
        copy: ''
      },
      activeTimeParam: '',
      timeShow: false,
      innerManagementIds: [],
      innerPassengerIds: [],
      defaultCopyObj: {}
    }
  },
  methods: {
    registrationFun (item) {
      this.show = false;
      this.form.vehicleName=item.number
      this.form.vehicleId=item.id
    },
    loadTypeList () {
      this.$post(
        VEHICLE_TYPE,
        {
          page: 1,
          limit: 100
        },
        data => {
          this.columns = data.data
        },
        error => {
          this.$toast.fail(error.msg)
        }
      )
    },
      upStep () {  //上一步
       this.show = false;
      },
    showPopup() {
      if (this.isDisabled) return
      this.show = true;
    },
    openDateTime (param) { //打开选择日期弹框
      if (this.isDisabled) return
      this.activeTimeParam = param
      this.timeShow = true
    },
    onSelect(item) {
      this.show = false;
      Toast(item.name);
    },
    onConfirm(row) {  
      if (this.isDisabled) return
      this.form.useTypeName = row.type;
      this.form.useType = row.id;
      this.showPicker = false;
    },
    onConfirm1(id) { 
      this.form.id = id;
      this.showPicker1 = false;
    },
    getPerson(data) {   //选择人员后回调
      this.form.driverName = data.name
      this.form.driverId = data.id
      this.showPerson = false   
    },
    //  getPerson1 (org, person, obj) {
    //   this.orgIds = []
    //   this.personIds = [] 
    //   this.form.personName = ''
    //   org.forEach(item => {
    //     this.orgIds.push(item.id)
    //     this.personName = this.personName ? `${this.personName},` + item.managementName : item.managementName
    //   })
    //   person.forEach(item => {   
    //     this.personIds.push(item.id)
    //     this.form.innerPassengerIds=this.personIds
    //     this.personName = this.personName ? `${this.personName},` + item.name : item.name
    //   })   
    //   this.defaultCopyObj = obj
    //   this.showPerson1 = false   
    // },
      getPerson1 (org, person, obj) {
      this.orgIds = []
      this.personIds = []
      this.keyObj.copy = ''
      org.forEach(item => {
        this.orgIds.push(item.id)
        this.form.innerManagementIds=this.orgIds
        this.keyObj.copy = this.keyObj.copy ? `${this.keyObj.copy},` + item.managementName : item.managementName
      })
      person.forEach(item => {
        this.personIds.push(item.id)
        this.form.innerPassengerIds=this.personIds
        this.keyObj.copy = this.keyObj.copy ? `${this.keyObj.copy},` + item.name : item.name
      })
      this.defaultCopyObj = obj
      this.showPerson1 = false     
    },
     openCity (param) {
      if (this.isDisabled) return
      this.activeCityParam = param
      this.showCity = true
    },
    onConfirmTime(date) { //选择日期
      this.form[this.activeTimeParam] = date
      // 计算时长
      if (this.form.startTime && this.form.endTime) {
        let num = this.$dayjs(this.form.endTime).diff(this.form.startTime,'minute') / 60
        if (num <= 0) {
          this.form[this.activeTimeParam] = ''
          this.form.duration = ''
          this.$toast('结束时间不能小于开始时间')
          return
        }
        this.form.duration = num
      }
    },
      onConfirmTime1() { //选择日期
      // 计算时长
      if (this.form.startTime && this.form.endTime) {
        let num = this.$dayjs(this.form.endTime).diff(this.form.startTime,'minute') / 60
        if (num <= 0) {
          this.form[this.activeTimeParam] = ''
          this.form.duration = ''
          this.$toast('结束时间不能小于开始时间')
          return
        }
        this.form.duration = num
      }
    },
    resetForm () {
      this.form = {
        reason: '',
        duration: '',
        useType: '',
        startPoint: '',
        endPoint: '',
        innerPassengerIds: '',
        innerManagementIds: '',
        outerPassengers: [],
        passengerName: '',
        vehicleId:'',
        driveType: '',
        startTime: '',
        endTime: '',
        egressEndTime: '',
        egressStartTime: '',
        vehicleName: '',
        type: ''
      }
    }
  },
  mounted() {
    this.loadTypeList()
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
.cell-input{
  width: 60%;
  padding: 0;
  ::v-deep.van-field__control{
    color: #969799;
  }
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
 .lists_content {
  border: 1px solid rgb(193, 238, 253);
  box-shadow: 2px 2px 8px 2px rgba(8, 10, 39, 0.227450980392);
  width: 90%;
  background: white;
  margin: 20px auto;
  padding-bottom: 4px;
  border-radius: 10px;
}
#courseRegistra .lists_content .radiuces .link {
  width: 97%
}
#courseRegistra .lists_content .radiuces {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
.lists_content .radiuces .flexs .btnIng {
  margin-right: 20px;
}
 .lists_content .van-cell {
  width: 78%;
  font-size: 16px;
  border-radius: 10px;
}
.close{
position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 0 20px;
  border-top: 1px solid #eee;
  .van-button {
    width: 100%;
    height: 35px;
    margin: 15px 0;
    padding: 0;
  }
}
.no-data{
  text-align: center;
  margin: 5px 0;
  color: #666;
}
.active-num{
  color: #8080ff;
  margin: 0 2px;
}
.selected-text{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 14px;
  margin: 15px 0;
  line-height: 35px;
  span {
    font-size: 14px;
  }
  .up-icon{
    font-size: 16px;
    vertical-align: middle;
  }
}
 .lists_content .type {
  padding-left: 15px;
  line-height: 22px;
  color: #666666;
  font-size: 14px;
}
 .lists_content .left {
  margin-left: 10px;
  margin-right: 10px;
}
 .lists_content .flexs {
  display: flex;
  width: 100%;
}
</style>