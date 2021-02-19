<template>
  <div class="reserveForm">
    <ReserveForm :formData="form" :active="active" ref="form" />
    <div class="ends">
      <van-button plain v-if="queryId" type="info" @click="delForm()">删 除</van-button>
      <van-button type="info" @click="validateForm()">提 交</van-button>
    </div>
    <sh-loading :loading="loading" :text="loadingText"></sh-loading>
  </div>
</template>

<script>
import ReserveForm from "./Form";
import {
  MEETING_RESERVE_CREATE,MEETING_RESERVE_UPDATE,MEETING_RESERVE_DELETE,MEETING_RESERVE_DETAILS,} from "@/apis/base";
export default {
  components: {
    ReserveForm,
  },
  props: {
    active: Number,
    queryId: String,
  },
  watch: {
    active(val) {
      if (val == 1) {
        this.$refs.form.resetForm();
      }
    },
    queryId(val) {
      if (val) {
        this.loadInfo();
      }
    },
  },
  data() {
    return {
      createApi: MEETING_RESERVE_CREATE,
      updateApi: MEETING_RESERVE_UPDATE,
      detailsApi: MEETING_RESERVE_DETAILS,
      deleteApi: MEETING_RESERVE_DELETE,
      form: {},
      loading: false,
      loadingText: "正在加载..."
    };
  },
  methods: {
    validateForm() {
      this.form = this.$refs.form.form;
      if (!this.form.conferenceTopic) {
        this.$toast("会议主题不能为空");
        return false;
      }
      if (!this.form.meetingId) {
        this.$toast("会议地点不能为空");
        return false;
      }
      if (!this.form.conferenceDate) {
        this.$toast("会议日期不能为空");
        return false;
      }
      if (!this.form.conferenceStartTime) {
        this.$toast("会议开始时间不能为空");
        return false;
      }
      if (!this.form.conferenceEndTime) {
        this.$toast("会议结束时间不能为空");
        return false;
      }
      if (!this.form.conferenceType) {
        this.$toast("会议类型不能为空");
        return false;
      }
      if (!this.form.conferenceContent) {
        this.$toast("会议内容不能为空");
        return false;
      }
      if (!this.form.participants) {
        this.$toast("参会人不能为空");
        return false;
      }
      this.onSubmit();
    },
    onSubmit() {
      this.loading = true;
      this.loadingText = "正在提交...";
      this.$post(
        this.queryId ? this.updateApi : this.createApi,
        this.form,
        (data) => {
          this.loading = false;
          this.$toast.success(data.msg);
          this.$emit("update:active", 1);
        },
        (error) => {
          this.loading = false;
          this.$toast.fail(error.msg);
        }
      );
    },
    //加载会议室预定信息
    loadInfo() {
      this.loading = true;
      this.loadingText = "正在加载...";
      this.$post(
        this.detailsApi,
        { id: this.queryId },
        (data) => {
          this.form = data.data;
          this.loading = false;
        },
        (error) => {
          this.$toast.fail(error.msg);
          this.loading = false;
        }
      );
    },
    delForm () {
      this.$dialog.confirm({
        title: '提示',
        message: '确认删除数据？',
      }).then(() => {
        this.loading = true
        this.loadingText = '正在删除...'
        this.$post(
          MEETING_RESERVE_DELETE,
          {id: this.queryId},
          data => {
            this.loading = false
            this.$toast.success(data.msg)
            this.$emit('update:active', 1)
          },
          error => {
            this.loading = false
            this.$toast.fail(error.msg)
          }
        )
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.reserveForm {
  margin-bottom: 65px;
  .fromMustRow {
    position: relative;
    border-bottom: 0.5px solid rgb(248, 246, 246);
    padding: 5px 0;
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
    background: #f2f2f2;
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
  }
  .btns {
    margin-left: 10px;
    width: 50px;
    border-radius: 5px;
    text-align: center;
    line-height: 25px;
    height: 25px;
    border: 1px solid gainsboro;
    color: #666666;
  }
  .selectBth {
    border: 1px solid rgba(66, 146, 228, 1);
    background: rgba(66, 146, 228, 1);
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
}
</style>
