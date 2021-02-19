<template>
  <div class="sh-form">
    <van-form ref="form">
      <slot></slot>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'ShForm',
  methods: {
    validate (callback) {
      this.$refs.form.validate().then(res => {
        callback(res)
      }).catch(err => {
        if (err.length) {
          this.$toast.fail(err[0].message)
        }
      })
    }
  }
}
</script>