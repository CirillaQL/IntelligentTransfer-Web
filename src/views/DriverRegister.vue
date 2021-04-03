<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">
      <a :href="getBaseUrl()">个人中心 </a>
    </el-menu-item>
    <el-menu-item index="3" disabled>查看个人</el-menu-item>
    <el-menu-item index="4"
      ><a href="/about" target="_blank">注册成为司机</a></el-menu-item
    >
  </el-menu>
  <el-row>
    <el-col :span="12">
      <el-link href="/template.xlsx" download="模板.xlsx">
        <el-button id="downloadTemplate" type="primary">下载附件</el-button>
      </el-link>
    </el-col>
    <el-col :span="12">
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
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "4",
      url: "http://localhost:40000/user/" + this.$route.params.id + "/upload",
      fileList: [],
      userUrl: "http://localhost:40000/user/" + this.$route.params.id,
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
      this.$alert("上传会议文件成功！");
    },
    handleError() {
      console.log("Failed");
      this.$alert("上传会议文件失败！请重试");
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    downloadFile() {},
    getBaseUrl() {
      console.log(this.$route.path);
      var url = "http://localhost:8080/user/" + this.$route.params.id + "/home";
      return url;
    },
  },
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
.el-upload {
  margin-top: 80px;
  justify-content: center;
}
#downloadTemplate {
  margin-top: 80px;
  justify-content: center;
}
#uploadButton {
  margin-left: 20px;
}
</style>