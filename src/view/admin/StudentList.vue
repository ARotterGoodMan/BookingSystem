<template>
  <div class="top">
    <h4>
      学生管理
    </h4>
    <b-form v-if="select_or_insert ==='select'" @submit="select_student">
      <div class="row">
        <div class="col-3">
          <b-form-select v-model="select_or_insert" size="sm">
            <b-form-select-option value="select">搜索</b-form-select-option>
            <b-form-select-option value="insert">添加</b-form-select-option>
          </b-form-select>
        </div>
        <div class="col-3 text-center">
          <b-form-input
              size="sm"
              v-model="form.name"
              placeholder="学生姓名"
          ></b-form-input>
        </div>
        <div class="col-3 text-center">
          <b-form-input
              size="sm"
              v-model="form.A_id"
              placeholder="学生A_id"
          ></b-form-input>
        </div>
        <div class="col-3 text-center">
          <b-button variant="primary" size="sm" type="submit">搜索</b-button>
        </div>
      </div>
    </b-form>
    <b-form v-else @submit="insert_student">
      <div class="row">
        <div class="col-3">
          <b-form-select v-model="select_or_insert" size="sm">
            <b-form-select-option value="select">搜索</b-form-select-option>
            <b-form-select-option value="insert">添加</b-form-select-option>
          </b-form-select>
        </div>
        <div class="col-3 text-center">
          <b-form-input
              size="sm"
              v-model="form.name"
              required
              placeholder="学生姓名"
          ></b-form-input>
        </div>
        <div class="col-3 text-center">
          <b-form-input
              size="sm"
              v-model="form.A_id"
              required
              placeholder="学生A_id"
          ></b-form-input>
        </div>
        <div class="col-3 text-center">
          <b-button variant="primary" size="sm" type="submit">保存</b-button>
        </div>
      </div>
    </b-form>
  </div>
  <div class="container">
    <b-table-simple class="student_table">
      <b-thead class="student_thead">
        <b-tr class="row">
          <b-th class="col text-center text-info">学生姓名</b-th>
          <b-th class="col text-center text-info">A_id</b-th>
          <b-th class="col text-center text-info">操作</b-th>
        </b-tr>
      </b-thead>
      <b-tbody class="student_tbody">
        <b-tr class="row" v-if="select">
          <b-td class="col text-center">{{ select_data.name }}</b-td>
          <b-td class="col text-center">{{ select_data.A_id }}</b-td>
          <b-td class="col text-center">
            <b-button class="btn-my" size="sm" v-show="select_data.name!=='查无此人'"
                      @click="student_data_shown(select_data)">查看
            </b-button>
          </b-td>
        </b-tr>
        <b-tr class="row" v-else v-for="(student,index) in students" :key="student">
          <b-td class="col text-center">{{ student.name }}</b-td>
          <b-td class="col text-center">{{ student.A_id }}</b-td>
          <b-td class="col text-center">
            <b-button class="btn-my" size="sm" @click="student_data_shown(student,index)">查看</b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
  <a-tab-bar-setting nav="a-student"/>
  <b-modal v-model="student_data_show" centered="true" hide-footer="true" hide-header="true">
    <div class="close" @click="student_data_not_shown"><i class="fa fa-2x fa-close float-end"></i></div>
    <b-form @submit="update_student_data">
      <table class="info_table">
        <tbody>
          <tr>
            <td class="info_name w-25">姓名</td>
            <td class="info_data">
              <b-form-input
                  v-model="student_data.name"
                  name="name"
                  disabled
                  size="sm"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">A_id</td>
            <td class="info_data">
              <b-form-input
                  v-model="student_data.A_id"
                  name="A_id"
                  :disabled="student_data.client_grade==='A'"
                  size="sm"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">性别</td>
            <td class="info_data">
              <b-form-radio-group
                  v-model="student_data.sex"
                  :options="sex_list"
                  name="sex"
                  size="sm"
              ></b-form-radio-group>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">选科</td>
            <td class="info_data">
              <b-form-checkbox-group
                  v-model="student_data.subjects"
                  :options="subject_list"
                  name="subjects"
                  :state="(student_data.subjects.length === 3)"
                  size="sm"
              ></b-form-checkbox-group>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">估分</td>
            <td class="info_data">
              <b-form-input
                  v-model="student_data.fraction"
                  type="number"
                  name="fraction"
                  :state="student_data.fraction>=150&&student_data.fraction<=750
                  ||student_data.fraction===''?null:false"
                  size="sm"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">学校</td>
            <td class="info_data">
              <b-form-input
                  v-model="student_data.school"
                  name="school"
                  size="sm"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">年级</td>
            <td class="info_data">
              <b-form-input
                  type="number"
                  v-model="student_data.grade"
                  :state="(student_data.grade === '' || student_data.grade > 2000
                  && student_data.grade < 2099)?null:false"
                  name="grade"
                  size="sm"
                  number
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">家长姓名</td>
            <td class="info_data">
              <b-form-input
                  v-model="student_data.parents"
                  name="parents"
                  size="sm"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">联系方式</td>
            <td class="info_data">
              <b-form-input
                  v-model="student_data.phoneNumber"
                  name="phoneNumber"
                  :state="student_data.phoneNumber.length === 11||student_data.phoneNumber===''?null:false"
                  length="11"
                  size="sm"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">绑定邮箱</td>
            <td class="info_data">
              <b-form-input
                  v-model="student_data.mail"
                  name="mail"
                  size="sm"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">客户等级</td>
            <td class="info_data">
              <b-form-radio-group
                  v-model="student_data.client_grade"
                  :options="['B','A']"
                  name="client_grade"
                  size="sm"
              ></b-form-radio-group>
            </td>
          </tr>
          <tr>
            <td class="info_name w-25">状态</td>
            <td class="info_data">
              <b-form-radio-group
                  v-model="student_data.state"
                  :options="['0','1']"
                  name="state"
                  size="sm"
              ></b-form-radio-group>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div class="d-grid text-center">
                <b-button type="submit" size="sm" class="sub_btn">修改</b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </b-form>
  </b-modal>
