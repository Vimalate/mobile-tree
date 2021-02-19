<template>
  <div class="item" @click="getPerson">
    <van-checkbox v-model="checked" v-if="checkbox">
      <img class="avatar" src="../img/default.png" alt="">
      {{ data.name }}
    </van-checkbox>
    <span v-else>
      <img class="avatar" src="../img/default.png" alt="">
      {{ data.name }}
      <van-icon  class="right-arrow" @click.native="deleteInfo" name="cross" v-if="isDelete"/>
    </span>
  </div>
</template>


<script>
export default {
  props: {
    data: Object,
    checkbox: Boolean,
    value: Boolean,
    isDelete: Boolean
  },
  watch:{
    value: {
      handler (val) {
        this.checked = val
      },
      immediate: true
    },
    checked (val) {
      this.$emit('update:value', val ? this.data : false)
    }
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    getPerson() {
      if (!this.checkbox) {
        this.$emit('getPerson', this.data)
      }
    },
    deleteInfo () {
      this.$emit('update:value', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  ::v-deep.van-checkbox__label{
    margin-left: 15px;
  }
}
.avatar{
  width: 26px;
  height: 26px;
  margin-right: 10px;
  vertical-align: middle;
}
.right-arrow{
  line-height: 26px;
  color: #d0d0d0;
  float: right;
}
</style>