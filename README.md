# vue前端框架



## 1、基本命令

### 1.1 安装依赖

```
npm install
```

### 1.2 启动项目
```
npm run serve
```

### 1.3 编译打包
```
npm run build
```



## 2、目录结构

```
├── dist                        // 打包后文件
├── node_modules                // 依赖包
├── public                      // html模板和静态文件
├── src                         // 源代码（模块应与apis里的js一一对应）
│   ├── apis                    // 后端接口
│   ├── assets                  // 静态资源
│   ├── components              // 全局公用组件
│   ├── layout             	    // 布局
│   ├── router                  // 路由
│   ├── store                   // 全局状态管理
│   ├── styles                  // 全局样式
│   ├── utils                   // 全局公用方法
│   ├── views                   // 前端页面代码
│   │   ├── admin               // 系统管理模块（温馨提示：admin、base、orgCenter、wait）
│   │   │   ├── menu            // 菜单管理页面
│   │   │   │   ├── components  // 页面组件
│   │   │   │   ├── Index.vue   // 页面入口
│   ├── App.vue                 // 入口页面
│   ├── main.js                 // 入口 加载组件 初始化等
│   └── permission.js           // 权限管理
├── vue.config.js               // 代理后台地址及项目配置文件
└── package.json                // package.json
```



## 3、代码规范

项目中未开启eslink代码校验，但希望尽量以eslink规则来约束自己，写出高质量代码。



## 4、自动注册路由

前端以模块来划分，路由通过自动化组成，所有必须符合以下规则：

二级路由：模块名+页面名+Index.vue 						例如：/admin/menu/Index.vue   对应路由为：/admin/menu

三级路由：模块名+子模块名+页面名+Index.vue  	 例如：/project/company/user/Index.vue   对应路由为：/project/company/user
（注：在三级路由中必须存在：模块名+子模块名+Index.vue，且这个Index必须包含<router-view/>标签）

四级路由......以此类推

其它路由，如有不符合规则的特殊路由，如login，404等请自行注册。



## 5、后端接口

后端代理地址在vue.config.js中配置。

接口统一注册在apis文件夹的js文件中，每一个模块必须对应着一个js文件。

以全大写模块页面加下划线连接方式命名，如：MENU_CREATE

CREATE：新增
UPDATE：修改
DELETE：删除
DETAIL：详情
LIST：	列表



## 6、公用方法封装

### 6.1 axios 接口请求

```
/**
 * get请求方法
 * @param {String} url 接口
 * @param {Object} param  请求参数
 * @param {function} data 成功回调
 * @param {function} failure 失败回调
 * @param {Object} config 配置
 */
this.$get( url, param, data => {}, error => {})
```

```
/**
 * post请求方法
 * @param {String} url 接口
 * @param {Object} param  请求参数
 * @param {function} data 成功回调
 * @param {function} failure 失败回调
 * @param {Object} config 配置
 */
this.$get( url, param, data => {}, error => {})
```

### 6.2 isCode 按钮权限

```
/**
 * 判断资源code是否存在
 * @param code 资源code
 */
this.$isCode(code)
```



### 6.3 deleteInfo 删除信息

```
/**
 * 删除信息
 * @param {String} api 接口
 * @param {Object} param 接口入参
 * @param {function} callback 成功回调
 */
this.$deleteInfo(api, param, title, callback)
```

### 6.4 parseObj 解构对象给另一个对象

```
/**
 * 解构对象给另一个对象
 * @param {Oject} obj 赋值对象
 * @param {Oject} data 解构对象
 * @param {Array} arr 解构参数
 */
 this.$parseObj(obj, data, arr)
```

### 6.5 getRegionName 查询省市区名称

```
/**
 * 通过code查询省市区名称
 * @param {String} provinceCode 省code
 * @param {String} cityCode 市code
 * @param {String} areaCode 市code
 */
this.$getRegionName(provinceCode, cityCode, areaCode)
```

### 6.6 downloadFile 下载文件

```
/**
 * 下载文件
 * @param {String} api 接口
 * @param {Object} params 请求参数
 * @param {String} fileName 文件名
 */
this.$downloadFile(api, params, fileName) 
```

### 6.7 dayjs 日期格式化

