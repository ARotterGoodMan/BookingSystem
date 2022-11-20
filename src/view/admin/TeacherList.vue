<template>
  <div class="container">
    <h4>
      教师管理
    </h4>
    <div class="insert_rest_days">
      <button class="btn btn-info" @click="insert_teacher_shown">添加教师</button>
    </div>
    <b-table-simple>
      <b-thead>
        <b-tr class="">
          <b-th class="col text-center text-info">姓名</b-th>
          <b-th class="col text-center text-info">信息</b-th>
          <b-th class="col text-center text-info">操作</b-th>
        </b-tr>
      </b-thead>
      <b-tbody class="teacher_body">
        <b-tr class="teacher_body_tr" v-for="teacher in teachers" :key="teacher">
          <b-td class="text-center">{{ teacher.name }}</b-td>
          <b-td class="teacher_list_title text-center">{{ teacher.title }}</b-td>
          <b-td class="text-center">
            <button class="btn btn-my" @click="del_teacher(teacher)">删除</button>
            <button class="btn btn-my" @click="update_teacher(teacher)">修改</button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
  <a-tab-bar-setting nav="a_teacher"/>
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
            <td class="w-25">教师信息</td>
            <td class="w75">
              <textarea class="form-control date rounded m-auto" rows="5" v-model="form.title">
              </textarea>
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
import ATabBarSetting from "@/components/ATabBarSetting";

export default {
  components: {
    ATabBarSetting
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
        title: '',
      }
      this.writer = "insert_teacher"
      this.insert_teacher_show = !this.insert_teacher_show
    },
    insert_teacher() {
      this.$emit(this.writer, this.form)
      this.insert_teacher_show = !this.insert_teacher_show
    },
    del_teacher(data) {
      this.writer = "del_teacher"
      this.$emit(this.writer, data)
    },
    update_teacher(data) {
      this.form = data
      this.writer = "update_teacher"
      this.$emit(this.writer, data)
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

.teacher_body {
  font-size: 0.6rem;
}

.teacher_list_title {
  width: 100%;
  display: block;
  height: 3rem;
  overflow: hidden;
  font-size: 0.6rem;
}

@media (max-width: 720px) {
  .teacher_list_title {
    width: 46vw;
    display: block;
    height: 3rem;
    overflow: hidden;
    font-size: 0.6rem;
  }
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
  padding: 5px;
  font-size: 0.6rem;
  font-weight: 400;
  line-height: 1;
  color: #212529;
  background-color: transparent;
  border: none;
}
</style>