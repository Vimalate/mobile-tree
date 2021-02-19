<template>
  <div class="sh-select van-cell">
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
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        :type="type"
        title="选择时间"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="show = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'ShDateTime',
  props: {
    rules: [String, Array],
    label: String,
    value: [String, Array],
    type: String
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
      show: false,
      currentDate: ''
    }
  },
  methods: {
    onConfirm(value) {
      let time = ''
      if (this.type == 'time') {
        time = value
      } else {
        time = this.$dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      }
      this.$emit('input', time)
      this.show = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.sh-select{
  padding: 0;
  ::v-deep.van-field__control{
    text-align: right;
    color: #969799;
    z-index: 99;
  }
}
</style>