<template>
 <div class="form">
      <van-form>
        <van-field class="cell-border-bottom" v-model="form.conferenceTopic"  placeholder="请输入会议主题" input-align="right">
        <template #label>
          <span class="custom-label">会议主题</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
      </van-field>
      <van-cell class="cell-border-bottom" is-link :value="form.conferenceDate" @click="conferenceDateShow = true" >
          <template #title>
          <span class="custom-title">会议日期</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
        </van-cell>
      <van-cell class="cell-border-bottom" is-link :value="form.meetingId != null ? form.meetingLocal : '请选择'" @click="meetingShow = true">
        <template #title>
          <span class="custom-title">会议地点</span>
          <img class="require-img" src="../img/u256.png" alt="">
        </template>
        </van-cell>
        <van-cell class="cell-border-bottom" is-link :value="displayStartTime&&displayEndTime?displayStartTime+'-'+displayEndTime:'' || '请选择'" @click="generatedTimeArray()">
        <template #title>
          <span class="custom-title">会议时间</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
      </van-cell>
      <!-- <van-cell class="cell-border-bottom" is-link :value="form.duration || '自动计算'">
        <template #title>
          <span class="custom-title">持续时间</span>
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

      <van-cell class="cell-border-bottom" is-link :value="form.conferenceType != null ? conferenceTypes[form.conferenceType-1].name : '请选择'" @click="conferenceTypeShow = true">
        <template #title>
          <span class="custom-title">会议类型</span>
            <img class="require-img" src="../img/u256.png" alt="">
        </template>
        </van-cell>
        <div  class="form-conferenceContent ">
        <van-cell  class="cell-title" :value="isDisabled ? form.conferenceContent : ''">
          <template #title>
            <span class="custom-title">会议内容</span>
            <img class="require-img" src="../img/u256.png" alt="">
          </template>
        </van-cell>
        <van-field class="cell-border-bottom" v-if="!isDisabled" clearable type="textarea" v-model="form.conferenceContent" placeholder="请输入会议内容"/>
      </div>
      <van-cell class="cell-border-bottom" is-link :value="this.form.participants ||'请选择'" @click="isDisabled ? '': confereePeronShow = true">
        <template #title>
          <span class="custom-title">参会人员</span>
        </template>
      </van-cell> 
      <div class="form-remarks">
        <van-cell title="备注" class="title cell-title" :value="isDisabled ? form.remarks : ''"></van-cell>
        <van-field clearable v-if="!isDisabled" type="textarea" v-model="form.remarks" placeholder="请输入备注"/>
      </div>
      <div class="heights"></div>
      </van-form>
      <!-- 弹框占位 -->
      <!-- 日期 -->
      <van-calendar v-model="conferenceDateShow" @confirm="onDateConfirm" />
      <!-- 会议室 -->
      <van-action-sheet v-model="meetingShow" :actions="meetingRoomList" @select="onSelectMeeting" />
      <!-- 会议类型 -->
      <van-action-sheet v-model="conferenceTypeShow" :actions="conferenceTypes" @select="onSelectConferenceType" />
      <!-- 人员选择 -->
      <OrgPersonSelect :show.sync="confereePeronShow" @getPerson="getConfereePeron" :checkbox="true" :data="checkTheDefault"></OrgPersonSelect>
      <!-- 会议时间选择 -->
      <van-popup v-model="confereeTimeView" :overlay="false" overlayClass="rightType" position="right" :style="{ width: '100%', height: '100%' }">
        <p class="time-tile">会议室时间选择</p>
        <div  class="time-list">
          <div v-for="item in timesArray" :key="item" class="time-list-item">
            <van-checkbox v-model="item.checked" shape="square" @click="tiemContinuous(item)" :disabled="item.disabled">{{item.startTime}}-{{item.endTime}}</van-checkbox>
          </div>
        </div>
         <div class="ends">
          <van-button  type="info" @click="setConferenceTime()">确定</van-button>
          <van-button  type="info" plain @click="confereeTimeView = false">返回</van-button>
        </div>
      </van-popup>
  </div>
</template>

