
<template>
  <el-menu
    :default-active="activeIndex1"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">个人中心 </el-menu-item>
    <el-menu-item index="2">查看个人</el-menu-item>
    <el-menu-item index="3">注册成为司机</el-menu-item>
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
              label-width="80px"
              :label-position="left"
            >
              <el-form-item label="车牌号">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="车辆类型">
                <el-radio-group v-model="form.resource">
                  <el-radio label="1">四座小车(1-2人)</el-radio>
                  <el-radio label="2">别克商务(3-5人)</el-radio>
                  <el-radio label="3">考斯特(6-13人)</el-radio>
                  <el-radio label="4">大巴(15-40人)</el-radio>
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
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
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
.el-radio {
  display: block;
  line-height: 23px;
  white-space: normal;
  margin-right: 0;
}
</style>
