<template>
  <van-field
    class="sh-textarea"
    :class="{'sh-required': rulesList.length}"
    :value="value"
    @input="$emit('input',$event)"
    :label="label"
    :type="type"
    :placeholder="`请输入${label}`"
    :rules="rulesList"
  />
</template>

<script>
export default {
  name: 'ShTextarea',
  props: {
    rules: [String, Array],
    label: String,
    value: [String, Array],
    type: {
      type: String,
      default: 'textarea'
    }
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
.sh-textarea{
  display: block;
  ::v-deep.van-field__control{
    color: #969799;
    z-index: 99;
  }
}
</style>