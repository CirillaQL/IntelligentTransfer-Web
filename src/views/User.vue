<template>
<div class="user-background">
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#1E90FF"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">
      <el-link :underline="false" :href="jumpToBaseUrl()">个人中心 </el-link>
    </el-menu-item>
    <el-menu-item index="2">
      <el-link :underline="false" :href="jumpToOrders()">查看个人订单</el-link>
    </el-menu-item>
    <el-menu-item index="3">
      <el-link :underline="false" :href="jumpToMeetings()">查看个人会议</el-link>
    </el-menu-item>
    <el-menu-item index="4">
      <el-link :underline="false" :href="jumpToRegisterDriver()">司机页面</el-link>
    </el-menu-item>
  </el-menu>
  <el-row>
    <el-col :span="24">
          <div class="carouselShow">
          <el-carousel type="card" height="450px" >
          <el-carousel-item>
            <img src="../assets/carousel-1.jpg" class="carousel_image_type">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/carousel-3.jpg" class="carousel_image_type">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/carousel-4.jpg" class="carousel_image_type">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <el-card class="downloadCard" shadow="always">
        <h2>点击此处下载会议模板</h2>
      <el-link href="/template.xlsx" download="模板.xlsx">
        <el-tooltip
          class="templateDownloadTip"
          effect="dark"
          content="点击此处下载导入会议模板"
          placement="top-start"
        >
          <el-button id="downloadTemplate" type="primary">下载附件</el-button>
        </el-tooltip>
      </el-link>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="downloadCard" shadow="always">
        <h2>点击此处上传文件信息</h2>
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="url"
        :with-credentials="true"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button size="medium" type="primary">选取文件</el-button>
        </template>
        <el-button
          id="uploadButton"
          size="medium"
          type="success"
          @click="submitUpload"
          >上传到服务器</el-button
        >
        <template #tip>
          <div class="el-upload__tip">上传会议的Excel文件</div>
        </template>
      </el-upload>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      activeIndex: "1",
      url: "http://localhost:40000/user/" + this.$route.params.id + "/upload",
      fileList: [],
      userUrl: "http://localhost:40000/user/" + this.$route.params.id,
      helpImg: require("../assets/help.png"),
    };
  },
  methods: {
    handleRemove(file, fileList) {
      for (let index = 0; index < this.fileList.length; index++) {
        const element = this.fileList[index];
        if (file.uid === element.uid) {
          this.fileList.splice(index, 1);
        }
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess() {
      console.log("Success");
      ElMessage("上传会议文件成功！");
    },
    handleError() {
      console.log("Failed");
      ElMessage("上传会议文件失败！请重试");
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    downloadFile() {},
    jumpToBaseUrl() {
      var url = "http://localhost:8080/user/" + this.$route.params.id + "/home";
      return url;
    },
    jumpToOrders() {
      var url = "http://localhost:8080/user/" + this.$route.params.id + "/orders";
      return url;
    },
    jumpToRegisterDriver() {
      var url = "http://localhost:8080/user/" + this.$route.params.id + "/registerDriver";
      return url;
    },
    jumpToMeetings(){
      var url = "http://localhost:8080/user/" + this.$route.params.id + "/meeting";
      return url;
    }
  },
  beforeRouteEnter(to,from,next){
    document.querySelector('body').setAttribute('style','background-color:#fff');
    next();
  }
};
</script>

<style>
html,
body,
#app {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}
.el-container {
  margin: 30px;
}

.helpImg {
background-color: transparent !important;/* 背景透明 */
}

.user-background{
  background: #fff;
}

.el-upload {
  margin-top: 60px;
  justify-content: center;
}

.demonstration{
  margin-top: 50px;
}

#downloadTemplate {
  margin-top: 80px;
  justify-content: center;
}
#uploadButton {
  margin-left: 20px;
}

.el-image {
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 40px;
}

.downloadCard{
  margin-top: 20px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.carousel_image_type{
  width: 70%;
  height: 100%;
}
</style>