```
//引入日志格式化插件
import dayjs from 'dayjs'
/**
 * 日期格式化
 * @param {String} 要格式化的日期
 * @param {String} 格式化
 */
dayjs(param).format('YYYY-MM-DD HH:mm:ss')
```



## 7、公用组件

sanh-ui是基于element-ui进行的二次封装，所有的封装都会把el改为sh。所以项目中尽量使用sh标签进行开发。

### 7.1 sh-search 表格检索

```
/**
 * 搜索框超出两行后会显示展开折叠按钮
 * :resetBtn 是否显示重置按钮
 * :span 所占的宽度（24为100%，8则为三分之一即三列）
 * slot="btn" 右侧的按钮组
 * :btnSpan 按钮组所占的宽度
 * :btnGutter 按钮组与输入框的间隔
 */
<sh-search ref="search" :model="form" :resetBtn="true">
  <sh-form-item label="权限组编号" :span="8" prop="permissionGroup">
    <sh-input v-model="form.permissionGroup"></sh-input>
  </sh-form-item>
  <sh-form-item label="接口" :span="8" prop="permissionApi">
    <sh-input v-model="form.permissionApi"></sh-input>
  </sh-form-item>
  <template slot="btn">
    <sh-button type="primary" @click="loadList">查询</sh-button>
    <sh-button type="success" @click="onCreate" v-if="$isCode ('admin-api-add')">新增</sh-button>
  </template>
</sh-search>
```

### 7.2 sh-table 表格

```

/**
 * 对分页及table数据请求进行封装
 * :api 接口
 * :param 检索参数Object
 * :data table数据
 * :layout 分页layout
 * :pageSizes 分页pageSizes
 * :page 当前页
 * :limit 每页条数 
 * :count 总条数
 * :showPage 是否显示分页
 */
<sh-table ref="table" class="space-top" :api="tableApi" :param="form">
  <sh-table-column type="index" label="序号" width="50"> </sh-table-column>
  <sh-table-column prop="permissionGroup" label="权限组编号" min-width="80"> </sh-table-column>
  <sh-table-column prop="permissionApi" label="接口" min-width="80" :show-overflow-tooltip="true"> </sh-table-column>
  <sh-table-column prop="description" label="说明" min-width="80"> </sh-table-column>
  <sh-table-column prop="state" label="状态" min-width="80">
    <template slot-scope="scope">
      <el-switch v-model="scope.row.state" @change="changeState(scope.row)" :active-value="1" :inactive-value="2">
      </el-switch>
    </template>
  </sh-table-column>
  <sh-table-column label="操作" min-width="80">
    <template slot-scope="scope">
      <el-button @click="onUpdate(scope.row)" type="text">编辑</el-button>
      <!-- <el-button @click="onUpdate(scope.row)" type="text" v-if="$isCode ('admin-api-edit')">编辑</el-button>
      <el-button type="text" @click="onDelete(scope.row)" v-if="$isCode ('admin-api-delete')">删除</el-button> -->
    </template>
  </sh-table-column>
</sh-table>
```

### 7.3 sh-form 表单

```
/**
 * :span 所占的宽度（24为100%，8则为三分之一即三列）
 * rules 检验规则
 * :labelWidth label的宽度
 * :gutter 间隔
 */
<sh-form :model="form" ref="form" >
  <sh-form-item label="姓名"  prop="personName" rules="required">
    <sh-input v-model="form.personName" placeholder="请输入权限组编号"></sh-input>
  </sh-form-item>
  <sh-form-item label="性别"  prop="sex" rules="required">
    <el-radio-group v-model="form.sex">
      <el-radio :label="1">男</el-radio>
      <el-radio :label="0">女</el-radio>
    </el-radio-group>
  </sh-form-item>
  <sh-form-item label="证件类型"  prop="idcardType" rules="required">
    <sh-input v-model="form.idcardType" placeholder="请输入说明"></sh-input>
  </sh-form-item>
  <sh-form-item label="证件号码"  prop="idcardType" rules="required">
    <sh-input v-model="form.idcard" placeholder="请输入说明"></sh-input>
  </sh-form-item>
  <sh-form-item label="出生日期" prop="birthday" rules="required">
    <sh-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></sh-date-picker>
  </sh-form-item>
  <sh-form-item label="手机号"  prop="mobilephone" rules="required||phone">
    <sh-input v-model="form.mobilephone" placeholder="请输入说明"></sh-input>
  </sh-form-item>
</sh-form>
```

