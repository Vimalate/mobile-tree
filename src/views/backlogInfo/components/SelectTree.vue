<template>
  <div>
    <ul class="tree-ul">
      <li
        class="tree-li"
        v-show="expandFlag"
        v-for="(item, i) in data"
        :key="i"
      >
        <div
          class="expand"
          @click.stop="expandItem(item, i)"
          v-if="item.children && item.children.length"
        >
          <span><img class="avatar" src="../img/file.png" alt="" /></span>
          <span>{{ item.name }}</span>
          <span class="tree-expand">
            <!--展开箭头组件-->
            <van-icon :name="expandArr.includes(i) ? 'arrow-down' : 'arrow'" />
          </span>
        </div>

        <div class="checked" v-else @click.stop="selectPerson(item)">
          <div>
            <img class="avatar" src="../img/default.png" alt="" />
            <span>{{ item.name }}</span>
          </div>
          <van-checkbox class="checkbox" :value="item.checked"></van-checkbox>
        </div>
        <div v-if="item.children && item.children.length">
          <List
            @input="input"
            :value="value"
            :expandFlag="expandArr.includes(i)"
            :data="item.children"
            :isRadio="isRadio"
          ></List>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
// 已选择人员数据--- 经测试递归组件如将 selectData 放于data 中 ，跨树状层级选择时将不能实时响应
var selectData = [];
export default {
  name: "List",
  props: {
    // 是否单选
    isRadio: {
      type: Boolean,
      default: true,
    },
    data: Array,
    isRadio: Boolean,
    value: Object,
    selectPersonData: Array,
    // 控制展开，不需要传
    expandFlag: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      checked: false,
      expandArr: [],
    };
  },
  created() {
    console.log(this.isRadio, "是否单选？");
  },
  watch: {
    data(val) {
      console.log(val, "传递选择人员数据");
    },

    selectPersonData(val) {
      selectData = val;
    },
    // value: {
    //   handler(val) {
    //     this.checked = val;
    //   },
    //   immediate: true,
    // },
    // checked(val) {
    //   this.$emit("update:value", val ? this.data : false);
    // },
  },
  methods: {
    input(item) {
      this.$emit("input", item);
    },
    // 选择人员
    selectPerson(item) {
      // 如果是单选
      if (this.isRadio) {
        // this.$emit('getData',this.data)
        this.transChecked(this.$store.state.personList);
        item.checked = true;
        // console.log(temp, "查找对应节点");
        if (item.checked) {
          selectData = [];
          selectData.push(item);
          console.log(selectData, "单选人员");
        } else {
          selectData = [];
        }
      } else {
        //多选
        item.checked = !item.checked;
        if (item.checked) {
          selectData.push(item);
          console.log(selectData, "已选择人员");
        } else {
          selectData = selectData.filter((v) => v.id != item.id);
          console.log(selectData, "已选择人员");
        }
      }
      this.$emit("input", selectData);
    },
    // 单选时改变状态
    transChecked(data) {
      data.forEach((item) => {
        item.checked = false;
        item.children && this.transChecked(item.children); // 如果有children，递归调用
      });
    },
    // 查找对应节点
    breadthQuery(tree, id) {
      var stark = [];
      stark = stark.concat(tree);
      while (stark.length) {
        var temp = stark.shift();
        if (temp.children) {
          stark = stark.concat(temp.children);
        }
        if (temp.id === id) {
          return temp;
        }
      }
    },
    // 展开
    expandItem(item, i) {
      if (item.children && item.children.length) {
        let index = this.expandArr.indexOf(i);
        if (index > -1) {
          this.expandArr.splice(index, 1);
        } else {
          this.expandArr.push(i);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  ::v-deep.van-checkbox__label {
    margin-left: 15px;
  }
}
.avatar {
  width: 26px;
  height: 26px;
  margin-right: 10px;
  vertical-align: middle;
}
.right-arrow {
  line-height: 26px;
  color: #d0d0d0;
  float: right;
}

.tree-ul,
.tree-li {
  font-size: 20px;
  list-style: none;
  margin-left: 10px;
  position: relative;
  height: auto;
}
.tree-ul {
  margin: 0 auto;
  box-sizing: border-box;
}
.tree-li {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  margin: 0px 3px;
  padding-right: 3px;
  padding-left: 10px;
}
.tree-expand {
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  right: 30px;
  margin: auto;
}

.tree-loading {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  margin: auto;
}
.expand {
  display: flex;
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
}
.checked {
  display: flex;
  justify-content: space-between;
  //   margin-left: 30px;
  margin-right: 25px;
  height: 44px;
  line-height: 44px;
  box-sizing: border-box;
  //   // padding: 0 15px ;
  border-bottom: 1px solid #f5f5f5;
}
// .button {
//   position: fixed;
//   bottom: 3px;
//   padding: 0 25px;
//   .van-button--normal {
//     padding: 0 55px;
//     border-radius: 8px;
//     height: 40px;
//   }
// }
</style>