<template>
  <div class="top">
    <h2>个人信息</h2>
  </div>
  <div class="container">
    <div class="content">
      <img :src="icon" alt="" class="fa-4x">
      <span class="name">{{ user_info.name }}</span>
      <i class="fa fa-diamond text-white"></i>
      <br><span class="grade">{{ year }}届学员</span>
    </div>
    <table class="info_table">
      <tbody>
        <tr>
          <td class="info_name w-25">性别</td>
          <td class="info_data"><span
              :class="user_info.sex?'':'red'">{{
              user_info.sex ? user_info.sex : "未填写*"
            }}</span></td>
        </tr>
        <tr>
          <td class="info_name w-25">选科</td>
          <td class="info_data"><span
              :class="user_info.subjects?'':'red'">{{
              user_info.subjects ? user_info.subjects : "未填写*"
            }}</span></td>
        </tr>
        <tr>
          <td class="info_name w-25">估分</td>
          <td class="info_data"><span
              :class="user_info.fraction?'':'red'">{{
              user_info.fraction ? user_info.fraction : "未填写*"
            }}</span>
          </td>
        </tr>
        <tr>
          <td class="info_name w-25">学校</td>
          <td class="info_data"><span
              :class="user_info.school?'':'red'">{{
              user_info.school ? user_info.school : "未填写*"
            }}</span></td>
        </tr>
        <tr>
          <td class="info_name w-25">年级</td>
          <td class="info_data"><span
              :class="user_info.grade?'':'red'">{{
              grade ? grade : "未填写*"
            }}</span></td>
        </tr>
        <tr>
          <td class="info_name w-25">家长姓名</td>
          <td class="info_data"><span
              :class="user_info.parents?'':'red'">{{
              user_info.parents ? user_info.parents : "未填写*"
            }}</span>
          </td>
        </tr>
        <tr>
          <td class="info_name w-25">联系方式</td>
          <td class="info_data"><span
              :class="user_info.phoneNumber?'':'red'">{{
              user_info.phoneNumber ? user_info.phoneNumber : "未填写*"
            }}</span></td>
        </tr>
        <tr>
          <td class="info_name w-25">绑定邮箱</td>
          <td class="info_data"><span
              :class="user_info.mail?'':'red'">{{
              user_info.mail ? user_info.mail : "未填写*"
            }}</span></td>
        </tr>
      </tbody>
    </table>
    <div class="update d-grid">
      <button class="update_info" @click="update_info">修改个人信息</button>
    </div>
  </div>
  <tab-bar nav="userInfo"></tab-bar>
</template>

<script>
import TabBar from "@/components/TabBar"

export default {
  name: "UserInfo",
  components: {
    TabBar
  },
  props: {
    user_info: {},
    teachers: []
  },
  data() {
    return {
      year: new Date().getMonth() + 1 >= 9 ? new Date().getFullYear() + 1 : new Date().getFullYear(),
      grade: this.user_info.grade,
      icon: require("@/assets/icon/personal-privacy.png")
    }
  },
  beforeUpdate() {
    const this_year = new Date().getFullYear();
    const this_month = new Date().getMonth();
    let grade = parseInt(this.user_info.grade)
    if (this_month >= 9) {
      switch (true) {
        case isNaN(grade):
          this.grade = "未填写*"
          break
        case (grade === this_year):
          this.grade = '高一'
          break
        case (grade === this_year - 1):
          this.grade = '高二'
          break
        case (grade === this_year - 2):
          this.grade = '高三'
          break
        case (grade <= this_year - 3):
          this.grade = '复读/大学'
          break
        case (grade >= this_year + 1):
          this.grade = '初中'
          break
        default:
          this.grade = "未填写*"
          break
      }
    } else {
      switch (true) {
        case isNaN(grade):
          this.grade = "未填写*"
          break
        case (grade === this_year - 1):
          this.grade = '高一'
          break
        case (grade === this_year - 2):
          this.grade = '高二'
          break
        case (grade === this_year - 3):
          this.grade = '高三'
          break
        case (grade <= this_year - 4):
          this.grade = '复读/大学'
          break
        case (grade >= this_year):
          this.grade = '初中'
          break
        default:
          this.grade = "未填写*"
          break
      }
    }
  },
  created() {
    const this_year = new Date().getFullYear();
    const this_month = new Date().getMonth();
    let grade = parseInt(this.user_info.grade)
    if (this_month >= 9) {
      switch (true) {
        case isNaN(grade):
          this.grade = "未填写*"
          break
        case (grade === this_year):
          this.grade = '高一'
          break
        case (grade === this_year - 1):
          this.grade = '高二'
          break
        case (grade === this_year - 2):
          this.grade = '高三'
          break
        case (grade <= this_year - 3):
          this.grade = '复读/大学'
          break
        case (grade >= this_year + 1):
          this.grade = '初中'
          break
        default:
          this.grade = "未填写*"
          break
      }
    } else {
      switch (true) {
        case isNaN(grade):
          this.grade = "未填写*"
          break
        case (grade === this_year - 1):
          this.grade = '高一'
          break
        case (grade === this_year - 2):
          this.grade = '高二'
          break
        case (grade === this_year - 3):
          this.grade = '高三'
          break
        case (grade <= this_year - 4):
          this.grade = '复读/大学'
          break
        case (grade >= this_year):
          this.grade = '初中'
          break
        default:
          this.grade = "未填写*"
          break
      }
    }
  },
  methods: {
    update_info() {
      this.$router.push({
        path: '/update'
      })
    }
  }
}
</script>

<style scoped>

.container {
  margin: -25vh auto 0 auto;
  width: 90vw;
  height: calc(90vh - 64px);
  overflow: auto;
}

.top {
  width: 100%;
  height: 40vh;
  background-image: linear-gradient(to bottom, #059695, #d0f0e6);
  text-align: center;
}

.top > h2 {
  line-height: 20vh;
  color: #fff;
  font-weight: bolder;
}

.fa-4x {
  color: #fff;
  height: 8vh;
  float: left;
}

.name {
  font-size: 2rem;
  line-height: 3rem;
  color: #fff;
  font-weight: bolder;
}

.grade {
  font-size: 1rem;
  line-height: 2rem;
  color: #fff;
  font-weight: bolder;
}

.info_table {
  background-color: #e0f5ef;
  width: 95%;
  margin: 3vh auto;
  height: 45vh;

}

.info_table > tbody > tr > td {
  font-family: FangSong_GB2312, FangSong, STFangsong;
}

.red {
  color: red;
}

.info_name {
  font-size: 1rem;
  text-align: center;
  font-weight: bolder;
}

.info_data {
  text-align: left;
  padding-left: 1.5rem;
}

.update_info {
  width: 13rem;
  background: #37c2bb;
  color: #fff;
  border: none;
  font-size: 1.5rem;
  line-height: 2.3rem;
  border-radius: 20px;
  text-align: center;
  margin: 0 auto 10vh auto;
}
</style>
