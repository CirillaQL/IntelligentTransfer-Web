<template>
  <div class="login-container">
    <el-form :model="LoginForm" :rules="LoginRule"
      status-icon
      ref="LoginForm" 
      label-position="left" 
      label-width="0px" 
      class="login-page">
        <h3 class="title">登录</h3>
        <el-form-item prop="username">
          <el-input type="text" 
              v-model="LoginForm.username" 
              auto-complete="off" 
              placeholder="邮箱/电话"
          />
        </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" 
                v-model="LoginForm.password" 
                auto-complete="off" 
                placeholder="密码"
            />
          </el-form-item>
        <el-checkbox 
            v-model="checked"
            class="rememberme"
        >记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:40%;" @click="handleSubmit">登录</el-button>
          <el-button type="primary" style="width:40%;" @click="register">注册</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      LoginForm: {
        username: '',
        password: '',
      },
      LoginRule: {
        username: [{required: true, message: '请输入账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      checked: false
    }
  },
  methods: {
    handleSubmit () {
        let phoneReg = /^1[3-9]\d{9}$/
        let EmailReg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
        var userInfo = this.LoginForm.username
        var password = this.LoginForm.password
        var loginType = 0
        if (phoneReg.test(userInfo) == true){
            loginType = 1
        }
        if (EmailReg.test(userInfo) == true){
            loginType = 2
        }
        var loginMessage = {"userinfo": userInfo, "password": password, "loginType":loginType,"token":localStorage.getItem('token')}
        var toGo = this.$router
        this.axios.post("http://localhost:40000/login",loginMessage)
          .then(function (response){
            if(response.data.msg == "登录失败"){
              alert("登录失败")
              toGo.push('/login')
            }else{
              localStorage.setItem('token',response.data.token)
              toGo.push('/user/'+response.data.userId)
            }
          })
    },
    register (){
      this.$router.push('/register')
    }
  }
};
</script>

<style>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>
