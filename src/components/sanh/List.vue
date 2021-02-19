<template>
  <van-pull-refresh v-model="isLoading" @refresh="loadList">
    <van-list
      v-model="loading"
      :immediate-check="false"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-if="list && list.length > 0">
        <div v-for="(item, index) in list" :key="index">
          <slot :item="item"></slot>
        </div>
      </div>
      <van-empty :image="require('./img/empty.png')" description="暂无数据" v-else />
    </van-list>
  </van-pull-refresh>
</template>

<script>
export default {
  name: 'ShList',
  props: {
    api: String,
    param: {
      type: Object,
      default: () => {
        return {}
      }
    },
    page: Number,
    limit: Number
  },
  watch: {
    api: {
      handler (val) {
        if (val) {
          this.loadList()
        }
      },
      immediate: true
    },
    param: {
      handler (val) {
        this.loadList()
      },
      deep: true
    },
    page: {
      handler (val) {
        if (val) {
          this.form.page = val
        }
      },
      immediate: true
    },
    limit: {
      handler (val) {
        if (val) {
          this.form.limit = val
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      list: [],
      form: {
        page: 1,
        limit: 10
      },
      count: 0
    }
  },
  methods: {
    onLoad () {
      // 数据全部加载完成
      if (this.list.length >= this.count) { 
        this.finished = true
      } else {
        this.form.page++
        this.loadList('push')
      }
    },
    loadList (str) {
      if (str !== 'push') {
        this.form.page = 1
        this.finished = false
      }
      this.$post(
        this.api,
        {
          ...this.form,
          ...this.param
        },
        data => {
          if (str === 'push') {
            this.list = [...this.list, ...data.data]
          } else {
            this.list = data.data
          }
          this.loading = false
          this.isLoading = false
          this.count = data.count
        },
        error => {
          this.loading = false
          this.isLoading = false
          this.$toast(error.msg)
        }
      )
    }
  }
}
</script>
