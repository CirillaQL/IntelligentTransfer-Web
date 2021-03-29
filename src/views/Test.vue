<template>
  <el-upload
  class="upload-demo"
  ref="upload"
  :action="url" 
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false">
  <template #trigger>
    <el-button size="small" type="primary">选取文件</el-button>
  </template>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <template #tip>
    <div class="el-upload__tip">
      只能上传 jpg/png 文件，且不超过 500kb
    </div>
  </template>
</el-upload>
</template>

<script>
  export default {
    data() {
      return {
        url: "http://localhost:40000/test/" + this.$route.params.id + "/upload",
        fileList: []
      };
    },
    methods: {
      submitUpload() {
        
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>