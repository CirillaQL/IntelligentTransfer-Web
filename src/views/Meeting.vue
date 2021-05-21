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
        <el-calendar v-model="value" id="DateTable">
        </el-calendar>
        <el-button @click="downloadMeeting" type="primary">下载该日的行程信息</el-button>
    </el-col>
    <el-col :span="12">
      <h1>选择日期：</h1>
      <h2>{{dateShow()}}</h2>
      <div class="meetingTable">
        <el-form
          class="MeetingForm"
          :model="meetingForm"
          >
          <el-form-item prop="username">
        <el-input
          type="text"
          v-model="meetingForm.username"
          auto-complete="off"
          placeholder="姓名"
        />
      </el-form-item>
      <el-form-item prop="userphone">
        <el-input
          type="text"
          v-model="meetingForm.userphone"
          auto-complete="off"
          placeholder="电话"
        />
      </el-form-item>
      <el-form-item prop="Fromstartdate">
        <el-input
          type="text"
          v-model="meetingForm.Fromstartdate"
          auto-complete="off"
          placeholder="去程出发日期"
        />
      </el-form-item>
      <el-form-item prop="Fromstarttime">
        <el-input
          type="text"
          v-model="meetingForm.Fromstarttime"
          auto-complete="off"
          placeholder="去程出发时间"
        />
      </el-form-item>
      <el-form-item prop="Fromfromaddress">
        <el-input
          type="text"
          v-model="meetingForm.Fromfromaddress"
          auto-complete="off"
          placeholder="去程出发地"
        />
      </el-form-item>
      <el-form-item prop="Fromtoaddress">
        <el-input
          type="text"
          v-model="meetingForm.Fromtoaddress"
          auto-complete="off"
          placeholder="去程目的地"
        />
        </el-form-item>
        <el-form-item prop="FromShift">
        <el-input
          type="text"
          v-model="meetingForm.FromShift"
          auto-complete="off"
          placeholder="去程航班"
        />
        </el-form-item>
        <el-form-item prop="Arrivestartdate">
        <el-input
          type="text"
          v-model="meetingForm.Arrivestartdate"
          auto-complete="off"
          placeholder="返程出发日期"
        />
      </el-form-item>
      <el-form-item prop="Arrivestarttime">
        <el-input
          type="text"
          v-model="meetingForm.Arrivestarttime"
          auto-complete="off"
          placeholder="返程出发时间"
        />
      </el-form-item>
      <el-form-item prop="Arrivefromaddress">
        <el-input
          type="text"
          v-model="meetingForm.Arrivefromaddress"
          auto-complete="off"
          placeholder="返程出发地"
        />
      </el-form-item>
      <el-form-item prop="Arrivetoaddress">
        <el-input
          type="text"
          v-model="meetingForm.Arrivetoaddress"
          auto-complete="off"
          placeholder="返程目的地"
        />
        </el-form-item>
        <el-form-item prop="ArriveShift">
        <el-input
          type="text"
          v-model="meetingForm.ArriveShift"
          auto-complete="off"
          placeholder="去程航班"
        />
        </el-form-item>
        </el-form>
      </div>
      <el-button @click="checkMeeting" type="primary">查看会议信息测试</el-button>
      <el-button @click="UpdateMeetingInfo" type="danger">更新会议信息</el-button>
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
      activeIndex: "3",
      value: new Date(),
      meetingForm: {
        MeetingUUid: "",
        username: "",
        userphone: "",
        Fromstartdate: "",
        Fromstarttime: "",
        Fromfromaddress: "",
        Fromtoaddress: "",
        FromShift: "",
        Arrivestartdate: "",
        Arrivestarttime: "",
        Arrivefromaddress: "",
        Arrivetoaddress: "",
        ArriveShift: ""
      },
      meetingUUid: null
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
    downloadMeeting(){
        var year = this.value.getFullYear();
        var month = this.value.getMonth()+1<10 ? "0"+(this.value.getMonth()+1) : this.value.getMonth()+1;
        var day = this.value.getDate()<10 ? "0"+ this.value.getDate() : this.value.getDate();
        var ans = year+"-"+month+"-"+day;
        var url = "http://localhost:40000/user/" + this.$route.params.id +"/getMeeting/" + ans
        window.open(url)
    },
    dateShow(){
        var year = this.value.getFullYear();
        var month = this.value.getMonth()+1<10 ? "0"+(this.value.getMonth()+1) : this.value.getMonth()+1;
        var day = this.value.getDate()<10 ? "0"+ this.value.getDate() : this.value.getDate();
        var ans = year+"-"+month+"-"+day;
        return ans
    },
    checkMeeting(){
        var url = "http://localhost:40000/user/" + this.$route.params.id +"/checkMeeting"
        var date = this.dateShow();
        var jsonInfo = {
          meetingdate: date
        }
        var table = this.meetingForm
        // 首先清空内容
        table.MeetingUUid = ""
        table.username = ""
        table.userphone = ""
        table.Fromstartdate = ""
        table.Fromstarttime = ""
        table.Fromfromaddress = ""
        table.Fromtoaddress = ""
        table.FromShift = ""
        table.Arrivestartdate = ""
        table.Arrivestarttime = ""
        table.Arrivefromaddress = ""
        table.Arrivetoaddress = ""
        table.ArriveShift = ""
        this.axios.post(url,jsonInfo)
          .then(function(response){
            if(response.data === null){
              ElMessage.warning({
                message: '当前日期没有相应的会议信息',
                type: 'warning'
                });
            }else{
              console.log(response)
              response.data.forEach(element => {
                table.MeetingUUid = element.UUid
                table.username = element.Name
                table.userphone = element.PhoneNumber
                table.Fromstartdate = element.StartDate
                table.Fromstarttime = element.StartTime
                table.Fromfromaddress = element.StartBeginAddress
                table.Fromtoaddress = element.StartEndAddress
                table.FromShift = element.StartShift
                table.Arrivestartdate = element.ReturnDate
                table.Arrivestarttime = element.ReturnTime
                table.Arrivefromaddress = element.ReturnStartAddress
                table.Arrivetoaddress = element.ReturnEndAddress
                table.ArriveShift = element.ReturnShift
            })
            }
            
          })
    },
    UpdateMeetingInfo(){
      var jsonInfo = {
        UUid: this.meetingForm.MeetingUUid,
        Name:  this.meetingForm.username,
        PhoneNumber:     this.meetingForm.userphone,
        StartDate:      this.meetingForm.Fromstartdate,
        StartTime:     this.meetingForm.Fromstarttime,
        StartBeginAddress:      this.meetingForm.Fromfromaddress,
        StartEndAddress:      this.meetingForm.Fromtoaddress,
        StartShift:      this.meetingForm.FromShift,
        ReturnDate:      this.meetingForm.Arrivestartdate,
        ReturnTime:      this.meetingForm.Arrivestarttime,
        ReturnStartAddress:      this.meetingForm.Arrivefromaddress,
        ReturnEndAddress:      this.meetingForm.Arrivetoaddress,
        ReturnShift:  this.meetingForm.ArriveShift
      }
      var url = "http://localhost:40000/user/" + this.$route.params.id +"/updateMeeting"
      this.axios.post(url, jsonInfo)
        .then(function (response){
          console.log(response)
        })
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
    background-color: transparent !important;/* 背景透明 */
}

</style>