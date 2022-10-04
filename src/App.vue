<template>
  <div class="app-container">
    <router-view @login="login" :error="user_info.error" :model_show="user_info.state==='0'"
                 :user_info="user_info" :teachers="teachers" @update="update_user_info"
                 @click_teacher="click_teacher" :reserves="reserves" @clickDateTime="clickDateTime"
                 :my_reserves="my_reserves" @close_reserve_date="close_reserve_date" @delete="delete_reserve"/>
  </div>
</template>

<script>
import Axios from "@/axios"

export default {
  name: 'App',
  components: {},
  data() {
    return {
      user_info: {},
      teachers: [],
      reserves: [],
      timeTo: null,
      my_reserves: []
    }
  },
  created() {
    if (!this.user_info.state) {
      this.$router.push({
        path: '/'
      })
    }
    clearInterval(this.timeTo)
  },
  methods: {
    login(data) {
      let that = this
      Axios.login(that, data)
      Axios.get_teacher(that)
      Axios.my_get_reserve(that, data)
      setTimeout(() => {
        if (this.user_info.state === "0" || this.user_info.state === "1") {
          this.$router.push({
            path: '/reserve_teacher',
          });
        }
      }, 2000)
    },
    update_user_info(data) {
      const that = this
      Axios.update_user_info(data)
      setTimeout(() => {
        Axios.login(that, this.user_info)
        this.$router.push({
          path: '/UserInfo',
        });
      }, 2000)
    },
    click_teacher(data) {
      const that = this
      this.user_info.teacher = data
      Axios.get_reserve(that, data)
      this.timeTo = setInterval(() => {
        Axios.get_reserve(that, data)
      }, 15000)
      this.$router.push({
        path: '/reserve_date',
      })
    },
    close_reserve_date() {
      clearInterval(this.timeTo);
    },
    clickDateTime(data) {
      const that = this
      Axios.insert(this.user_info, data);
      clearInterval(this.timeTo);
      setTimeout(() => {
        Axios.my_get_reserve(that, this.user_info)
        this.$router.push({
          path: '/remind',
        })
      }, 500)

    },
    delete_reserve(data) {
      const that = this
      Axios.delete(data)
      setTimeout(() => {
        Axios.my_get_reserve(that, this.user_info)
      }, 1000)
    }
  },
}
</script>

<style>
.app-container {
  background: #d0f0e6;
}

html {
  background: #d0f0e6;
}
</style>
