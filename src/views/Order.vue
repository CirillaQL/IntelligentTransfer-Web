<template>
<div class="background">
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
    <el-col :span="12">
      <div class="title">当前订单信息</div>
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        @row-click="handleRowClick"
        style="width: 100%"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="StartDate" label="日期" width="120">
        </el-table-column>
        <el-table-column property="StartTime" label="时间" width="120">
        </el-table-column>
        <el-table-column property="CarNumber" label="车牌号" width="120">
        </el-table-column>
        <el-table-column property="FromAddress" label="出发地" width="120">
        </el-table-column>
        <el-table-column property="ToAddress" label="目的地" width="120">
        </el-table-column>
        <el-table-column property="UserName" label="姓名" width="120">
        </el-table-column>
        <el-table-column property="UserPhone" label="电话"> </el-table-column>
      </el-table>
      <el-button id="deleteOrder" @click="deleteOrder" type="danger">取消订单</el-button>
    </el-col>
    <el-col :span="12">
      <div class="tableInfo">修改订单信息</div>
      <el-form
        class="ToEditForm"
        :model="EditForm"
        label-position="left"
        label-width="0px">
        <el-form-item prop="username">
        <el-input
          type="text"
          v-model="EditForm.username"
          auto-complete="off"
          placeholder="姓名"
        />
      </el-form-item>
      <el-form-item prop="userphone">
        <el-input
          type="text"
          v-model="EditForm.userphone"
          auto-complete="off"
          placeholder="电话"
        />
      </el-form-item>
      </el-form>
      <el-button class="update-order" @click="updateOrder" type="primary">需修改订单信息</el-button>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { ElMessage } from "element-plus";
import { resolveDynamicComponent } from 'vue';
export default {
  data() {
    return {
      activeIndex: "2",
      tableData: [],
      EditForm: {
        username: "",
        userphone: "",
      },
      choseUUid: null,
      currentRow: null
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
    getinfo(){
      var table = this.tableData
      var url =
        "http://localhost:40000/user/" + this.$route.params.id + "/getOrders";
      this.axios.get(url).then(function (response){
        console.log(response.data)
        response.data.forEach(element => {
          table.push({
            Id: element.UUid,
            CarNumber: element.CarNumber,
            StartDate: element.StartDate,
            StartTime: element.StartTime,
            FromAddress: element.FromAddress,
            ToAddress: element.ToAddress,
            UserName: element.UserName,
            UserPhone: element.UserPhone
          })
        });
      })
    },
    setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleRowClick() {
      // 获取当前选中的数据
      console.log(this.currentRow)
      this.choseUUid = this.currentRow.Id
      this.EditForm.username = this.currentRow.UserName
      this.EditForm.userphone = this.currentRow.UserPhone
    },
    deleteOrder(){
      var url = "http://localhost:40000/user/" + this.$route.params.id + "/deleteOrder/"+this.currentRow.Id;
      var network = this.axios;
      
      console.log(url)
      if(this.currentRow == null){
        this.$alert('请先选择订单','删除订单')
      }else{
        this.$confirm('此操作将删除订单，是否继续?','删除订单',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var thismessage = this.$message;
          network.get(url).then(function (response){
            if(response.data.msg == "0"){
              thismessage({
                type: 'success',
                message: '删除成功！'
              });
            }else{
              thismessage({
                type: 'error',
                message: '删除失败！'
              });
            }
          })
        });
        }
    },
    updateOrder(){
      console.log(this.choseUUid)
      var jsonInfo = {
        UUid: this.choseUUid,
        UserName: this.EditForm.username,
        UserPhone: this.EditForm.userphone,
      }
      var url = "http://localhost:40000/user/" + this.$route.params.id +"/updateOrder"
      this.axios.post(url,jsonInfo)
        .then(function (response){
          console.log(response)
        })
    }
  },
  created () {
    this.getinfo();
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

.el-table{
  margin-left: 40px;
  margin-top: 40px;
}

.title{
  text-align: center;
  margin-top: 30px;
}

#deleteOrder{
  margin-top: 30px;
  justify-content: center;
}

.ToEditForm {
  width: 60%;
  margin:0 auto;
  margin-top: 70px;
}

.tableInfo{
  text-align: center;
  margin-top: 30px;
}
</style>