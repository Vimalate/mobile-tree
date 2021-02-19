<template>
  <div class="addFrom">
    <div class="titles">处理流程</div>
      <div class="fromMustRow fromMustRow_box">
        <van-cell :border="false" title="处理操作"/>
        <div class="boxBtn">
          <div v-for="(item, index) in list" :key="index">
            <div v-if="item.show" class="btns" :class="{selectBth: item.className}" @click="selectFun(item, index)">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="fromMustRow">
        <van-cell :border="false" title="处理意见"/>
        <van-field
        clearable
          type="textarea"
          v-model="keyObj.approvalOpinion"
          placeholder="请输入处理意见"/>
      </div>
      <div v-if="keyObj.examMarkStatus === 3" class="fromMustRow_boxs">
        <van-cell :border="false" title="审批结果"></van-cell>
        <van-radio-group direction="horizontal"  v-model="keyObj.radio">
          <van-radio name="1">通过</van-radio>
          <van-radio name="2">拒绝</van-radio>
        </van-radio-group>
      </div>
      <div v-if="keyObj.examMarkStatus === 1 || keyObj.examMarkStatus === 4"  class="fromMustRow from-name">
        <van-cell :border="false" @click="shows = true" is-link title="处理人" :value="keyObj.name"/>
      </div>
      <div v-if="keyObj.examMarkStatus === 3 && keyObj.radio == 1"  class="fromMustRow from-name">
        <van-cell :border="false" @click="showsCopy = true" is-link title="抄送人" :value="keyObj.copy"/>
      </div>
      <OrgPersonSelect :show.sync="shows" @getPerson="getPerson"></OrgPersonSelect>
      <OrgPersonSelect :show.sync="showsCopy" @getPerson="getPersonOrg" :checkbox="true" :data="defaultCopyObj"></OrgPersonSelect>
  </div>
</template>

<script>
import { OrgPersonSelect } from '@/components'
export default {
  components: {OrgPersonSelect},
  props: {
    approStatus: Number
  },
  watch: {
    approStatus: {
      handler (val) {
        if (val == 1) {
          this.list[0].show = false
          this.list[1].show = false
          this.list[2].show = false
          this.list[3].show = true
          this.list[3].className = true
          this.list[4].show = true
          this.keyObj.approvalOpinion = ''
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      shows: false,
      showsCopy: false,
      list: [
      {
        name: '转审',
        key: 1,
        className: true,
        show: true
      }, {
        name: '退回',
        key: 2,
        className: false,
        show: true
      }, {
        name: '结束',
        key: 3,
        className: false,
        show: true
      },
      {
        name: '重新发起',
        key: 4,
        className: false,
        show: false
      },
      {
        name: '作废',
        key: 5,
        className: false,
        show: false
      }],
      keyObj: {
        examMarkStatus: 1,
        radio: '1',
        approvalOpinion: '同意',
        id: '',
        name: '',
        copy: ''
      },
      orgIds: [],
      personIds: [],
      defaultCopyObj: {}
    }
  },
  methods: {
    selectFun (item, index) {
      this.list.map(val => {
        val.className = false
      })
      this.list[index].className = true
      this.keyObj.examMarkStatus = item.key
      if (index == 0) {
        this.keyObj.approvalOpinion = '同意'
      } else {
        this.keyObj.approvalOpinion = ''
      }
    },
    getPerson(data) {   //选择后回调
      this.keyObj.name = data.name
      this.keyObj.id = data.id
      this.shows = false   
    },
    getPersonOrg (org, person, obj) {
      this.orgIds = []
      this.personIds = []
      this.keyObj.copy = ''
      org.forEach(item => {
        this.orgIds.push(item.id)
        this.keyObj.copy = this.keyObj.copy ? `${this.keyObj.copy},` + item.managementName : item.managementName
      })
      person.forEach(item => {
        this.personIds.push(item.id)
        this.keyObj.copy = this.keyObj.copy ? `${this.keyObj.copy},` + item.name : item.name
      })
      this.defaultCopyObj = obj
      this.showsCopy = false   
    }
  }
}
</script>

<style lang="scss" scoped>
.addFrom .fromMustRow {
  border: 0
}
.van-cell {
  padding: 1px 20px;
}
.boxvertical {
  display: flex;
}
.left {
  width: 60%;
  margin-left: 10px;
}
.right {
  right: 40%;
}
.van-step__icon--active, .van-step__title--active {
  color: #666666;
}
.fromMustRow_boxs {
  display: flex;
}
.fromMustRow_boxs .van-cell {
  width: 130px;
}
.boxvertical {
  min-height: 48px;
  width: 80%;
  margin: auto;
  position: relative;
}
.leftImg {
  width: 20px;
  height: 20px;
  position: absolute;
  left: -20px;
  top: 8px;
}
.leftLine {
    position: absolute;
    left: -12px;
    top: 30px;
}
.addFrom {
  .van-radio-group--horizontal{
    margin-left: auto;
    margin-right: 20px;
  }
  .fromMustRow {
    position: relative;
    border-bottom: 0.5px solid rgb(248, 246, 246);
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
    background:rgba(225, 225, 225, 1);
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
    width: 90%;
    margin: auto;
  }
  .ends .van-button {
    width: 100%;
    height: 35px;
    margin: 15px 0;
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
    width: 100%;
  }
  .btns {
    margin-left: 10px;
    border-radius: 5px;
    text-align: center;
    line-height: 25px;
    height: 25px;
    border: 1px solid gainsboro;
    color: #666666;
    padding: 0 5px;
    min-width: 40px;
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
  ::v-deep.van-cell__value{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .from-name{
    padding: 5px 0;
  }
}

.approvalOpinion{
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
