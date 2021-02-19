<template>
  <div class="sh-switch van-cell">
    <van-field
      name="switch"
      :label="label"
      :rules="rulesList"
      v-bind="$attrs">
      <template #input>
        <van-switch active-color="#ee0a24" inactive-color="#dcdee0" :value="value" @input="$emit('input',$event)" size="20" />
      </template>
    </van-field>
  </div>
</template>

<script>
export default {
  name: 'ShSwitch',
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
.sh-switch{
  padding: 0;
  ::v-deep.van-switch{
    margin-left: auto;
  }
}
</style>