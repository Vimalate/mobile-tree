<template>
  <van-field name="stepper" label="步进器">
    <template #input>
      <slot></slot>
    </template>
  </van-field>
</template>

<script>
export default {
  name: 'ShField',
  props: {
    rules: [String, Array],
    label: String
  },
  watch: {
    rules: {
      handler(val) {
        let arr = []
        if (val) {
          if (typeof val == 'string') {
            arr = [val]
          } else {
            arr = [...val]
          }
          arr.forEach(item => {
            if (typeof item == 'string') {
              this.rulesList.push({ required: true, message: `请输入${this.label}` })
            } else {
              this.rulesList.push(item)
            }
          })
        } else {
          this.rulesList = []
        }
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