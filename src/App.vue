<template>
  <div class="app">
    <router-view
        @login="login" :error="user_info.error" :a_error="A_login_status.error"
        :model_show="user_info.state==='0'" :user_info="user_info" :rest_day="rest_day"
        :my_reserves="my_reserves" :students="students" :clickTeacherName="clickTeacherName"
        @A_login="A_login" :teachers="teachers" :reserves="reserves" :period="period"
        @update="update_user_info" @click_teacher="click_teacher" @clickDateTime="clickDateTime"
        @close_reserve_date="close_reserve_date" @delete="delete_reserve"
        @insert_rest_days="insert_rest_days" @del_rest="del_rest" @export="export_data"
        @insert_teacher="insert_teacher" @del_teacher="del_teacher" @update_teacher="update_teacher"
        @setting="setting" @insert_student="insert_student" @sign_up_over="sign_up_over"
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
      rest_day: [],
      students: [],
      clickTeacherName: ''
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
    sign_up_over(data) {
      Axios.sign_up(data)
    },
    update_user_info(data) {
      const that = this
      Axios.update_user_info(data)
      if (this.A_login_status.state === "ok") {
        setTimeout(() => {
          Axios.get_students_list(that)
        }, 2000)
      } else {
        setTimeout(() => {
          Axios.login(that, this.user_info)
          this.$router.push({path: '/UserInfo'});
        }, 2000)
      }
    },
    click_teacher(data) {
      const that = this
      this.clickTeacherName = data
      this.user_info.teacher = data
      if (this.user_info.state === "1") {
        Axios.get_reserve(that, data)
        this.timeTo = setInterval(() => {
          Axios.get_reserve(that, data)
        }, 15000)
        this.$router.push({path: '/reserve_date'})
      } else {
        alert("您还没有登录,请先登录")
        this.$router.push({path: '/'})
      }
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
      let del_date = {
        teacher: data.teacher,
        name: data.name,
        time: data.time,
        date: data.date,
        school: this.user_info.school,
        grade: this.user_info.grade
      }
      Axios.delete(del_date)
      setTimeout(() => {
        Axios.my_get_reserve(that, this.user_info)
      }, 1000)
    },
    export_data() {
      if (this.A_login_status.state === "ok") {
        Axios.export()
      }
    },
    setting() {
      const that = this
      Axios.get_students_list(that)
    },
    insert_student(data) {
      const that = this
      Axios.insert_student(data)
      setTimeout(() => {
        Axios.get_students_list(that)
      }, 600)
    },
    insert_teacher(data) {
      const that = this
      if (this.A_login_status.state === "ok") {
        Axios.insert_teacher(data)
        setTimeout(() => {
          Axios.get_teacher(that)
        }, 600)
      }
    },
    update_teacher(data) {
      const that = this
      if (this.A_login_status.state === "ok") {
        Axios.update_teacher(data)
        setTimeout(() => {
          Axios.get_teacher(that)
        }, 600)
      }
    },
    del_teacher(data) {
      const that = this
      if (this.A_login_status.state === "ok") {
        Axios.del_teacher(data)
        setTimeout(() => {
          Axios.get_teacher(that)
        }, 600)
      }
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
  }
}
</script>

<style>
.app {
  background: #d0f0e6;
}

html {
  background: #d0f0e6;
}
</style>
