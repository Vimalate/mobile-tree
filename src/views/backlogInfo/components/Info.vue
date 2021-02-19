<template>
  <div class="report-info-container">
    <div class="report-info">
      <div class="title">
        <span class="title-Badge"></span
        ><span class="title-info">报告信息</span>
      </div>
      <div class="item">
        <span class="item-name">检测项目</span
        ><span class="item-value">{{ reportList.itemName }}</span>
      </div>
      <div class="item">
        <span class="item-name">工程名称</span>
        <span class="item-value">{{ reportList.projectName }}</span>
      </div>
      <div class="item">
        <span class="item-name">报告编号</span
        ><span class="item-value">{{ reportList.reportCode }}</span>
      </div>
      <div class="item">
        <span class="item-name">检测结果</span>
        <span class="item-value" v-if="reportList.noteIp === '合格'"
          ><van-tag color="#00CC00" size="large" plain>{{
            reportList.noteIp
          }}</van-tag></span
        >
        <span class="item-value" v-if="reportList.noteIp === '其他'"
          ><van-tag type="primary" size="large" plain>{{
            reportList.noteIp
          }}</van-tag></span
        >
        <span class="item-value" v-else
          ><van-tag type="primary" size="large" plain>{{
            reportList.noteIp
          }}</van-tag></span
        >
      </div>
      <div class="item">
        <span class="item-name">检验类别</span
        ><span class="item-value">{{ reportList.sg }}</span>
      </div>
      <div class="item">
        <span class="item-name">送检日期</span
        ><span class="item-value">{{
          reportList.sjDate
            ? $dayjs(reportList.sjDate).format("YYYY-MM-DD HH:mm")
            : ""
        }}</span>
      </div>
      <div class="item">
        <span class="item-name">报告编号</span
        ><span class="item-value">{{ reportList.reportCode }}</span>
      </div>
      <div class="item">
        <span class="item-name">委托编号</span
        ><span class="item-value">{{ reportList.entrustCode }}</span>
      </div>
      <div class="item">
        <span class="item-name">委托单位</span
        ><span class="item-value">{{ reportList.entrustUnit }}</span>
      </div>
      <div class="item">
        <span class="item-name">检测报告</span>
        <span class="item-value" @click="readReport"
          ><van-tag color="#69CFFB" size="large"
            >点击查看电子报告</van-tag
          ></span
        >
      </div>
    </div>
    <!-- 样品信息 -->
    <div
      class="report-info sample"
      v-for="(item, index) in sampleList"
      :key="index"
    >
      <div class="title">
        <span class="title-Badge"></span
        ><span class="title-info">样品信息</span>
      </div>
      <div class="item-container">
        <div class="item">
          <span class="item-name">样品编号</span
          ><span class="item-value">{{ item.sampleCode }}</span>
        </div>
        <div class="item">
          <span class="item-name">结论状态</span
          ><span class="item-value">{{ item.noteIp }}</span>
        </div>
        <div class="item">
          <span class="item-name">检测人</span
          ><span class="item-value">{{ item.testPerson }}</span>
        </div>
        <div class="item">
          <span class="item-name">检测时间</span
          ><span class="item-value">{{
            item.testDate
              ? $dayjs(item.testDate).format("YYYY-MM-DD HH:mm")
              : ""
          }}</span>
        </div>
      </div>
    </div>
    <!-- 附件清单 -->
    <div class="report-info">
      <div class="title">
        <span class="title-Badge"></span
        ><span class="title-info">附件清单</span>
      </div>
      <div v-if="reportList.fileList && reportList.fileList.length">
        <div
          class="item"
          v-for="(file, index) in reportList.fileList"
          :key="index"
        >
          <span class="file" @click="download(file, file.fileName)">{{
            file.fileName
          }}</span>
        </div>
      </div>
      <div v-else class="item">
        <span class="item-name" style="margin-left: 20px">暂无附件</span>
      </div>
    </div>
    <!-- 处理记录 -->
    <div class="report-info sample">
      <div class="title">
        <div class="record-title">
          <span class="title-Badge"></span>
          <span class="title-info">处理记录</span>
        </div>
        <!-- <div class="report-adjunct">
          <span>审批次数：</span>
          <span>0</span>
          <span class="overtime">超时次数：</span>
          <span>0</span>
        </div> -->
      </div>
      <div class="item-container" v-if="processInfo.length">
        <div class="item">
          <span class="item-name">流程节点</span
          ><span class="item-value">{{ processInfo.taskName }}</span>
        </div>
        <div class="item">
          <span class="item-name">执行人</span
          ><span class="item-value">{{ processInfo.userName }}</span>
        </div>
        <div class="item">
          <span class="item-name">开始时间</span
          ><span class="item-value">{{ processInfo.createTime }}</span>
        </div>
        <div class="item">
          <span class="item-name">完成时间</span
          ><span class="item-value">{{ processInfo.finishTime }}</span>
        </div>
        <div class="item">
          <span class="item-name">处理结果</span
          ><span class="item-value">{{ processInfo.result }}</span>
        </div>
        <div class="item">
          <span class="item-name">处理意见</span
          ><span class="item-value">{{ processInfo.opinion }}</span>
        </div>
      </div>
      <div class="item-container" v-else>
        <div class="item">
          <span class="item-name" style="margin-left: 20px">暂无记录</span
          ><span class="item-value"></span>
        </div>
      </div>
    </div>
    <!-- 流程处理 -->
    <div class="report-info" style="margin-bottom: 55px">
      <div class="title">
        <span class="title-Badge"></span
        ><span class="title-info">流程处理</span>
      </div>
      <div class="item result">
        <span class="item-name task">处理结果</span>
      </div>
      <div class="item handle-container">
        <van-tag
          v-for="(item, index) in tasks"
          :key="index"
          :color="handleActive == index ? '#02A7F0' : ''"
          size="large"
          plain
          @click="handle(item, index)"
          >{{ item.lineName }}</van-tag
        >
      </div>
      <div class="item">
        <span class="item-name task">处理意见</span>
      </div>
      <van-field
        v-model="submitData.taskComment"
        rows="2"
        autosize
        :border="false"
        type="textarea"
        placeholder="请输入处理意见"
        show-word-limit
      />
      <div class="item">
        <van-cell
          title-class="select-person"
          @click="select"
          is-link
          title="处理人"
          :value="person || '请选择人员'"
        />
      </div>
    </div>
    <div class="button">
      <van-button color="#ccc" @click="back">返 回</van-button>
      <van-button type="info" style="margin-left: 25px" @click="submit"
        >提 交</van-button
      >
    </div>
    <!-- 选择为人员 -->
    <SelectPerson
      :show.sync="show"
      @choosePerson="choosePerson"
      :radio="radio"
      :id="id"
    />
  </div>
