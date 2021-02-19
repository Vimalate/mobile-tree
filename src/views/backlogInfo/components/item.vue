<template>
  <ul v-if="data.length">
    <li v-for="(item, i) in data" :key="i" @click.stop="selectItem(item)" v-show="expandFlag">
      <div class="item">
        <!-- 展开的图标 -->
        <i class='expandIcon'
         	@click.stop="expandItem(item, i)"
        	:class="[
        		expandArr.includes(i) ? 'reduce' : 'add',
        		item.children && item.children.length ? '' : 'disabled'
        	]">
        </i>
        <!-- 选项名 -->
        <h1>{{item[labelKey]}}</h1>
        <!-- 选择的图标 -->
        <i class='selectIcon'
        	:class="[
        		value[valueKey] == item[valueKey] ? 'checked' : 'noChecked',
        		 item[disabledKey] ? 'disabled' : ''
       		]">
       	</i>
      </div>
      <list-menu
        v-if='item.children'
        @input='input'
        :data='item.children'
        :valueKey='valueKey'
        :labelKey='labelKey'
        :disabledKey='disabledKey'
        :value="value"
        :toastText='toastText'
        :expandFlag='expandArr.includes(i)'
      />
    </li>
  </ul>
</template>
<script>
  export default {
    // 组件名必写
    name: 'ListMenu',
    props: {
      // 选中的值的属性名，必传
      valueKey: String,
      // 在页面要展示的选项属性名，必传
      labelKey: String,
      // 不可选的唯一标识，如item[disabledKey]未true则不可选择，非必传
      disabledKey: String,
      // 选中的值，必传
      value: Object,
      // 控制展开，不需要传
      expandFlag: {
        type: Boolean,
        default: true
      },
      // 总数据，必传
      data: Array,
      // 不可选提示文字，非必传
      toastText: String
    },
    data () {
      return {
        // 当前级组件已展开的项
        expandArr: []
      }
    },
    methods: {
      // 子组件逐级传递选中项
      input (item) {
        this.$emit('input', item)
      },
      // 选择
      selectItem (item) {
        // industryDeptType为1表示时不可选择该工会
        if (this.disabledKey && item[this.disabledKey]) {
          if (this.toastText) {
            alert(this.toastText)
          }
          return
        }
        this.$emit('input', item)
      },
      // 展开
      expandItem (item, i) {
        if (item.children && item.children.length) {
          let index = this.expandArr.indexOf(i)
          if (index > -1) {
            this.expandArr.splice(index, 1)
          } else {
            this.expandArr.push(i)
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  ul{
    width: 100%;
    color: #2a2a2a;
    font-size: 16px;
    overflow: hidden;
    background: #fff;
    border-bottom: .8px solid #e1e1e1;
    li{
      .item{
        padding:8px;
        display: flex;
        align-items: center;
        width: 100%;
        .expandIcon{
          height:20px;
          width:20px;
          border: 1.5px solid;
          border-radius: 50%;
          position:relative;
          &:after{
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 16px;
            transform: translate(-50%, -50%);
          }
          &.add{
            border-color: #2a2a2a;
            &:after{
              color: #2a2a2a;
              content: '＋';
            }
          }
          &.reduce{
            border-color: #ff6633;
            &:after{
              color: #ff6633;
              content: '－';
            }
          }
          &.disabled{
            border-color: #ddd;
            &:after{
              color: #ddd;
            }
          }
        }
        .selectIcon{
          height:12px;
          width:12px;
          border: 1.5px solid;
          border-radius: 50%;
          position:relative;
          &:after{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          &.checked{
            border-color: #ff6633;
            background: #ff6633;;
            &:after{
              font-size: 16px;
              color: #fff;
              content: '✓';
            }
          }
          &.noChecked{
            border-color: #ff6633;
          }
          &.disabled{
            border-color: #ddd;
          }
        }
        h1{
          margin-right: 6/75rem;
          padding: 0 16/75rem;
          position: relative;
          top: 2/75rem;
          height: 60/75rem;
          line-height: 60/75rem;
          font-size:30/75rem;
          flex: 1;
          white-space: nowrap;
          color: #2a2a2a;
          // .one-line;
          overflow-x: auto;
        }
      }
      &:not(:first-child){
        border-top: .8px solid #e1e1e1;
      }
      >ul{
        border-bottom: 0;
        padding-left: 14px;
        li{
          .item{
            padding-left: 5px;
          }
          border-top: .8px solid #e1e1e1;
        }
      }
    }
  }
</style>