rules检验规则：

```
required: 必填项
number: 数字
integer: 整数
email: 邮箱
date: 日期
phone: 手机号
special: 特殊字符
account: 必须包含数字、字母、下划线中的两种或以上
password: 必须包含字母和数字,且在6~18位之间
identity: 身份证号
url: url
api: 通过接口校验
```

当一个检验时：rules=“required”，

当多个时可以用||隔开：rules=“required||number||integer”

当自定义校验或通过接口校验时需要用数组：

```
/**
 * type 类型
 * message 提示信息
 * api 接口
 * param 检索参数（输入框对应的键值）
 * search 其它检索参数Object
 */
:rules="['required',{type: 'number', message: '必须为数字'}, {type: 'api', api: apiIsUnifiedcode, param: 'unifiedcode'}]"
```

### 7.4 sh-dialog 弹框

```
/**
 * :visible.sync 是否打开弹框
 */
<sh-dialog
  title="标题"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>弹框内容</span>
  <span slot="footer" class="dialog-footer">
    <sh-button @click="dialogVisible = false">取 消</sh-button>
    <sh-button type="primary" @click="dialogVisible = false">确 定</sh-button>
  </span>
</sh-dialog>
```

### 7.4 sh-dialog-tree 弹框树

```
/**
 * api 接口
 * title 标题
 * dialogTreeVisible 是否显示
 * param 检索参数
 * @handleEvent 事件
 * :height 高度
 * :defaultProps 自定义节点标识
 * :radio 为true时单选
 */
<sh-dialog-tree
    :api="api"
    :title="title
    :dialogVisible.sync="dialogTreeVisible"
    @handleEvent="handleEvent"
></sh-dialog-tree>
```

### 7.5 sh-region-cascader 省市区下拉框

```
/**
 * :provinceCode 省code
 * :cityCode 市code
 * :areaCode 区code
 * v-model 数据数组
 */
<sh-region-cascader :provinceCode.sync="provinceCode" :cityCode.sync="cityCode" :areaCode.sync="areaCode">
</sh-region-cascader>
```

### 7.6 sh-select-search  检索下拉框

```
/**
 * v-model 字段
 * :api 接口
 * :param 检索Object
 * :defaultProps="{label: 'typeName', value: 'id'}"  label显示的字段，value赋值的字段
 */
<sh-select-search v-model="form.unitType" :api="selectApi" :search="{type:2}"
          :defaultProps="{label: 'typeName', value: 'id'}"></sh-select-search>
```

### 7.6 sh-upload  上传文件

```
/**
 * :api 接口
 * :param 检索Object
 * :accept 文件类型['jpg', 'png', 'txt', 'zip', 'rar', 'pdf', 'doc', 'docx', 'xlsx']
 * :param 检索Object
 * @callBack 上传后回调function
 */
<sh-upload ref="upload" api="/update" :param="{type: 123}"></sh-upload>

// 打开上传弹框
this.$refs.upload.uploadFile()
```


## 国检 h5 启动说明
1. 首先存在跨域
   先于 utils/ajax.js 文件下找到  axios.defaults.baseURL='xxxxxx' ,将其注销，然后最外层找到 vue.config 配置文件找到
   ```js
   '': {
        // target: 'http://m.jxcloud.3hmis.com',        //正式
        target: 'http://14.116.210.102:9009',        //测试
        // target: 'http://192.169.0.220:8090/zyy',        //测试
        changeOrigin: true                      // 是否跨域
      }
  ```
  注释代码块将其放出，前端代理就开启了
2. 请求参数
    由于请求参数都是暂时前端写死的，国检项目代码都放于 views/backlogInfo 文件夹下。
    找到 info 文件，将 data 下定义的 customerId，instanceId，endUserId，taskId 写死的参数打开，this.$route.query.xxx 的注释掉。再找到 getReport() 函数 找到 ```this.reportId = data.data.reportId``` 将其注释，将 this.reportId='xxx' 写死的参数打开。
    再找到 selectPerson 文件，在 data 下将 customerId 写死的参数打开，从路由获取的 this.$route.query.customerId 注释
3. 启动
    最后，重新 npm run serve 就可以了


