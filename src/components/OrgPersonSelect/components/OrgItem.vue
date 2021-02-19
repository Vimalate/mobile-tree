<template>
  <div>
    <div class="item" @click="onOrg" :class="{'disabled-txt': checked && !isDelete}">
      <van-checkbox v-model="checked" @click.stop.native v-if="checkbox && data.organizationId"></van-checkbox>
      <img class="avatar" src="../img/file.png" alt="">
      {{ data.organizationName || data.managementName }}
      <van-icon class="right-arrow" name="arrow" v-show="!checked && !isDelete" />
      <van-icon  class="right-arrow" @click.native="deleteInfo" name="cross" v-if="isDelete"/>
    </div>
  </div>
</template>

<script>
import { MANAGE_LIST, MANAGE_PERSON_LIST } from '@/apis/base'
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
      list: [],
      shows: false,
      checked: false
    }
  },
  methods: {
    deleteInfo () {
      this.$emit('update:value', false)
    },
    onOrg () {
      if (!this.data.organizationId) {
        this.getManageList()
      } else if(this.data.organizationId && !this.checked) {
        this.getPersonList()
      }
    },
    getManageList() {
      this.$post(
        MANAGE_LIST,
        {organizationId: this.data.id},
        data => {
          this.list = data.data
          this.$emit('getSubList', this.list, this.data)
        },
        error => {
          this.$toast.fail(error.msg)
        }
      )
    },
    getPersonList() {
      this.$post(
        MANAGE_PERSON_LIST,
        {manageId: this.data.id},
        data => {
          this.list = [...data.data.manages, ...data.data.accounts]
          this.$emit('getSubList', this.list, this.data)
        },
        error => {
          this.$toast.fail(error.msg)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  ::v-deep.van-checkbox{
    display: inline-block;
    vertical-align: middle;
    margin-right: 15px;
  }
}
.avatar{
  width: 26px;
  height: 26px;
  margin-right: 10px;
  vertical-align: middle;
  border-radius: 3px;
}
.right-arrow{
  line-height: 26px;
  color: #d0d0d0;
  float: right;
}
.disabled-txt{
  color: #666;
  .avatar{
    opacity: 0.7;
  }
}
</style>