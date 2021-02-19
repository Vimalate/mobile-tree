<template>
  <div class="backlog">
    <van-nav-bar
      title="待办事项"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="backlog-card">
      <div class="message-card">
        <p class="title">报告审核</p>
        <div>
          <span class="name">检测项目</span
          ><span class="value">混凝土抗压</span>
        </div>
        <van-cell title="路由跳转" is-link to="index" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    onClickLeft() {
      console.log("fanhui");
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.backlog-card {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  .message-card {
    width: 200px;
    .title {
      font-size: 16px;
    }
    .name {
      color: #323233;
    }
    .value {
      margin-left: 15px;
    }
  }
}
</style>