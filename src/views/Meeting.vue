<template>
<div class="background">
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1" target="_blank">
      <a :href="jumpToBaseUrl()">个人中心 </a>
    </el-menu-item>
    <el-menu-item index="2" target="_blank">
      <a :href="jumpToOrders()">查看个人订单</a>
    </el-menu-item>
    <el-menu-item index="3" target="_blank">
      <a :href="jumpToMeetings()">查看个人会议</a>
    </el-menu-item>
    <el-menu-item index="4" target="_blank">
      <a :href="jumpToRegisterDriver()">注册成为司机</a>
    </el-menu-item>
  </el-menu>
  <el-row>
    <el-col :span="12">
        <el-calendar v-model="value" id="DateTable">
        </el-calendar>
    </el-col>
    <el-col :span="12">
      <el-button @click="printDate" type="primary">测试</el-button>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      activeIndex: "3",
      value: new Date()
    };
  },
  methods: {
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
    },
    printDate(){
        var year = this.value.getFullYear();
        var month = this.value.getMonth()+1<10 ? "0"+(this.value.getMonth()+1) : this.value.getMonth()+1;
        var day = this.value.getDate()<10 ? "0"+ this.value.getDate() : this.value.getDate();
        var ans = year+"-"+month+"-"+day;
        console.log(ans);
    }
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background:#ffffff')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
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

#DateTable{
    margin: 20px;
    width: 70%;
    height: 70%;
    background-color: transparent !important;/* 背景透明 */
}

</style>