</template>

<script>
import {
  PROCESS_INFO,
  PERSON_LIST,
  FIND_NEXT_TASK,
  REPORT_INFO,
  REPORT_SUBMIT,
  FILE_DOWNLOAD,
} from "@/apis/report";
import SelectPerson from "./selectPerson";
import axios from "axios";
// import
export default {
  props: {
    queryId: String,
  },
  data() {
    return {
      handleActive: -1,
      tasks: [],
      id: "",
      // instanceId: "5320073",
      customerId: "44a0000019",
      instanceId: "5363337",
      endUserId: "8a8a8031713344b8017134d291b1066d",
      taskId: "5317819",
      // taskId: this.$route.query.taskId,
      // instanceId: this.$route.query.instanceId,
      // customerId: this.$route.query.customerId,
      // endUserId: this.$route.query.accountId,
      show: false,
      reportList: {}, //基本列表信息
      sampleList: [], //样品信息
      processInfo: {}, //历史处理
      personList: [],
      person: "",
      radio: false, //是否为单选人员
      assigneeKey: "",
      submitData: {
        operation: "submitTask",
        variable: {},
      }, //提交数据
      reportId: "",
    };
  },
  watch: {
    reportId: {
      handler(val) {
        if (val) {
          console.log(val, "监听到了报告id");
          this.$emit("update:queryId", val);
        }
      },
      immediate: true,
    },
  },
  components: {
    SelectPerson,
  },
  mounted() {
    this.getProcess();
    this.getNextTask();
    this.getReport();
  },
  methods: {
    choosePerson(val) {
      this.person = val.map((v) => v.name).join(",");
      this.submitData.variable[this.assigneeKey] = val
        .map((v) => v.id)
        .join(",");
    },
    handle(item, status) {
      this.handleActive = this.handleActive == status ? -1 : status;
      if (this.handleActive != -1) {
        this.submitData.taskResult = item.lineName;
        let str = item.conditionExpressions;
        this.submitData.variable["dealResult"] = str.match(/==(\S*)}/)[1];
        this.assigneeKey = item.candidateUsersExpressions.match(/{(\S*)}/)[1];
        // 选择处理结果=>人员为多选还是单选
        this.radio = item.isMultiInstance === 0;
        // 选择人员请求主键
        this.id = item.id;
      } else {
        this.submitData.taskResult = "";
        this.submitData.variable["dealResult"] = "";
        this.radio = true;
      }
    },
    // 选择处理人
    select() {
      if (!this.submitData.taskResult) {
        this.$toast("请先选择处理结果！");
        return;
      }
      this.show = true;
    },
    // 获取处理记录
    getProcess() {
      this.$post(
        PROCESS_INFO,
        { instanceId: this.instanceId },
        (data) => {
          console.log(data, "获取处理记录");
          this.processInfo = data.data;
        },
        (error) => console.log(error)
      );
    },
    // 查询报告信息
    getReport() {
      this.$get(
        REPORT_INFO,
        { instanceId: this.instanceId },
        (data) => {
          console.log(data, "查询报告信息");
          this.reportList = data.data;
          this.sampleList = data.data.sampleList;
          //暂时没有有预览报告的id
          this.reportId = "8a8a803176d714090176dc05a056069a";
          // this.reportId = data.data.reportId;
        },
        (err) => console.log(err)
      );
    },
    getNextTask() {
      this.$get(
        FIND_NEXT_TASK,
        { taskId: this.taskId },
        (data) => {
          this.tasks = data;
          console.log(this.tasks, "tasks");
        },
        (error) => console.log(error,'错误？')
      );
    },
    back() {
      this.$router.back();
    },
    readReport() {
      this.$emit("readReport");
    },
    download(file, fileName) {
      console.log(file, "下载附件");
      axios({
        method: "get",
        url: FILE_DOWNLOAD,
        responseType: "blob", //接收返回的类型
        params: { pk: file.pk },
      }).then((res) => {
        let str = res.headers["content-disposition"];
        if (!res || !str) {
          return;
        }
        let suffix = "";
        // 截取文件名和文件类型
        if (str.lastIndexOf(".")) {
          fileName
            ? ""
            : (fileName = str.substring(
                str.indexOf("=") + 1,
                str.lastIndexOf(".")
              ));
          suffix = str.substring(str.lastIndexOf("."), str.length);
        }
        let url = window.URL.createObjectURL(res.data);
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", fileName + suffix);
        document.body.appendChild(link);
        link.click();
      });
    },
    submit() {
      if (this.submitData.variable[this.assigneeKey]) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确认提交数据？",
          })
          .then(() => {
            this.submitReport();
          })
          .catch(() => {
            // console.log('已取消提交！')
            this.$toast("已取消提交！");
          });
      } else {
        this.$toast("处理人不能为空！");
      }
    },
    submitReport() {
      this.submitData.instanceId = this.instanceId;
      this.submitData.endUserId = this.endUserId;
      this.$post(
        REPORT_SUBMIT,
        { ...this.submitData },
        (data) => {
          if (data.code == 200) {
            this.$router.back(-1);
          }
          console.log(data);
        },
        (err) => {
          this.$toast.fail(err.msg);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.report-info {
  padding: 15px 25px 3px 25px;
  .title {
    border-bottom: 1px solid #f5f5f5f5;
    padding: 5px 0;
    display: flex;
    align-items: center;
    .title-Badge {
      width: 8px;
      height: 8px;
      background-color: #02a7f0;
      border-radius: 4px;
    }
    .title-info {
      margin-left: 12px;
    }
  }
  .item {
    padding: 5px 0;
    display: flex;
    line-height: 26px;
    .item-name {
      color: #999999;
      width: 150px;
      height: 100%;
    }
    .task {
      color: #646566;
    }

    .item-value {
      width: 100%;
      height: 100%;
      margin-left: 10px;
    }
  }
  .result {
    margin-top: 5px;
  }
}
.sample {
  padding: 0;
  .title {
    width: 325px;
    margin-left: 25px;
  }
  .item-container {
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 8px;
    background-color: #f5f5f5f5;
    padding: 5px 10px;
  }
}
.record-title {
  padding: 5px 0;
  display: flex;
  align-items: center;
  .title-Badge {
    width: 8px;
    height: 8px;
    background-color: #02a7f0;
    border-radius: 4px;
  }
  .title-info {
    margin-left: 12px;
  }
}
.report-adjunct {
  color: #02a7f0;
  margin-left: 50px;
  .overtime {
    margin-left: 10px;
  }
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

.handle-container {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 8px;
}
.file {
  height: 30px;
  line-height: 30px;
  color: #1989fa;
}
.select-person {
  margin-left: -15px;
}
</style>