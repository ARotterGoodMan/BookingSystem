<template>
  <div class="container">
    <h4>
      休息日管理
      <i class="fa fa-calendar-check-o float-end" style="color:#02bfbf;"></i>
    </h4>
    <div class="insert_rest_days">
      <button class="btn btn-info" @click="rest_days_shown">添加休息日</button>
    </div>
    <div class="table_body">
      <b-table :fields="fields" :items="rest_day.slice(start_row,end_row)">
        <template v-slot:head(teacher)="data">
          <span class="text-info text-center" :title="data.label">教师姓名</span>
        </template><template v-slot:head(date)="data">
          <span class="text-info text-center" :title="data.label">休息时日期</span>
        </template><template v-slot:head(time)="data">
          <span class="text-info text-center" :title="data.label">休息时间</span>
        </template>
        <template v-slot:head(setting)="data">
          <span class="text-info text-center" :title="data.label">操作</span>
        </template>
        <template #cell(setting)="row">
          <button class="btn btn-my" @click="del_rest(row.item)">删除</button>
        </template>
      </b-table>
    </div>
    <b-pagination
        class="pagination"
        v-model="page"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        align="fill"
    ></b-pagination>
  </div>
  <a-tab-bar nav="a_rest_day"/>
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
        <button type="submit" class="sub_btn">保存</button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import ATabBar from "@/components/ATabBar"

export default {
  name: "RestDay",
  components: {
    ATabBar
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
  height: 71vh;
  overflow: auto;
  width: 100%;
  margin-right: 0;
  margin-left: 0;
}

.t_head {
  height: auto;
}

.t_body {
  height: 50vh;
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
  --bs-btn-padding-x: 0rem;
  --bs-btn-padding-y: 0rem;
  --bs-btn-font-size: 1rem;
  --bs-btn-font-weight: 400;
  --bs-btn-line-height: 1;
  --bs-btn-color: #212529;
  --bs-btn-bg: transparent;
  --bs-btn-border-width: 0px;
}
</style>