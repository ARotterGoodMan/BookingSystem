<template>
  <div class="top">
    <h2 v-if="user_info.state==='0'">补充个人信息</h2>
    <h2 v-else>修改个人信息</h2>
  </div>
  <div class="container">
    <div class="content">
      <img :src="icon" alt="" class="fa-4x">
      <span class="name">{{ user_info.name }}</span>
      <i class="fa fa-diamond text-white"></i>
      <br><span class="grade">2023届学员</span>
    </div>
    <b-form>
      <table class="info_table">
        <tbody>
          <tr>
            <td class="info_name w-25">性别</td>
            <td class="info_data">
              <b-form-radio-group
                  v-model="form.sex"
                  :options="sex_list"
                  name="checkbox-1"
              ></b-form-radio-group>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">选科</td>
            <td class="info_data">
              <b-form-checkbox-group
                  v-model="form.subjects"
                  :options="subject_list"
                  name="subjects"
                  :state="(form.subjects.length === 3)"
              ></b-form-checkbox-group>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">估分</td>
            <td class="info_data">
              <b-form-input
                  class="w-75"
                  v-model="form.fraction"
                  type="number"
                  :state="form.fraction>=150&&form.fraction<=750||form.fraction===''?null:false"
                  name="fraction"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">学校</td>
            <td class="info_data">
              <b-form-input
                  class="w-75"
                  v-model="form.school"
                  name="school"
                  required
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">年级</td>
            <td class="info_data">
              <b-form-input
                  class="w-75"
                  type="number"
                  min="2000"
                  max="2099"
                  :state="(form.grade === '' || form.grade > 2000 && form.grade < 2099)?null:false"
                  v-model="form.grade"
                  name="grade"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">家长姓名</td>
            <td class="info_data">
              <b-form-input
                  class="w-75"
                  v-model="form.parents"
                  name="parents"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">联系方式</td>
            <td class="info_data">
              <b-form-input
                  class="w-75"
                  v-model="form.phoneNumber"
                  name="phoneNumber"
                  length="11"
                  :state="form.phoneNumber.length === 11||form.phoneNumber===''?null:false"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">绑定邮箱</td>
            <td class="info_data">
              <b-form-input
                  class="w-75"
                  v-model="form.mail"
                  name="mail"
              ></b-form-input>
            </td>
          </tr>
        </tbody>
      </table>
    </b-form>
    <div class="update d-grid">
      <button class="update_info" @click="update">保存个人信息</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "UpdateUserInfo",
  components: {},
  props: {
    user_info: {},
    teachers: []
  },
  emits: ['update'],
  data() {
    return {
      icon: require("@/assets/icon/personal-privacy.png"),
      form: {
        A_id: this.user_info.A_id,
        name: this.user_info.name,
        sex: this.user_info.sex ? this.user_info.sex : '男',
        grade: this.user_info.grade ? this.user_info.grade : '',
        subjects: this.user_info.subjects ? this.user_info.subjects.split(" ") : [],
        fraction: this.user_info.fraction ? this.user_info.fraction : '',
        school: this.user_info.school ? this.user_info.school : '',
        parents: this.user_info.parents ? this.user_info.parents : '',
        phoneNumber: this.user_info.phoneNumber ? this.user_info.phoneNumber : '',
        mail: this.user_info.mail ? this.user_info.mail : ''
      },
      sex_list: ["男", "女"],
      subject_list: ["物理", "化学", "生物", "政治", "历史", "地理"]
    }
  },
  methods: {
    update() {
      this.$emit('update', this.form)
    }
  }
}
</script>

<style scoped>

.container {
  margin: -25vh 5vw 0 5vw;
  width: 90vw;
  height: calc(90vh - 64px);;
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
  font-family: FangSong_GB2312, FangSong, STFangsong;
  background-color: #e0f5ef;
  width: 95%;
  margin: 3vh auto;
  height: 45vh;
}

.info_name {
  font-size: 1rem;
  text-align: center;
  font-weight: bolder;
}

.info_data {
  text-align: left;
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
