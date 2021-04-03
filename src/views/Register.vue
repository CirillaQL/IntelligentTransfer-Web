<template>
  <div class="register-container">
    <el-form
      :model="RegisterForm"
      :rules="RegisterRule"
      status-icon
      ref="RegisterForm"
      label-position="left"
      label-width="0px"
      class="register-page"
    >
      <h3 class="title">注册</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="RegisterForm.username"
          auto-complete="off"
          placeholder="姓名"
        />
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input
          type="text"
          v-model="RegisterForm.nickname"
          auto-complete="off"
          placeholder="昵称(选填)"
        />
      </el-form-item>
      <el-form-item prop="sex">
        <input type="radio" name="radios" value="男" v-model="sex" /><label
          id="man"
          >男</label
        >
        <input type="radio" name="radios" value="女" v-model="sex" /><label
          >女</label
        >
      </el-form-item>
      <el-form-item prop="city">
        <el-cascader
          size="large"
          :options="options"
          v-model="selectedOptions"
          @change="addressChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item prop="address">
        <el-input
          type="text"
          v-model="RegisterForm.address"
          auto-complete="off"
          placeholder="详细地址(如：吉林省长春市朝阳区……)"
        />
      </el-form-item>
      <el-form-item prop="company">
        <el-input
          type="text"
          v-model="RegisterForm.company"
          auto-complete="off"
          placeholder="公司"
        />
      </el-form-item>
      <el-form-item prop="phoneNumber">
        <el-input
          type="text"
          v-model="RegisterForm.phoneNumber"
          auto-complete="off"
          placeholder="电话号码"
        />
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          type="text"
          v-model="RegisterForm.email"
          auto-complete="off"
          placeholder="电子邮件(选填)"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="RegisterForm.password"
          auto-complete="off"
          placeholder="密码(选填)"
        />
      </el-form-item>
      <el-form-item prop="idCard">
        <el-input
          type="text"
          v-model="RegisterForm.idCard"
          auto-complete="off"
          placeholder="身份证号(选填)"
        />
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 40%" @click="handleSubmit"
          >确认</el-button
        >
        <el-button type="primary" style="width: 40%" @click="register"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
export default {
  data() {
    return {
      options: regionData,
      selectedOptions: ["110000", "110100", "110101"],
      RegisterForm: {
        username: "",
        nickname: "",
        address: "",
        sex: "男",
        company: "",
        phoneNumber: "",
        email: "",
        password: "",
        idCard: "",
      },
      RegisterRule: {
        username: [
          { required: true, message: "请输入真实名字", trigger: "blur" },
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        company: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleSubmit(arr) {
      var username = this.RegisterForm.username;
      var nickname = this.RegisterForm.nickname;
      var province = CodeToText[this.selectedOptions[0]];
      var city = CodeToText[this.selectedOptions[1]];
      var district = CodeToText[this.selectedOptions[2]];
      var address = this.RegisterForm.address;
      var company = this.RegisterForm.company;
      var sex = this.sex;
      var phoneNumber = this.RegisterForm.phoneNumber;
      var email = this.RegisterForm.email;
      var password = this.RegisterForm.password;
      var idCard = this.RegisterForm.idCard;
      var loginMessage = {
        username: username,
        nickname: nickname,
        province: province,
        city: city,
        district: district,
        address: address,
        sex: sex,
        company: company,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        idCard: idCard,
      };
      var toGo = this.$router;
      var cookiesSet = this.$cookies;
      this.axios
        .post("http://localhost:40000/register", loginMessage)
        .then(function (response) {
          if (response.data.userId == "") {
            this.$alert("注册失败 err:" + response.data.error);
            toGo.push("/register");
          } else {
            console.log(response.data.userId);
            cookiesSet.set("token", response.data.token);
            toGo.push("/user/" + response.data.userId + "/home");
          }
        });
    },
    register() {
      this.$router.push("/login");
    },
    addressChange(arr) {
      // console.log(this.selectedOptions)
      // console.log(arr)
      // console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]])
    },
  },
};
</script>

<style>
.register-container {
  width: 100%;
  height: 100%;
}
.register-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
#man {
  margin-right: 50px;
}
</style>
