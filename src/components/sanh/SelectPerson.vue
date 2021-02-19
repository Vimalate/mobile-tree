<template>
  <div class="sh-select-person van-cell">
    <van-field
      readonly
      clickable
      :value="value"
      name="picker"
      :label="label"
      placeholder="请选择"
      @click="showPerson = true"
      is-link
      :rules="rulesList"
      v-bind="$attrs"
    />
    <OrgPersonSelect :show.sync="showPerson" @getPerson="getPerson" ></OrgPersonSelect>
  </div>
</template>

<script>
import { OrgPersonSelect } from '@/components'
export default {
  name: 'ShSelectPerson',
  components: { OrgPersonSelect },
  props: {
    rules: [String, Array],
    label: String,
    value: [String, Array]
  },
  data () {
    return {
      showPerson: false
    }
  },
  methods: {
    getPerson (data) {
      this.$emit('input', data.name)
      this.$emit('value2', data.id)
      this.showPerson = false
    }
  }
}
</script>

<style lang="scss" scoped>
.sh-select-person{
  padding: 0;
  ::v-deep.van-field__control{
    text-align: right;
  }
}
</style>