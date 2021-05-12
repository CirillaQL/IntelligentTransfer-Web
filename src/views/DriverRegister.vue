<template>
<div class="background">
  <el-menu
    :default-active="activeIndex1"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">
      <a :href="jumpToBaseUrl()">个人中心 </a>
    </el-menu-item>
    <el-menu-item index="2">
      <a :href="jumpToOrders()">查看个人订单</a>
    </el-menu-item>
    <el-menu-item index="3">
      <a :href="jumpToMeetings()">查看个人会议</a>
    </el-menu-item>
    <el-menu-item index="4">
      <a :href="jumpToRegisterDriver()" target="_blank">注册成为司机</a>
    </el-menu-item>
  </el-menu>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="8"><div></div></el-col>
        <el-col :span="8"
          ><div>
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
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div></el-col
        >
        <el-col :span="8"><div></div></el-col>
      </el-row>
    </el-main>
  </el-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "4",
      form: {
        name: "",
        resource: "",
      },
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
    }
  },
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
  margin: 10px;
}
</style>
