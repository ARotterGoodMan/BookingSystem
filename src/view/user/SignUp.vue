<template>
  <div class="container">
    <div class="content">
      <h1>登录预约系统<img :src="logo" alt="" class="img"></h1>
      <b-form @submit="sign_up_over">
        <input v-model="form.name" type="text" class="form-control form-control-lg radius" placeholder="请输入学生姓名"
               required>
        <input v-model="form.phoneNumber" type="text" class="form-control form-control-lg radius" placeholder="手机号码"
               required>
        <div>
          <input v-model="form_identifyCode" type="text" class="form-control form-control-lg radius w-50 float-start"
                 placeholder="验证码" required>
          <Identify :identify-code="identifyCode"
                    class="radius float-start identify" @click="makeCode(identifyCodes, 4)"></Identify>
        </div>
        <div class="clear"></div>
        <div class="error">
          {{ error }}
        </div>
        <b-alert v-model="show_alert" class="alert_none" :variant="identify_error==='注册完成'?'success':'danger'">
          {{ identify_error }}
        </b-alert>
        <div class="sub">
          <b-button class="sub_btn" type="submit">立即注册</b-button>
        </div>
      </b-form>
      <div class="update_info h6" @click="$router.push({path:'/login'})"
           style="margin-top: 1vh;color:#1b9ea7;">
        <i class="fa fa-angle-left"></i>已注册前去登录
      </div>
    </div>
  </div>
</template>

<script>

import Identify from "@/components/identify";

export default {
  name: "SignUp",
  components: {
    Identify
  },
  props: {
    error: String
  },
  data() {
    return {
      form: {
        name: "",
        phoneNumber: "",
      },
      form_identifyCode: "",
      identify_error: "注册完成",
      identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyz",
      identifyCode: "",
      show_alert: false,
      logo: require("@/assets/logo1.png")
    }
  },
  mounted() {
    this.identifyCode = ""
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    sign_up_over() {
      const phone_reg = /^1[3|4|5|7|8]\d{9}$/
      if (this.form_identifyCode === this.identifyCode && phone_reg.test(this.form.phoneNumber)) {
        this.identify_error = "注册完成"
        this.show_alert = true
        this.$emit("sign_up_over", this.form)
        setTimeout(() => {
          this.$router.push({
            path: "/login",
          })
        }, 2000)
      } else if (!phone_reg.test(this.form.phoneNumber)) {
        this.show_alert = true
        this.identify_error = "手机号码格式错误"
      } else if (this.form_identifyCode !== this.identifyCode) {
        this.show_alert = true
        this.identify_error = "验证码错误"
      }
    },
    makeCode(o, l) {
      this.identifyCode = ""
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)];
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  height: 100vh;
}

.content {
  height: 60vh;
  padding: 15vh 2vw 25vh 0;
}

h1 {
  font-family: "微软雅黑", serif;
  font-weight: bold;
}

.img {
  height: 5rem
}

.radius::-webkit-input-placeholder {
  color: #93e1da;
  font-size: 0.9rem;
}

.radius {
  border-radius: 15px;
  margin-top: 4vh;
  color: #93e1da;
}

.identify {
  margin: calc(5vh - 6px) 5vw;
  border-radius: 0;
  border: 3px solid #93e1da;
}

.clear {
  clear: both;
}

.sub {
  margin-top: 4vh;
  text-align: center;
}

.sub_btn {
  background: #37c2bb;
  color: #fff;
  border: none;
  box-shadow: rgb(203, 203, 203) 0 4px 4px 0;
  border-radius: 10px;
  margin: 0 auto;
  text-align: center;
}

.error {
  color: red;
}


</style>