<template>
  <div>
    <van-popup
      position="bottom"
      v-model="shows"
      @closed='closePopup'
      :style="{ width: '100%', height: '100%' }"
    >
      <!-- 搜索 -->
      <van-search
        class="search"
        v-model.trim="searchVal"
        placeholder="请输入搜索关键词"
      />
      <!-- 选择人员 -->
      <div class="select">
        <div class="tree-node">
          <SelectTree
            v-model="selectVal"
            v-if="data.length"
            ref="select"
            :data="data"
            :isRadio="isRadio"
            :selectPersonData="selectPersonData"
          />
           <sh-loading v-else :loading="loading" :text="loadingText"></sh-loading>
        </div>
        <div class="button">
          <van-button color="#ccc" @click="back">取 消</van-button>
          <van-button
            type="info"
            style="margin-left: 25px"
            @click="selectPerson"
            >选 择</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import ListMenu from "./item";
import SelectTree from "./SelectTree";
import { PERSON_LIST } from "@/apis/report";
export default {
  props: {
    show: Boolean,
    list: Array,
    radio: Boolean,
    id: String,
  },
  data() {
    return {
      shows: false,
      searchVal: "",
      selectVal: [],
      // id: "sid-06259076-6724-4701-8CED-9AFF91D665E0",
      customerId: "44a0000019",
      // customerId: this.$route.query.customerId,
      lists: [],
      depData: [],
      data: [],
      selectPersonData: [],
      dataList: [],
      isRadio: false, //是否开启人员多选
      loading: false,
      loadingText: "正在加载...",
    };
  },
  watch: {
    show(val) {
      this.shows = val;
      if (val) {
        this.getPersonList();
        this.searchVal = "";
        this.selectVal = [];
        this.selectPersonData = [];
      }
    },
    radio: {
      handler(val) {
        this.isRadio = val;
      },
      immediate: true,
    },
    shows(val) {
      this.$emit("update:show", val);
    },
    searchVal(val) {
      if (val) {
        this.onSearch();
      } else {
        this.getPersonList();
      }
    },
  },
  computed: {
    data() {
      return this.$store.state.personList; //用computed接收
    },
  },
  components: {
    ListMenu,
    SelectTree,
  },
  methods: {
    selectPerson() {
      console.log(this.selectVal, "这次还不行？");
      this.$emit("choosePerson", this.selectVal);
      this.$refs.select.expandArr = [];
      this.shows = false;
    },
    back() {
      this.$refs.select.expandArr = [];
      this.shows = false;
    },
    onSearch() {
      let searchData = this.dataList.filter((v) => !v.isParent_ex);
      let queryData = this.fuzzyQuery(searchData, this.searchVal);
      this.$store.commit("SET_PERSONLIST", queryData);
      this.data = this.$store.state.personList;
      console.log(this.data, searchData, "搜索");
    },
    //模糊搜索
    fuzzyQuery(list, keyWord) {
      var reg = new RegExp(keyWord);
      var arr = [];
      for (var i = 0; i < list.length; i++) {
        if (reg.test(list[i].name)) {
          arr.push(list[i]);
        }
      }
      return arr;
    },
    // 获取人员列表
    getPersonList() {
      this.loading=true
      this.$get(
        PERSON_LIST,
        { id: this.id, customerId: this.customerId },
        (data) => {
          this.dataList = data;
          this.depData = this.deepCopy(this.dataList);
          let personData = this.formatTree(this.depData);
          // 利用 vuex 做人员列表状态中转
          this.$store.commit("SET_PERSONLIST", personData);
          this.data = this.$store.state.personList;
          this.loading=false
        },
        (err) => console.log(err)
      );
    },
    translateDataToTree(data, pId = "") {
      let tree = [];
      let temp;
      data.forEach((item, index) => {
        data[index].pId =
          data[index].pId == "Dept_null" ? "Dept_0" : data[index].pId;
        if (data[index].pId == pId) {
          let obj = data[index];
          temp = this.translateDataToTree(data, data[index].id);
          if (temp.length > 0) {
            obj.children = temp;
          }
          tree.push(obj);
        }
      });
      return tree;
    },
    formatTree(arr) {
      // 有可能存在多个最外层的父级节点，先把他们找出来
      function findParents(arr) {
        // arr为原数组
        //通过reduce方法把数组转换成对象，作为一个哈希表（说白了就是个对象）存储他们的id
        const map = arr.reduce((obj, cur) => {
          let id = cur["id"]; // 获取每一项的id
          obj[id] = id;
          return obj;
        }, {});
        // 最后做一次筛选，找出最外层的父级节点数据
        // console.log(map[item.pId],'父级节点?')
        arr = arr.filter((item) => !map[item.pId]);
        return arr;
      }
      let parents = findParents(arr); // 获取最外层父级节点
      // 查找每个parents 对应的子孙节点，此处开始递归
      function findChildren(parents) {
        if (!parents) return;
        parents.forEach((p) => {
          arr.forEach((item) => {
            // 如果原数组arr里面的每一项中的pId恒等于父级的某一个节点的id，则把它推进父级的children数组里面
            if (p.id === item.pId) {
              if (!p.children) {
                p.children = [];
              }
              p.children.push(item);
            }
          });
          // 最后进行一次递归，找儿子们的儿子们
          findChildren(p.children);
        });
      }
      findChildren(parents);
      return parents;
    },
    deepCopy(data) {
      //深拷贝原数据
      if (data == null) return; // 如果为空则返回
      let typeOf = (d) => {
        return Object.prototype.toString.call(d);
      };
      let o = null;
      if (typeOf(data) === "[object Object]") {
        o = {};
        for (let k in data) {
          o[k] = this.deepCopy(data[k]);
        }
      } else if (typeOf(data) === "[object Array]") {
        o = [];
        for (let i = 0; i < data.length; i++) {
          o.push(this.deepCopy(data[i]));
        }
      } else {
        return data;
      }
      return o;
    },
    closePopup(){
      this.data=[]
    }
  },
};
</script>

<style lang="scss" scoped>
.search {
  // margin-top: 40px;
}
.select {
  margin-bottom: 60px;
  article {
    margin: 10px;
    line-height: 1.5;
    font-size: 14px;
    span {
      color: #ff6633;
    }
  }
}
.tree-node {
  font-size: 30px;
  width: 98%;
  margin: 0 auto;
}
.button {
  position: fixed;
  width: 100vw;
  background-color: #fff;
  bottom: 0;
  padding: 3px 25px;
  .van-button--normal {
    padding: 0 55px;
    border-radius: 8px;
    height: 40px;
  }
}
</style>