<template>
  <van-field
    class="sh-input"
    :class="{'sh-required': rulesList.length}"
    :value="value"
    @input="$emit('input',$event)"
    :label="label"
    placeholder="请输入"
    :rules="rulesList"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  name: 'ShInput',
  props: {
    rules: [String, Array],
    label: String,
    value: [String, Array]
  },
  watch: {
    rules: {
      handler(val) {
        this.rulesList = this.$formRules(val, this.label)
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      rulesList: []
    }
  }
}
</script>

<style lang="scss" scoped>
.sh-input{
  ::v-deep.van-field__control{
    text-align: right;
    color: #969799;
    z-index: 99;
  }
}
</style>