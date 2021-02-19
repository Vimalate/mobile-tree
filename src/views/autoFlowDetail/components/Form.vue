<template>
  <div class="sh-form">
    <sh-form ref="form" v-if="flowInfo && flowInfo.formDetails">
      <!-- <sh-input
        v-model="form.username"
        label="输入框"
        rules="required"
      ></sh-input>
      <sh-input
        v-model="form.username2"
        label="数字输入框"
        rules="required"
        type="number"
      ></sh-input>
      <sh-textarea
        v-model="form.username3"
        type="textarea"
        rows="2"
        label="文本框"
        rules="required"
      ></sh-textarea>
      <sh-select
        v-model="form.username4"
        label="下拉框"
        rules="required"
        :option="[{value: '选项1'}, {value: '选项2'}]"
      ></sh-select>
      <sh-date
        v-model="form.username5"
        label="日期"
        rules="required"
      ></sh-date>
      <sh-date-time
        v-model="form.username6"
        label="时间"
        type="time"
        rules="required"
      ></sh-date-time>--> 
      <component 
        :is="componentId[item.type]" 
        v-for="item in flowInfo.formDetails"
        v-model="form[item.value1]"
        :value2.sync="form[item.value2]" 
        :key="item.id"
        :rules="item.required ? 'required' : ''"
        :label="item.label"
        :type="item.type"
        :extend="item.extend"
        :class="{'last-item': index == flowInfo.formDetails.length}">
      </component>
      <div>
        <div class="heights"></div>
        <van-cell v-if="flowInfo && flowInfo.node" title="处理人" :value="flowInfo.node.approName" />
      </div>
    </sh-form>
  </div>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    active: Number,
    flowInfo: Object,
    formData: Object
  },
  watch: {
    flowInfo: {
      handler (val) {
        if (val.dataDetails) (
          this.form = {...val.dataDetails}
        )
          console.log(val)
      },
      deep: true
    }
  },
  data () {
    return {
      componentId: {
        input: 'ShInput',
        number: 'ShInput',
        select: 'ShSelect'
      },
      form: {}
    }
  },
  methods: {
    resetForm () {
      this.form = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.heights {
  width: 100%;
  height: 10px;
  background:#f2f2f2;
}

.last-item::after{
  border: none
}
</style>