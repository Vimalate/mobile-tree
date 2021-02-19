<template>
  <div>
    <div
      v-for="(item, i) in previewData"
      :key="i"
      class="preview"
      style="width: 100%; height: 100%"
    >
      <div class="test">
        <div class="preview-item" v-html="item"></div>
      </div>
    </div>
    <sh-loading :loading="loading" :text="loadingText"></sh-loading>
  </div>
</template>

<script>
import { REPORT_HTML } from "@/apis/report";
export default {
  props: {
    queryId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      id: "",
      previewData: [],
      loading: false,
      loadingText: "正在加载...",
    };
  },
  watch: {
    queryId: {
      handler(val) {
        this.id = val;
        this.previewLoad();
      },
      immediate: true,
    },
  },
  methods: {
    previewLoad() {
      console.log(this.id, "报告id");
      this.loading = true;
      this.$get(
        REPORT_HTML,
        { id: this.id },
        (data) => {
          console.log(data.html);
          this.previewData = data.html;
          this.loading = false;
        },
        (err) => {
          // if (!err.code || err.code == 200) {
          //   this.$toast.fail("服务器错误");
          // }
          console.log(err);
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style lang="scss" >
.test {
  display: block;
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  zoom: 0.45;
}
</style>