<template>
  <div class="autoflow">
    <div class="autoflow-box">
      <div class="autoflow-tile">假勤</div>
      <van-row class="list">
        <van-col span="6" v-for="(item, index) in flowList" :key="item.id">
         <div class="icon-wrap" :style="{'background-color': colorList[index%4]}" @click="opDetail(item)">
           <van-icon :name="iconList[index%4]" />
         </div>
         <div class="item-name">{{ item.title }}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { AUTOFORM_LIST } from '@/apis/autoflow'
export default {
  data () {
    return {
      colorList: ['#1989fa', '#07c160', '#ff976a', '#ee0a24'],
      iconList: ['friends', 'todo-list', 'music', 'underway'],
      flowList: []
    }
  },
  methods: {
    getFlowList () {
      this.$post(
        AUTOFORM_LIST,
        {
          limit: 100,
          page: 1
        },
        data => {
          this.flowList = data.data
        }
      )
    },
    opDetail (row) {
      this.$router.push({path: '/autoFlowDetail', query: {id: row.id, name: row.title}})
    }
  },
  created () {
    this.$queryToken(() => {
      this.getFlowList()
    })
  }
}
</script>

<style lang="scss" scoped>
.autoflow{
  background: #f0f2f5;
  height: 100vh;
  overflow: hidden;
  &-box{
    margin: 10px 5px;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 5px;
  }
}
.list{
  margin-top: 20px;
}
.item-name{
  text-align: center;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 12px;
  line-height: 26px;
}
.icon-wrap{
  width: 40px;
  height: 40px;
  line-height: 30px;
  border-radius: 5px;
  text-align: center;
  background: red;
  margin: auto;
  .van-icon{
    margin-top: 9px;
    color: #fff;
    font-size: 22px;
  }
}
</style>