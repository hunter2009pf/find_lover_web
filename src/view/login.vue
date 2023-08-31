<template>
  <div class="login-container with-background-image">
    <el-card class="login-card">
      <div v-show="isLogin">
        <h3>登录</h3>
        <el-form
          ref="loginForm"
          :rules="loginRules"
          :model="loginForm"
          label-width="80px"
          class="login-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              @keyup.enter.native="login"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="switchForm">注册</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-show="!isLogin">
        <h3>注册</h3>
        <el-form
          ref="registerForm"
          :rules="registerRules"
          :model="registerForm"
          label-width="80px"
          class="register-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerForm.password"
            ></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              type="password"
              v-model="registerForm.confirmPassword"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
            <el-button @click="switchForm">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";
import chatIndex from "../view/pages/chatHome/index.vue";
import { getRegister, login, getMyInfo } from "../api/getData";
import { ERROR_MESSAGES } from "../api/index";
export default {
  data() {
    return {
      isLogin: true,
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: this.validateConfirmPassword, trigger: "blur" },
        ],
      },

      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: this.validateConfirmPassword, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    switchForm() {
      this.isLogin = !this.isLogin;
      this.resetForm();
    },
    resetForm() {
      this.$refs.loginForm.resetFields();
      this.$refs.registerForm.resetFields();
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login({
            account: this.loginForm.username,
            password: this.loginForm.password,
          }).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                message: "登录成功",
                type: "success",
                duration: 1000,
              });
              getMyInfo().then((res) => {
                //存入个人信息
                console.log(res);
                window.localStorage.setItem(
                  "user_info",
                  JSON.stringify(res.data)
                );
                this.$router.replace({
                  name: "CardList",
                });
              });

              // // 创建一个组件构造函数
              // const ComponentConstructor = Vue.extend(chatIndex);

              // // 实例化组件
              // const componentInstance = new ComponentConstructor();

              // // 手动挂载组件到空节点
              // componentInstance.$mount();
            } else {
              this.$message({
                message: `${ERROR_MESSAGES[res.code]}`,
                type: "warning",
              });
            }
          });
        }
      });
    },
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // 注册逻辑
          getRegister({
            account: this.registerForm.username,
            password: this.registerForm.password,
          }).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                message: "注册成功,即将跳转至登录页",
                type: "success",
              });
              setTimeout(() => {
                this.isLogin = !this.isLogin;
              }, 2000);
            } else {
              this.$message({
                message: `${ERROR_MESSAGES[res.code]}`,
                type: "warning",
              });
            }
          });
        }
      });
    },
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.registerForm.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    },
  },
};
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}
.with-background-image {
  background-image: url("@/assets/img/img_login_background.webp");
  background-size: cover;
  background-position: center;
}
.login-card {
  width: 400px;
  padding: 16px;
  border-radius: 16px;
}
.login-form,
.register-form {
  margin-top: 20px;
}
</style>
