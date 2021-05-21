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
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <div class="registerDriver">
            <el-card shadow="always" class="driverCard">
            <el-form
              ref="form"
              :model="form"
            >
              <el-form-item label="车牌号">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="车辆类型">
                <el-radio-group v-model="form.resource">
                  <el-radio label="1" border>四座小车(1-2人)</el-radio>
                  <el-radio label="2" border>别克商务(3-5人)</el-radio>
                  <el-radio label="3" border>考斯特(6-13人)</el-radio>
                  <el-radio label="4" border>大巴车(15-40人)</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
              </el-form-item>
            </el-form>
            </el-card>
            <el-card shadow="always" class="driverCard">
            <el-radio-group v-model="status">
                  <el-radio label=1 border>就绪</el-radio>
                  <el-radio label=2 border>载客中</el-radio>
                  <el-radio label=3 border>忙</el-radio>
                  <el-radio label=4 border>下线</el-radio>
            </el-radio-group>
          <div class="updateDriverStatusButton">
            <el-button type="primary" @click="updateDriverStatus">更新司机状态</el-button>
          </div>
            </el-card>
            </div>
            <el-card shadow="always" class="driverCard">
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
          
        </el-card>
        
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</div>
</template>

<script>
import { resolveDynamicComponent } from 'vue';
import { ElMessage } from 'element-plus';
export default {
  data() {
    return {
      activeIndex: "4",
      tableData: [],
      form: {
        name: "",
        resource: "",
      },
      currentRow: null,
      status: 1
    };
  },
  methods: {
    onSubmit() {
      var id = this.$route.params.id;
      var registerDriver = {
        userId: this.$route.params.id,
        carNumber: this.form.name,
        carType: this.form.resource,
      };
      this.axios
        .post(
          "http://localhost:40000/user/" + id + "/registerDriver",
          registerDriver
        )
        .then(function (response) {
          console.log(response.data.msg);
        });
    },
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
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log(this.currentRow)
    },
    handleRowClick(){
      console.log(this.currentRow)
    },
    updateDriverStatus(){
      console.log(this.status)
      var url = "http://localhost:40000/user/" + this.$route.params.id +"/updateDriverStatus"
      var jsonInfo = {
        status: this.status
      }
      this.axios.post(url,jsonInfo)
        .then(function (response){
          if(response.data.msg == "ok"){
            ElMessage.success({
              message: '修改成功！',
              type: 'success'
            })
          }else{
            ElMessage.error('修改失败');
          }
        })
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
    getDriverInfo(){
      var table = this.tableData
      var url = "http://localhost:40000/user/" + this.$route.params.id + "/getDriverOrder"
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
        })
      })
    }
  },
  created(){
    this.getDriverInfo();
  }
};
</script>

<style>
.el-header {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}

.el-radio{
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}

.registerDriver{
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}

.updateDriverStatusButton {
  margin-top: 30px;
}

.driverCard {
  margin-bottom: 20px;
}
</style>
