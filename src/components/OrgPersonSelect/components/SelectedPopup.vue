<template>
  <van-popup
    v-model="shows"
    :overlay="false"
    overlayClass="rightType"
    position="right"
    :style="{ width: '100%', height: '100%'}">
    <div class="box">
      <ul class="org-list" v-if="activePersonList.length > 0 || activeOrgList.length > 0">
        <li class="org-item" v-for="item in activeOrgList" :key="item.id">
          <OrgItem :data="item" :value.sync="selectedObj[item.id]" :isDelete="true"/>
        </li>
        <li class="org-item" v-for="item in activePersonList" :key="item.id">
          <PersonItem v-on="$listeners" :data="item" :value.sync="selectedObj[item.id]" :isDelete="true"/>
        </li>
      </ul>
      <p v-else class="no-data">暂无数据</p>
      <div class="ends">
        <van-button plain  type="info" @click="shows = false">关 闭</van-button>
      </div>
    </div>
  </van-popup>
</template>

<script>
import OrgItem from './OrgItem'
import PersonItem from './PersonItem'
export default {
  components: { OrgItem, PersonItem },
  props: {
    show: Boolean,
    isActiveObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    show (val) {
      this.shows = val
    },
    shows (val) {
      this.$emit('update:show', val)
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
        this.selectedObj = val
      },
      deep: true
    }
  },
  data () {
    return {
      shows: false,
      activePersonList: [],
      activeOrgList: [],
      selectedObj: {}
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
  padding: 20px 20px;
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
  margin: 5px 0;
  color: #666;
}

</style>