<template>
  <div class="loading" v-show="loading">
    <div class="loading-box">
      <van-loading size="40px" type="spinner" color="#fff" />
      <p class="loading-text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShLoading',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '正在加载...'
    }
  }
}
</script>

<style lang="scss" scoped>
.loading{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 2000;
  &-box{
    width: 120px;
    height: 120px;
    background: rgba(0,0,0,0.3);
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -60px;
    margin-top: -60px;
    text-align: center;
    box-sizing: border-box;
    padding-top: 25px;
    color: #fff;
  }
  &-text{
    margin-top: 15px;
  }
}
</style>