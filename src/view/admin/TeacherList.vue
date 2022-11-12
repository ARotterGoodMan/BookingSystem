<template>
  <div class="container">
    <h4>
      教师管理
      <i class="fa fa-calendar-check-o float-end" style="color:#02bfbf;"></i>
    </h4>
    <div class="insert_rest_days">
      <button class="btn btn-info" @click="insert_teacher_shown">添加教师</button>
    </div>
    <div class="table_body">
      <b-table :fields="fields" :items="teachers">
        <template v-slot:head(name)="data">
          <span class="text-info text-center m-auto" :title="data.label">姓名</span>
        </template>
        <template v-slot:head(grade)="data">
          <span class="text-info text-center m-auto" :title="data.label">等级</span>
        </template>
        <template v-slot:head(title)="data">
          <span class="text-info text-center m-auto" :title="data.label">信息</span>
        </template>
        <template v-slot:head(setting)="data">
          <span class="text-info text-center  m-auto" :title="data.label">操作</span>
        </template>
        <template v-slot:cell(setting)="row">
          <button class="btn btn-my" @click="del_teacher(row.item)">删除</button>
          <button class="btn btn-my" @click="update_teacher(row.item)">修改</button>
        </template>
        <template v-slot:cell(title)="row">
          <div class="title">
            {{ row.item.title }}
          </div>
        </template>
      </b-table>
    </div>

  </div>
  <a-tab-bar nav="a-teacher-list"/>
  <b-modal v-model="insert_teacher_show" centered="true" hide-footer="true" hide-header="true">
    <div class="close" @click="insert_teacher_shown"><i class="fa fa-2x fa-close float-end"></i></div>
    <b-form @submit="insert_teacher">
      <table class="table">
        <tbody>
          <tr>
            <td class="w-25">教师姓名</td>
            <td class="w75">
              <input type="text" class="form-control date rounded m-auto text-center"
                     v-model="form.name" required placeholder="咨询师姓名">
            </td>
          </tr>
          <tr>
            <td class="w-25">教师等级</td>
            <td class="w75">
              <select class="form-select" v-model="form.grade">
                <option value="高级咨询师">高级咨询师</option>
                <option value="中级咨询师">中级咨询师</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="w-25">教师信息</td>
            <td class="w75">
              <input type="text" class="form-control date rounded m-auto text-center"
                     v-model="form.title" placeholder="咨询师信息">
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-grid">
        <button type="submit" class="sub_btn">保存</button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import ATabBar from "@/components/ATabBar";

export default {
  components: {
    ATabBar
  },
  props: {
    teachers: []
  },
  emits: ["insert_teacher", "update_teacher"],
  name: "TeacherList",
  data() {
    return {
      writer: "insert_teacher",
      fields: ['name', 'grade', 'title', 'setting'],
      insert_teacher_show: false,
      form: {
        name: '',
        grade: '',
        title: '',
      }
    }
  },
  methods: {
    insert_teacher_shown() {
      this.form = {
        name: '',
        grade: '',
        title: '',
      }
      this.writer = "insert_teacher"
      this.insert_teacher_show = !this.insert_teacher_show
    },
    insert_teacher() {
      console.log(this.writer)
      this.$emit(this.writer, this.form)
      this.insert_teacher_show = !this.insert_teacher_show
    },
    del_teacher(data) {
      this.$emit("del_teacher", data)
    },
    update_teacher(data) {
      this.form = data
      this.writer = "update_teacher"
      this.insert_teacher_show = !this.insert_teacher_show
    }

  }
}
</script>

<style scoped>
.container {
  width: 90vw;
  margin: 2vh auto 64px auto;
  height: calc(90vh - 64px);
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
.title{
  width:24vw;
  font-size: 0.8rem;
  overflow: hidden;
  display:-webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.btn-my {
  --bs-btn-padding-x: 0rem;
  --bs-btn-padding-y: 0rem;
  --bs-btn-font-size: 1rem;
  --bs-btn-font-weight: 400;
  --bs-btn-line-height: 1;
  --bs-btn-color: #212529;
  --bs-btn-bg: transparent;
  --bs-btn-border-width: 2px;
}
</style>