</template>

<script>
import ATabBarSetting from "@/components/ATabBarSetting";

export default {
  name: "StudentList",
  props: {
    students: []
  },
  components: {
    ATabBarSetting
  },
  data() {
    return {
      select_or_insert: 'select',
      student_data_show: false,
      select: false,
      form: {
        name: "",
        A_id: ""
      },
      select_data: {
        A_id: "",
        name: "",
        sex: "",
        grade: "",
        subjects: "",
        fraction: "",
        school: "",
        parents: "",
        mail: "",
        phoneNumber: "",
        client_grade: "",
        state: "",
      },
      student_data: {
        index: 0,
        A_id: "",
        name: "",
        sex: "",
        grade: "",
        subjects: "",
        fraction: "",
        school: "",
        parents: "",
        mail: "",
        phoneNumber: "",
        client_grade: "",
        state: "",
      },
      sex_list: ["男", "女"],
      subject_list: ["物理", "化学", "生物", "政治", "历史", "地理"]
    }
  },
  methods: {
    insert_student() {
      this.$emit("insert_student", this.form)
      this.form = {
        name: "",
        A_id: ""
      }
    },
    select_student() {
      this.select = true
      if (this.form.name !== "" && this.form.A_id === "") {
        this.select = true
        this.select_data = this.students.find(item => item.name === this.form.name) ?
            this.students.find(item => item.name === this.form.name) : {
              name: "查无此人"
            }
      } else if (this.form.name === "" && this.form.A_id !== "") {
        this.select = true
        this.select_data = this.students.find(item => item.A_id === this.form.A_id) ?
            this.students.find(item => item.A_id === this.form.A_id) : {
              name: "查无此人"
            }
      } else if (this.form.name !== "" && this.form.A_id !== "") {
        this.select = true
        this.select_data = this.students.find(item => item.A_id === this.form.A_id && item.name === this.form.name) ?
            this.students.find(item => item.A_id === this.form.A_id && item.name === this.form.name) : {
              name: "查无此人"
            }
      } else {
        this.select = false
      }

    },
    student_data_shown(data, index) {
      this.student_data = {
        index: index,
        A_id: data.A_id,
        name: data.name,
        sex: data.sex ? data.sex : "",
        grade: data.grade ? data.grade : "",
        subjects: data.subjects ? data.subjects.split(" ") : [],
        fraction: data.fraction ? data.fraction : "",
        school: data.school ? data.school : "",
        parents: data.parents ? data.parents : "",
        mail: data.mail ? data.mail : "",
        phoneNumber: data.phoneNumber ? data.phoneNumber : "",
        client_grade: data.client_grade ? data.client_grade : "",
        state: data.state ? data.state : "",
      }
      this.student_data_show = !this.student_data_show
    },
    student_data_not_shown() {
      this.student_data_show = !this.student_data_show
    },
    update_student_data() {
      if (this.select_data.client_grade === 'B' && this.student_data.state === '0') {
        this.student_data = {
          A_id: this.student_data.A_id ? this.student_data.A_id : '',
          name: this.student_data.name,
          sex: "男",
          grade: "",
          subjects: "",
          fraction: 0,
          school: "",
          parents: "",
          mail: "",
          phoneNumber: this.select.client_grade === 'B' ? this.student_data.phoneNumber : "",
          state: '0',
          client_grade: this.student_data.client_grade,
          old_client_grade: this.select.client_grade
        }
      } else if (this.student_data.state === '0') {
        this.student_data = {
          A_id: this.student_data.A_id ? this.student_data.A_id : '',
          name: this.student_data.name,
          sex: "男",
          grade: "",
          subjects: "",
          fraction: 0,
          school: "",
          parents: "",
          mail: "",
          phoneNumber: this.students[this.student_data.index].client_grade === 'B' ? this.student_data.phoneNumber : "",
          state: '0',
          client_grade: this.student_data.client_grade,
          old_client_grade: this.students[this.student_data.index].client_grade
        }
      } else {
        this.student_data.old_client_grade = this.students[this.student_data.index].client_grade
      }
      this.$emit("update", this.student_data)
      this.student_data_show = !this.student_data_show
    }
  }
}
</script>

<style scoped>
.container {
  width: 90vw;
  margin: 2vh auto 64px auto;
  height: calc(98vh - 64px);
  overflow: auto;
}

.top {
  position: fixed;
  background-color: #d0f0e6;
  height: 12vh;
  z-index: 99;
  width: 90vw;
  left: 10vw;
}

.student_table {
  margin-top: 12vh;
}

.sub_btn {
  background: #37c2bb;
  color: white;
  border-radius: 20px;
  margin: 2vh auto 0 auto;
  padding-left: 5vw;
  padding-right: 5vw;
  border: none;
}

.btn-my {
  padding: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  color: #212529;
  background: none !important;
  border: none !important;
}

.col-3 {
  padding-left: 0;
  padding-right: 5px;
}

.btn-my:hover {
  padding: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  color: #212529;
  background: none !important;
  border: none !important;
}

*:disabled {
  background-color: #fff !important;
}
</style>