<script>
import { OrgPersonSelect } from '@/components'
import { MEETING_LIST_ALL,UNIT_MEETING_LIST_ALL,MEETING_RESERVE_DATE} from '@/apis/base'
export default {
  props: {
    formData: Object,
    active: Number
  },
  components: {
    OrgPersonSelect
  },
  watch:{
   active: {
      handler (val) {
        if(!val){
          this.resetForm()
        }
      },
      immediate: true
    },
    formData (val) {
     if (val) {
        this.form = {...val}
        this.timeFormat()
     }
    }
 },
 data(){
   return{
     conferenceDateShow:false,
     confereeTimeView:false,
     meetingShow:false,
     conferenceTypeShow:false,
     confereePeronShow: false,
     form:{
       conferenceTopic:'',
       meetingId:null,
       meetingLocal:'',
       conferenceDate:this.$dayjs(new Date()).format("YYYY-MM-DD"),
       conferenceStartTime:'',
       conferenceEndTime:'',
       duration:'',
       conferenceType:null,
       conferenceContent:'',
       accountIds:[],
       managementIds:[],
       participants:'',
       remarks:''
     },
     timesArray:[],
     displayStartTime:'',
     displayEndTime:'',
     checkTheDefault:{},
     meetingRoomList:[],
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
     {name:'10-其他',conferenceType:'10'}]
   }
 },
 methods:{
   onDateConfirm(date){
    this.conferenceDateShow = false;
    this.form.conferenceDate = date
    this.form.conferenceDate ? this.form.conferenceDate = this.$dayjs(this.form.conferenceDate).format("YYYY-MM-DD") : ''
   },
   onSelectConferenceType(data){
     this.conferenceTypeShow = false;
     this.form.conferenceType = data.conferenceType;
   },
   onSelectMeeting(data){
     this.meetingShow = false
     this.form.meetingId = data.id
     this.form.meetingLocal = data.meetingLocal
   },
   getConfereePeron(org, person, obj){
     this.confereePeronShow = false;
     this.form.participants = '';
     this.form.accountIds = [];
     this.$set(this.form,'managementIds',[])
     org.forEach(item => {
         this.form.managementIds.push(item.id);
         if(item.managementName){
            this.form.participants = this.form.participants+item.managementName+','
         }
       }
     )
     person.forEach(item =>{
       this.form.accountIds.push(item.id)
       if(item.name){
         this.form.participants = this.form.participants+item.name+','
       }
     })
     if(this.form.participants){
        this.form.participants = (this.form.participants.substring(this.form.participants.length - 1) == ',') ? this.form.participants.substring(0, this.form.participants.length - 1) : this.form.participants;
     }
     this.checkTheDefault = obj;
   },
  listMeetingRoom(){
     this.$post(
          UNIT_MEETING_LIST_ALL,
          {},
          data => {
            if(data.data){
              this.meetingRoomList = data.data
              this.meetingRoomList.forEach(
                item =>{
                this.$set(item,'name',item.meetingLocal)
              })
            }
          }
        )
   },
   generatedTimeArray(){
     if(!this.form.meetingId){
        this.$toast("请先选择会议地点");
        return false;
     }
     this.timesArray = []
     this.confereeTimeView = true;
      for (let i = 16; i < 40; i ++) {
        let obj = {startTime:'',endTime:'',checked:Boolean,disabled:Boolean};
      if (i%2 === 0) {
        obj.startTime = `${i/2 >= 10 ? '' : 0 }${parseInt(i/2)}:00`
        obj.endTime = `${(i+1)/2 >= 10 ? '' : 0 }${parseInt((i+1)/2)}:30`
      } else {
        obj.startTime = `${i/2 >= 10 ? '' : 0 }${parseInt(i/2)}:30`
        obj.endTime = `${(i+1)/2 >= 10 ? '' : 0 }${parseInt((i+1)/2)}:00`
      }
      obj.checked = false
      obj.disabled = false
      this.timesArray.push(obj)
      }
      this.chenkConferenceUse()
   },
   chenkConferenceUse(){
     this.$post(
        MEETING_RESERVE_DATE,
        {meetingId:this.form.meetingId,status:'1',conferenceDate:this.form.conferenceDate,startDate:this.form.conferenceDate+' 00:00',endDate:this.form.conferenceDate},
        data => {
          if(data.data){
            this.timesArray.forEach(item2=>{
              if(this.form.conferenceStartTime&&this.form.conferenceEndTime){
              if((this.$dayjs(this.form.conferenceStartTime)<this.$dayjs(this.form.conferenceDate+' '+item2.startTime)&&this.$dayjs(this.form.conferenceEndTime)>this.$dayjs(this.form.conferenceDate+' '+item2.startTime))
                ||(this.$dayjs(this.form.conferenceStartTime)<this.$dayjs(this.form.conferenceDate+' '+item2.endTime)&&this.$dayjs(this.form.conferenceEndTime)>this.$dayjs(this.form.conferenceDate+' '+item2.startTime))){
                    item2.checked = true
                }
            }
            data.data.forEach(item1 =>{
              if((this.$dayjs(item1.conferenceStartTime)<this.$dayjs(this.form.conferenceDate+' '+item2.startTime)&&this.$dayjs(item1.conferenceEndTime)>this.$dayjs(this.form.conferenceDate+' '+item2.startTime))
                ||(this.$dayjs(item1.conferenceStartTime)<this.$dayjs(this.form.conferenceDate+' '+item2.endTime)&&this.$dayjs(item1.conferenceEndTime)>this.$dayjs(this.form.conferenceDate+' '+item2.startTime))){
                    if(!item2.checked){
                      item2.disabled = true
                    } 
                }
            })
            if(this.$dayjs(this.form.conferenceDate+' '+item2.startTime)<new Date()){
                item2.disabled  = true;
            }
            });
          }
        }
      )
   },
   setConferenceTime(){
     let min = NaN;
     let max = NaN;
     for(let i=0;i<this.timesArray.length;i++){
        if(this.timesArray[i].checked){
          if(isNaN(min)){
              min = i
          }else{
            min = min<i?min:i
          }
          if(isNaN(max)){
            max = i
          }else{
            max = max>i?max:i
          }
        }
     }
      this.form.conferenceStartTime = this.form.conferenceDate +' '+this.timesArray[min].startTime
      this.form.conferenceEndTime = this.form.conferenceDate +' '+this.timesArray[max].endTime
      this.timeFormat()
      this.confereeTimeView = false  
   },
   //将时间设置为连续的
   tiemContinuous(val){
     let count = 0;
     let min = NaN;
     let max = NaN;
     let index = NaN;
     let disArray = [];
     for(let i=0;i<this.timesArray.length;i++){
        if(this.timesArray[i].checked){
          count +=1;
          if(isNaN(min)){
              min = i
          }else{
            min = min<i?min:i
          }
          if(isNaN(max)){
            max = i
          }else{
            max = max>i?max:i
          }
        }
        if(val.startTime ==this.timesArray[i].startTime){
          index = i
        }
     }
      if(count>1){
        for(let i = min;i<max;i++){
          if(this.timesArray[i].disabled){
            disArray.push(i)
          }
        }
        if(disArray.length>0&&disArray[0]>index){
          for(let i = min;i<=disArray[disArray.length-1];i++){
            this.timesArray[i].checked = false
          }
          min = disArray[disArray.length-1]
        }
        if(disArray.length>0&&disArray[0]<index){
          for(let i = disArray[0];i<=max;i++){
            this.timesArray[i].checked = false
          }
          max = disArray[0]
        }
        for(let i = min;i<=max;i++){
          if(!this.timesArray[i].disabled){
            this.timesArray[i].checked = true
          }
        }
        if(index>min&&index<max){
          for(let i = index+1;i<=max;i++){
            this.timesArray[i].checked = false
          }
        }
      }
   },
    timeFormat(){
   this.form.conferenceDate ? this.form.conferenceDate = this.$dayjs(this.form.conferenceDate).format("YYYY-MM-DD") : ''
        this.form.conferenceStartTime ? this.form.conferenceStartTime = this.$dayjs(this.form.conferenceStartTime).format("YYYY-MM-DD HH:mm") : ''
        this.form.conferenceEndTime ? this.form.conferenceEndTime = this.$dayjs(this.form.conferenceEndTime).format("YYYY-MM-DD HH:mm") : ''
        this.form.duration = this.$dayjs(this.form.conferenceEndTime).diff(this.form.conferenceStartTime,'minute')/60
        //页面展示时间
        this.form.conferenceStartTime ? this.displayStartTime = this.$dayjs(this.form.conferenceStartTime).format("HH:mm") : ''
        this.form.conferenceEndTime ? this.displayEndTime = this.$dayjs(this.form.conferenceEndTime).format("HH:mm") : ''
 },
   resetForm(){
     this.form = {
       conferenceTopic:'',
       meetingId:null,
       meetingLocal:'',
       conferenceDate:this.$dayjs(new Date()).format("YYYY-MM-DD"),
       conferenceStartTime:'',
       conferenceEndTime:'',
       duration:'',
       conferenceType:null,
       conferenceContent:'',
       accountIds:[],
       managementIds:[],
       participants:'',
       remarks:''
     },
     this.checkTheDefault = {},
     this.displayStartTime='',
     this.displayEndTime=''
   }
 },
  mounted () {
   this.listMeetingRoom()
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
    .van-field__v-model{
    padding-top: 0;
    color: #666666;
  }
}
.van-cell::after{
  border: none;
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
.time{
  &-tile {
    margin: 20px 20px 0 20px;
    font-size: 20px;
  }
  &-list{
    padding: 20px 20px 80px 20px;
    height: calc(100vh - 60px);
    box-sizing: border-box;
    overflow: auto;
    &-item{
      padding: 5px 0;
    }
  }
}
</style>