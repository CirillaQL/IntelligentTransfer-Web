<template>
<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">个人中心</el-menu-item>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
</el-menu>
<el-row>
    <el-col :span="12"></el-col>
    <el-col :span="12">
        <el-upload
            class="upload-demo"
            action=""
            ref="myupload"
            :http-request="Test"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="uploadChange"
            :file-list="fileList"
            drag
            multiple
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!-- <el-button size="small" type="primary">点击上传</el-button> -->
        <template #tip>
            <div class="el-upload__tip">上传会议的Excel表格</div>
        </template>
        </el-upload>
        <el-button  id="uploadSubmit" size="small" type="primary" @click="Test">上传到服务器</el-button>
    </el-col>
</el-row>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        fileList: []
      };
    },
    methods: {
      uploadChange(file,fileList){
        console.log(file.raw);
        this.fileList.push(file.raw) ;
        console.log(this.fileList);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleRemove(file, fileList) {
        for (let index = 0; index < this.fileList.length; index++) {
            const element = this.fileList[index];
            if(file.uid === element.uid){
                this.fileList.splice(index,1)
            }
        }
      },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            return this.$confirm(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      Test(){
        console.log(this.fileList)
        console.log(this.$route.params)
      },
      PutTest(){
        console.log(this.fileList[0])
        var instance = this.axios.create({
            timeout: 1000,
            headers: {"Content-Type":"multipart/form-data"}
        })
        var form = new FormData();
        form.append("file",this.fileList[0])
        console.log(form)
        instance.post("http://localhost:40000/user/"+this.$route.params.id+"/upload",form)
          .then(function(response){
              console.log(response.data.msg)
          })
      }
    }
  }
</script>

<style>
html,body,#app{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
}
.el-container{
  margin: 30px;
}
.el-upload{
  margin-top: 30px;
  justify-content: center;
}
#uploadSubmit{
  margin-top: 30px;
  font-size:15px
}

</style>
