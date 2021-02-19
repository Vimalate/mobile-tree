<template>
  <van-action-sheet v-model="showTime" class="sh-time">
    <van-picker show-toolbar title="请选择时间" item-height="0.8rem" :defaultIndex="10" :columns="columns" @confirm="confirm" @cancel="showTime = false"/>
  </van-action-sheet>
</template>

<script>
export default {
  name: 'ShSelectTime',
  props: {
    show: Boolean
  },
  watch: {
    show: {
      handler (val) {
        this.showTime = val
      },
      immediate: true
    },
    showTime (val) {
      this.$emit("update:show", val)
    }
  },
  data () {
    return {
      columns: [
        { // 日期
          values: [],
          defaultIndex: 365,
        },
        { // 时间
          values: [],
          defaultIndex: 24,
        },
      ],
      showTime: false
    }
  },
  methods: {
    confirm (val) {
      this.$emit('confirm', `${val[0]} ${val[1]}`, val)
      this.$emit("update:show", false)
    }
  },
  mounted () {
    for (let i = 365; i > 0; i --) {
      this.columns[0].values.push(this.$dayjs().subtract(i, 'day').format("YYYY-MM-DD"))
    }
    for (let i = 0; i < 365; i ++) {
      this.columns[0].values.push(this.$dayjs().add(i, 'day').format("YYYY-MM-DD"))
    }
    for (let i = 0; i < 48; i ++) {
      if (i%2 === 0) {
        this.columns[1].values.push(`${i/2 >= 10 ? '' : 0 }${i/2}:00`)
      } else {
        this.columns[1].values.push(`${i/2 >= 10 ? '' : 0 }${parseInt(i/2)}:30`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sh-time{
  ::v-deep[class*=van-hairline]::after{
    border-color: #ccc;
  }
}
</style>
