<template>
  <div class="container">
    <div class="content">
      <h1>管理员登录预约系统<img :src="logo" alt="" class="img"></h1>
      <b-form @submit="login">
        <input v-model="form.user" type="text" class="form-control form-control-lg radius"
               placeholder="请输入管理员账号"
               required>
        <input v-model="form.password" type="password" class="form-control form-control-lg radius"
               placeholder="请输入管理员密码"
               required>
        <br>
        <div class="error">
          {{ a_error }}
        </div>
        <div class="sub d-grid">
          <input type="submit" value="登录" class="sub_btn">
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ALoginUp",
  props: {
    a_error: String
  },
  emits: ['A_login'],
  data() {
    return {
      form: {
        user: "",
        password: "",
      },
      logo: require("@/assets/logo1.png")
    }
  },
  methods: {
    login() {
      this.$emit("A_login", this.form);
    }
  }
}

</script>

<style scoped>
.container {
  height: 100vh;
  width: 90vw;
}

.content {
  height: 60vh;
  width: 90vw;
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
  width: 10rem;
  background: #37c2bb;
  color: #fff;
  border: none;
  font-size: 1.5rem;
  box-shadow: rgb(203, 203, 203) 0 4px 4px 0;
  border-radius: 15px;
  margin: 0 auto;
  text-align: center;
}

.error {
  color: red;
}
</style>