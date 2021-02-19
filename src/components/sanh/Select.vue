<template>
  <div class="sh-select van-cell">
    <van-field
      readonly
      clickable
      :value="value"
      :label="label"
      placeholder="请选择"
      @click="showPicker = true"
      is-link
      :rules="rulesList"
      v-bind="$attrs"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        item-height="0.8rem"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'ShSelect',
  props: {
    rules: [String, Array],
    label: String,
    value: [String, Array],
    extend: Object
  },
  watch: {
    rules: {
      handler(val) {
        this.rulesList = this.$formRules(val, this.label)
      },
      deep: true,
      immediate: true
    },
    extend: {
      handler(val) {
        let params = JSON.parse(val) 
        if (params.options) {
          this.columns = []
          params.options.forEach(item => {
            this.columns.push(item.value)
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      rulesList: [],
      columns: [],
      showPicker: false
    }
  },
  methods: {
    onConfirm(value) {
      this.$emit('input', value)
      this.showPicker = false;
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