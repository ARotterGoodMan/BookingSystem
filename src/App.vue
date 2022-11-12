<template>
  <div class="app-container">
    <router-view
        @login="login" :error="user_info.error" :a_error="A_login_status.error"
        :model_show="user_info.state==='0'" :user_info="user_info" @A_login="A_login"
        :teachers="teachers" @update="update_user_info" @click_teacher="click_teacher"
        :reserves="reserves" @clickDateTime="clickDateTime" :my_reserves="my_reserves"
        @close_reserve_date="close_reserve_date" @delete="delete_reserve" :rest_day="rest_day"
        :period="period" @insert_rest_days="insert_rest_days" @del_rest="del_rest" @export="export_data"
        @insert_teacher="insert_teacher" @del_teacher="del_teacher" @update_teacher="update_teacher"
    />
  </div>
</template>

<script>
import Axios from "@/axios"

export default {
  name: 'App',
  components: {},
  data() {
    return {
      period: ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
        '15:00-16:00', '19:00-20:00', '20:00-21:00', '21:00-22:00'],
      A_login_status: {},
      user_info: {},
      teachers: [],
      reserves: [],
      timeTo: null,
      my_reserves: [],
      rest_day: []
    }
  },
  created() {
    const that = this
    clearInterval(this.timeTo)
    Axios.get_teacher(that)
  },
  methods: {
    A_login(data) {
      const that = this
      Axios.a_logon(that, data)
      setTimeout(() => {
        if (this.A_login_status.state === 'ok') {
          Axios.a_get_reserve(that)
          Axios.get_teacher(that)
          Axios.rest_day(that)
          this.$router.push({path: '/admin/remind'});
        }
      }, 2000)
    },
    login(data) {
      let that = this
      Axios.login(that, data)
      setTimeout(() => {
        if (this.user_info.state === "0" || this.user_info.state === "1") {
          Axios.get_teacher(that)
          Axios.my_get_reserve(that, data)
          this.$router.push({path: '/reserve_teacher'});
        }
      }, 2000)
    },
    update_user_info(data) {
      const that = this
      Axios.update_user_info(data)
      setTimeout(() => {
        Axios.login(that, this.user_info)
        this.$router.push({path: '/UserInfo'});
      }, 2000)
    },
    click_teacher(data) {
      const that = this
      this.user_info.teacher = data
      Axios.get_reserve(that, data)
      this.timeTo = setInterval(() => {
        Axios.get_reserve(that, data)
      }, 15000)
      this.$router.push({path: '/reserve_date'})
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
        this.$router.push({path: '/remind'})
      }, 500)

    },
    delete_reserve(data) {
      const that = this
      Axios.delete(data)
      this.user_info = {
        name: 'sxy',
        A_id: '15002'
      }
      setTimeout(() => {
        Axios.my_get_reserve(that, this.user_info)
      }, 1000)
    },
    insert_rest_days(data) {
      const that = this
      Axios.setting_rest_day(data)
      setTimeout(() => {
        Axios.rest_day(that)
      }, 1000)
    },
    del_rest(data) {
      const that = this
      Axios.del_rest(data)
      console.log(data)
      setTimeout(() => {
        Axios.rest_day(that)
      }, 1000)
    },
    export_data() {
      Axios.export()
    },
    insert_teacher(data) {
      console.log("insert_teacher", data)
    },
    update_teacher(data) {
      console.log("update_teacher", data)
    },
    del_teacher(data) {
      console.log("del_teacher", data)
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
