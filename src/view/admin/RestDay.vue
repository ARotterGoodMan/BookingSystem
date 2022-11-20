<template>
  <div class="container">
    <h4>
      休息日管理
    </h4>
    <div class="insert_rest_days">
      <button class="btn btn-info" @click="rest_days_shown">添加休息日</button>
    </div>
    <b-table-simple class="table_body">
      <b-thead>
        <b-tr class="row">
          <b-th class="col text-center text-info">教师姓名</b-th>
          <b-th class="col text-center text-info">休息日期</b-th>
          <b-th class="col text-center text-info">休息时间</b-th>
          <b-th class="col text-center text-info">操作</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr class="row" v-for="data in rest_day" :key="data">
          <b-td class="col text-center">{{ data.teacher }}</b-td>
          <b-td class="col text-center">{{ data.date }}</b-td>
          <b-td class="col text-center">{{ data.time }}</b-td>
          <b-td class="col text-center">
            <button class="btn btn-my" size="sm" @click="del_rest(data)">删除</button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-pagination
        class="pagination"
        v-model="page"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        align="fill"
    ></b-pagination>
  </div>
  <a-tab-bar-setting nav="a_rest_day"/>
  <b-modal v-model="insert_rest_days_shown" centered="true" hide-footer="true" hide-header="true">
    <div class="close" @click="rest_days_shown"><i class="fa fa-2x fa-close float-end"></i></div>
    <b-form @submit="insert_rest_days">
      <table class="table">
        <tbody>
          <tr>
            <td class="w-25">教师</td>
            <td class="w75">
              <select class="form-select" v-model="form.teacher">
                <option v-for="item in teachers" :value="item.name" :key="item">{{ item.name }}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="w-25">休息日期</td>
            <td class="w75">
              <input type="date" class="form-control date rounded m-auto text-center"
                     v-model="form.date" required placeholder="请选择预约日期">
            </td>
          </tr>
          <tr>
            <td class="w-25">休息时间</td>
            <td class="w75">
              <b-form-select v-model="form.time" :options="period">
              </b-form-select>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-grid">
        <b-button type="submit" class="sub_btn">保存</b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import ATabBarSetting from "@/components/ATabBarSetting";

export default {
  name: "RestDay",
  components: {
    ATabBarSetting
  },
  props: {
    rest_day: [],
    period: [],
    teachers: []
  },
  emits: ['insert_rest_days'],
  data() {
    return {
      form: {
        teacher: null,
        date: null,
        time: null
      },
      insert_rest_days_shown: false,
      fields: ['teacher', 'date', 'time', 'setting'],
      page: 1,
      perPage: 10,
      rows: 0,
      start_row: 0,
      end_row: 0

    }
  },
  created() {
    this.rows = this.rest_day.length
    this.start_row = this.page - 1
    this.end_row = this.page + 9
  },
  updated() {
    this.rows = this.rest_day.length
    this.start_row = (this.page - 1) * 10
    this.end_row = (this.page - 1) * 10 + 10
  },
  methods: {
    rest_days_shown() {
      this.insert_rest_days_shown = !this.insert_rest_days_shown
    },
    insert_rest_days() {
      for (let item in this.rest_day) {
        if (this.rest_day[item].teacher === this.form.teacher &&
            this.rest_day[item].date === this.form.date &&
            this.rest_day[item].time === this.form.time) {
          alert("当前时间以休息")
          return false
        }
      }
      this.insert_rest_days_shown = !this.insert_rest_days_shown
      this.$emit('insert_rest_days', this.form)
    },
    del_rest(data) {
      this.$emit('del_rest', data)
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

.insert_rest_days {
  margin: 2vh auto 2vh auto;
}

.table_body {
  height: 66vh;
  overflow: auto;
  margin-right: 0;
  margin-left: 0;

}

.table_body > tbody > tr > td {
  font-size: 0.7rem;
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
  padding: 0rem;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1;
  color: #212529;
  background-color: transparent;
  border: none;
}
</style>