<template>
  <div class="container">
    <div class="content">
      <h1>登录预约系统<img :src="logo" alt="" class="img"></h1>
      <b-form @submit="login" @reset="sign_up">
        <input v-model="form.name" type="text" class="form-control form-control-lg radius" placeholder="请输入学生姓名"
               required>
        <input v-model="form.A_id" type="text" class="form-control form-control-lg radius"
               placeholder="请输入AidPW或手机号码" required>
        <br>
        <div class="error">
          {{ error }}
        </div>
        <div class="sub">
          <b-button class="sub_btn" type="submit">登录</b-button>
          <b-button class="sub_btn" type="reset">注册</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginUp",
  props: {
    error: String
  },
  emits: ['login'],
  data() {
    return {
      form: {
        name: "",
        A_id: "",
      },
      log: console.log,
      logo: require("@/assets/logo1.png")
    }
  },
  methods: {
    login() {
      this.$emit("login", this.form);
    },
    sign_up() {
      this.$router.push({
        path: "/sign_up",
      });
    }
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

.sub {
  margin-top: 10vh;
  text-align: center;
}

.sub_btn {
  width: 5rem;
  background: #37c2bb;
  color: #fff;
  border: none;
  box-shadow: rgb(203, 203, 203) 0 4px 4px 0;
  border-radius: 10px;
  margin: 0 5vw;
  text-align: center;
}

.error {
  color: red;
}
</style>