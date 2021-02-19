<template>
  <div id="courseRegistra">
    <div class="heights"></div>
    <ShList :api="listApi" ref="list" >
      <div class="lists_content" @click="registrationFun(scope.item)" slot-scope="scope">
        <div class="radiuces">
          <div class="flexs">
          <!-- 2 显示审核未通过 -->
          <van-cell :title-style="{'width': '200px'}" :border='false' :title="scope.item.title" />
          <div class="btnIng">
            <div v-if="scope.item.status == 0" class="reds listBtns">未读</div>
            <div v-if="scope.item.status == 1" class="gray listBtns">已读</div>
          </div>
        </div>
        <div>
          <div class="btns">
            <div class="borderLink"></div>
            <div class="boxed">
              <div class="lefts">{{ $dayjs(scope.item.createTime).format("YYYY-MM-DD HH:mm")}}</div>
              <div class="defalult listBtn">详情</div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </ShList>
  </div>
</template>

<script>
import { PROCESS_COPY_LIST } from '@/apis/workflow'
export default {
  data () {
    return {
      listApi: PROCESS_COPY_LIST,
      orderType: ['egress', 'business', 'leave','send','vehicle','replenishCard']
    }
  },
  methods: {
    registrationFun (item) {
      this.$router.push({path: '/workflow', query:{id: item.orderId, type: this.orderType[item.orderType - 1]}})
    }
  },
  mounted () {
    let query = this.$route.query
    if (query.token) {
      sessionStorage.setItem('token', query.token)
      this.$store.commit('token', query.token)
    }
    if (query.userId) {
      sessionStorage.setItem('token', {id: query.userId})
      this.$store.commit('token', {id: query.userId})
    } 
    if (!query.token && !this.$store.state.token) {
      this.$toast.fail('获取不到令牌!')
    } else if (!query.userId && !this.$store.state.user) {
      this.getUser()
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
#courseRegistra .header {
  width: 100%;
  position: fixed;
  top: 0px;
  display: flex;
  z-index: 999;
}
#courseRegistra .boxed {
  display: flex;
}
#courseRegistra .lefts {
  width: 78%;
  height: 40px;
  line-height: 40px;
  margin-left: 18px;
  color: #A1A1A1;
  font-size: 14px;
}
#courseRegistra .flexs .van-cell {
  padding: 3px 0.426667rem;
}
#courseRegistra .van-search {
  width: 100%;
}
#courseRegistra .header .img {
  width: 28px;
  height: 28px;
  margin-top: 12px;
}
#courseRegistra .courseRegistra_contents {
  margin-top: 40px;
}
/*内容颜色 */
#courseRegistra .header {
  background: white;
}
#courseRegistra .lists_content {
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
#courseRegistra .lists_content .radiuces .flexs .btnIng {
  margin-right: 10px;
}
#courseRegistra .lists_content .van-cell {
  width: 78%;
  font-size: 16px;
  border-radius: 10px;
}
#courseRegistra .lists_content .type {
  padding-left: 15px;
  line-height: 22px;
  color: #666666;
  font-size: 14px;
}
#courseRegistra .lists_content .left {
  margin-left: 10px;
  margin-right: 10px;
}
#courseRegistra .lists_content .flexs {
  display: flex;
  width: 100%;
}
#courseRegistra .btn_status {
  width: 20%;
  margin-top: 20px;
}
#courseRegistra .borderLink {
  margin-top: 5px;
  border-bottom: 1px solid gainsboro;
}
#courseRegistra .defalults {
  color: #FF9900;
}
#courseRegistra .infos {
  background: rgba(0, 153, 255, 1);
  color: white;
}
#courseRegistra .btns {
  position: relative;
  height: 40px;
}
#courseRegistra .listBtns {
  /* border-radius: 5px; */
  /* padding: 1px 11px; */
  height: 26px;
  line-height: 26px;
  font-size: 14px;
  text-align: center;
}
#courseRegistra .blus {
  width: 67px;
  padding: 0;
  color: #00AEEF;
}
#courseRegistra .greens {
  width: 80px;
  padding: 0;
  color: #00A950;
}
#courseRegistra .grays {
  width: 75px;
  padding: 0;
  color: #797979;
}
#courseRegistra .reds {
  width: 76px;
  padding: 0;
  color: #F26649;
}
#courseRegistra .gray {
  width: 76px;
  padding: 0;
  color: gray;
}

#courseRegistra .listBtn {
  color: #00AEEF;
  border-radius: 5px;
  padding: 2px 14px;
  line-height: 27px;
  font-size: 14px;
  text-align: center;
  position: absolute;
  top: 8px;
  right: 20px;
}
.plus{
  position: fixed;
  width: 40px;
  height: 40px;
  line-height: 36px;
  border-radius: 50%;
  bottom: 20px;
  right: 20px;
  z-index: 99;
  color: #ccc;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .2);
  text-align: center;
  font-size: 18px;
  .van-icon{
    vertical-align: middle;
  }
}
</style>
