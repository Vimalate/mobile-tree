<template>
  <div class="sh-select">
    <van-field
      readonly
      clickable
      name="picker"
      :value="value"
      :label="label"
      placeholder="请选择"
      @click="show = true"
      is-link
      :rules="rulesList"
      v-bind="$attrs"
    />
   <van-calendar v-model="show" @confirm="onConfirm" />
  </div>
</template>

<script>
export default {
  name: 'ShDate',
  props: {
    rules: [String, Array],
    label: String,
    value: [String, Array],
    option: {
      type: Array,
      default: () => {
        return []
      }
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
      rulesList: [],
      show: false
    }
  },
  methods: {
    onConfirm(value) {
      this.$emit('input', this.$dayjs(value).format('YYYY-MM-DD'))
      this.show = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.sh-select{
  ::v-deep.van-field__control{
    text-align: right;
    color: #969799;
    z-index: 99;
  }
}
</style>