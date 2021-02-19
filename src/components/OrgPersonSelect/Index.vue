<template>
  <van-popup
    v-model="shows"
    :overlay="false"
    overlayClass="rightType"
    position="right"
    :style="{ width: '100%', height: '100%'}">
    <div class="box">
      <div class="header">
        <van-search v-model="personName" placeholder="请输入搜索关键词" />
      </div>
      <ul class="org-list" v-if="list.length">
        <li class="org-item" v-for="item in list" :key="item.id">
          <OrgItem :data="item" @getSubList="getSubList"  v-if="item.organizationId || item.organizationCode" :checkbox="checkbox" :value.sync="isActiveObj[item.id]"/>
          <PersonItem v-on="$listeners" :data="item" :checkbox="checkbox" :value.sync="isActiveObj[item.id]" v-else/>
        </li>
      </ul>
      <p v-else class="no-data">{{ txt }}</p>
      <div class="ends">
        <van-button plain  type="info" @click="upStep" v-if="!checkbox">返 回</van-button>
        <van-row v-else gutter="12">
          <van-col span="14">
            <p class="selected-text" v-show="this.activePersonList.length > 0 || this.activeOrgList.length > 0" @click="selectedShow = true">
              <van-icon class="up-icon" name="arrow-up" />
              已选<span v-show="this.activePersonList.length > 0"><span class="active-num">{{ this.activePersonList.length }}</span>人</span>
              <span v-show="this.activePersonList.length > 0 && this.activeOrgList.length > 0">和</span>
              <span v-show="this.activeOrgList.length > 0"><span class="active-num">{{ this.activeOrgList.length }}</span>部门(含子部门)</span>
            </p>
          </van-col>
          <van-col span="5">
            <van-button type="info" @click="sumbit">确认</van-button>
          </van-col>
          <van-col span="5">
            <van-button plain type="info" @click="upStep">返回</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
    <SelectedPopup :show.sync="selectedShow" :isActiveObj.sync="isActiveObj" />
  </van-popup>
</template>

<script>
import OrgItem from './components/OrgItem'
import PersonItem from './components/PersonItem'
import SelectedPopup from './components/SelectedPopup'
import { ORG_LIST, MANAGE_LIST, MANAGE_PERSON_LIST, MANAGE_PERSON_LIST_NAME  } from '@/apis/base'
export default {
  components: { OrgItem, PersonItem, SelectedPopup },
  props: {
    show: Boolean,
    checkbox: Boolean,
    data: Object
  },
  inheritAttrs: false,
  watch: {
    show (val) {
      if (val) {
        this.list = []
        this.txt = ''
        // 每次打开加载数据
        this.loadOrgList()
        this.personName = ''
        this.isActiveObj = this.data || {}
      }
      this.shows = val
    },
    shows (val) {
      this.$emit('update:show', val)
    },
    personName (val) {
      if (val) {
        this.getPersonListByName()
        this.parentList = []
      } else {
        this.loadOrgList()
      }
    },
    isActiveObj: {
      handler (val) {
        this.activePersonList = []
        this.activeOrgList = []
        Object.keys(val).forEach(item => {
          if (val[item] && val[item].organizationId) {
            this.activeOrgList.push(val[item])
          } else if (val[item]){
            this.activePersonList.push(val[item])
          }
        })
      },
      deep: true
    }
  },
  data () {
    return {
      shows: false,
      selectedShow: false,
      personName: '',
      list: [],
      parentList: [],
      isActiveObj: {},
      activePersonList: [],
      activeOrgList: []
    }
  },
  methods: {
    sumbit () {
      this.$emit('getPerson', this.activeOrgList, this.activePersonList, this.isActiveObj)
    },
    loadOrgList () { //请求组织类型列表
      this.$post(
        ORG_LIST,
        {},
        data => {
          // this.list = data.data
          if (data.data.length) {
            this.parentList = [data.data[0]]
            this.getManageList(data.data[0].id)
          }
        }
      )
    },
    getManageList(id) { // 通过组织类型查询列表
      this.$post(
        MANAGE_LIST,
        {organizationId: id},
        data => {
          this.list = data.data
          this.txt = '暂无数据'
        },
        error => {
          this.$toast.fail(error.msg)
          this.txt = '暂无数据'
        }
      )
    },
    getPersonList(id) { // 通过组织id查询列表
      this.$post(
        MANAGE_PERSON_LIST,
        {manageId: id},
        data => {
          this.list = [...data.data.manages, ...data.data.accounts]
        },
        error => {
          this.$toast.fail(error.msg)
        }
      )
    },
    getPersonListByName(id) {   //按名字搜索人员
      this.$post(
        MANAGE_PERSON_LIST_NAME,
        {name: this.personName},
        data => {
          this.list = [...data.data.manages, ...data.data.accounts]
        },
        error => {
          this.$toast.fail(error.msg)
        }
      )
    },
    getSubList (data, actions) {
      this.list = data
      this.parentList.push(actions)
    },
    upStep () {  //上一步
      if (this.parentList.length < 2) { // 当为第一层时关闭弹框
        this.shows = false
        return
      }
      let obj = this.parentList[this.parentList.length - 2]
      this.parentList = this.parentList.slice(0,this.parentList.length - 1)
      if (obj.id === -1) {
        this.loadOrgList()
      } else if (obj.organizationId) {
        this.getPersonList(obj.id)
      } else {
        this.getManageList(obj.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.header{
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  z-index: 2000;
  border-bottom: 1px solid #eee;
  background: #fff;
}
.org-list{
  width: 100%;
  box-sizing: border-box;
  padding: 60px 20px;
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  background-color: #fff;
  -webkit-transition: -webkit-transform .3s;
  transition: -webkit-transform .3s;
  transition: transform .3s;
  transition: transform .3s,-webkit-transform .3s;
  -webkit-overflow-scrolling: touch;
}
.org-item {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  font-size: 16px;
}
.ends{
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
  margin-top: 80px;
  color: #969799;
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
</style>