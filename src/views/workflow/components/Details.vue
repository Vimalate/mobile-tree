<template>
  <div class="details">
    <van-collapse v-model="activeNames">
      <van-collapse-item title="流程详情" name="1">
        <ul class="list">
          <li class="item" v-for="item in list" :key="item.id">
            <div class="item-line"></div>
            <van-row>
              <van-col span="2">
                <img class="item-img" :src="require(`../img/icon${item.result == nul ? '' : item.result}.png`)" alt="">
              </van-col>
              <van-col span="5">
                <p class="item-tile">{{ result[item.result] || '审核中' }}</p>
                <p class="item-tile">{{ item.userName }}</p>
              </van-col>
              <van-col span="17" v-if="item.finishTime">
                <p class="item-date">{{ $dayjs(item.finishTime).format('MM-DD HH:mm') }}</p>
                <p class="item-txt">{{ item.approvalOpinion }}</p>
              </van-col>
            </van-row>
          </li>
           <li class="item" v-if="copyList && copyList.length > 0">
            <div class="item-line"></div>
            <van-row>
              <van-col span="2">
                <img class="item-img" :src="require(`../img/icon6.png`)" alt="">
              </van-col>
              <van-col span="22">
                <van-col span="12">
                  <p class="item-tile">{{ '抄送' }}</p>
                </van-col>
                <van-col span="12">
                  <p class="item-date" @click="readActive = !readActive">
                    {{ `已读${readNum}人 ` }}
                    <van-icon :name="readActive ? 'arrow-up': 'arrow-down'" />
                  </p>
                </van-col>
                <van-col span="24">
                  <p class="item-tile">{{ `${ copyList[0].name }等${copyList.length}人` }}</p>
                </van-col>
                <van-col :span="24">
                  <div class="item-txt item-read" ref="read" :style="{height: height ? readActive ? `${height}px` : '0px' : 'auto'}">
                    <span class="item-tag" v-for="item in copyList" :key="item.id">
                      {{ item.name }}
                      <img v-if="item.status" src="../img/icon0.png" class="item-tag-success" />
                    </span>
                  </div>
                </van-col>
              </van-col>
            </van-row>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { PROCESS_TASK_AUDIT } from '@/apis/workflow'
import { mapState } from 'vuex'
export default {
  props: {
    list: Array,
    copyList: Array
  },
  watch: {
    copyList: {
      handler (val) {
        if (val && val.length > 0) {
          this.$nextTick(() => {
            this.height = this.$refs.read.clientHeight
          })
        }
      }
    }
  },
  computed: {
    readNum () {
      let num = 0
      this.copyList.forEach((item) => {
        if (item.status) {
          num ++
        }
      })
      return num
    }
  },
  data () {
    return {
      processList: [],
      activeNames: ['1'],
      readActive: false,
      height: 0,
      result: {
        0: '发起流程',
        1: '转审',
        2: '退回',
        3: '同意',
        4: '拒绝',
        5: '作废'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.details{
  ::v-deep.van-cell__title {
    /* height: 20px; */
    font-weight: 600;
    font-size: 15px;
    color: #666666;
  }
}
.item{
  position: relative;
  margin-bottom: 15px;
  color: #323233;
  line-height: 20px;
  &-line{
    background-color: #d9d9d9;
    position: absolute;
    width: 2px;
    height: calc(100% - 16px);
    left: 8px;
    top: 35px;
    z-index: 9;
  }
  &:last-child .item-line{
    display: none;
  }
  &-img {
    position: relative;
    width: 20px;
    margin-top: 10px;
    z-index: 10;
    background-color: #fff;
  }
  &-txt{
    text-align: right;
    height: auto;
    transition: height .3s ease-in-out;
    overflow: hidden;
  }
  &-date{
    text-align: right;
    // color: #969799;
  }
  &-read{
    padding-left: 30%;
  }
  &-tag{
    min-width: 43px;
    text-align: center;
    margin: 5px 5px 0 0;
    border: 1px solid #969799;
    display: inline-block;
    padding: 0 2px;
    position: relative;
    border-radius: 3px;
    font-size: 12px;
    &-success{
      width: 10px;
      position: absolute;
      color: red;
      border-radius: 50%;
      font-size: 12px;
      right: -5px;
      top: -5px;
      background: #fff;
      border: 1px solid #fff
    }
  }
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

</style>