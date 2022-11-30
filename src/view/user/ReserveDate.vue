<template>
  <div class="container">
    <div class="close rounded-circle" @click="close"><i class="fa fa-close"></i></div>
    <div class="clear"></div>
    <b-form @submit="dates(form.date)">
      <input type="date" class="form-control date rounded m-auto text-center"
             :min="start" :max="end" v-model="form.date" required>
      <div class="btn_list">
        <b-button class="but btn-sm col-3" v-for="time in period" variant="outline-primary" :key="time"
                  @click="clickTime(time)"
                  :disabled='reserves.indexOf(form.date+" "+time)!==-1&&form.date!==""
                  ||my_reserves_date.indexOf(form.date+clickTeacherName)!==-1'
                  id="reserves"
                  :class="form.time===time?'active':''"
        ><i class="fa fa-angle-down fa-08x"></i>
          <div class="c-time">
            {{ time.split("-")[0] }}<br>{{ time.split("-")[1] }}
          </div>
        </b-button>
        <b-button class="but col-3" variant="outline-primary"
                  @click="clickTime('其他时间')" id="reserves"
                  size="sm"
                  :disabled='my_reserves_date.indexOf(form.date+clickTeacherName)!==-1'
                  :class="form.time==='其他时间'?'active':''"
                  style="font-size: 1rem !important;"
        ><i class="fa fa-angle-down fa-08x"></i>
          <div class="c-time">
            其它时间<br>咨询老师
          </div>
        </b-button>
        <b-alert variant="danger" :show="my_reserves_date.indexOf(form.date)!==-1">每日最多可预约一次</b-alert>
      </div>
      <input type="text" class="form-control date rounded w-75 m-auto"
             v-model="form.remark" placeholder="您主要想沟通的问题是？">
      <div class="d-grid">
        <b-button type="submit" class="click">确定预约</b-button>
      </div>
    </b-form>
    <div class="update_info text-center h6 text-white" style="margin: 2vh auto">
      <b>基本信息想要修改?<span @click="update_info" style="color:#1b9ea7;">点击修改信息</span></b>
    </div>
  </div>
</template>

<script>
const this_date = new Date()
const start_date = new Date()
const end_date = new Date()
start_date.setDate(this_date.getDate() + 1);
end_date.setDate(start_date.getDate() + 7);
const start_month = (start_date.getMonth() + 1) > 9
    ? (start_date.getMonth() + 1)
    : "0" + (start_date.getMonth() + 1)
const end_month = (end_date.getMonth() + 1) > 9
    ? (end_date.getMonth() + 1)
    : "0" + (end_date.getMonth() + 1)
const start_day = (start_date.getDate()) > 9
    ? start_date.getDate()
    : "0" + (start_date.getDate())
const end_day = (end_date.getDate()) > 9
    ? end_date.getDate()
    : "0" + end_date.getDate()
const start = start_date.getFullYear() + '-' + start_month + '-' + start_day
const end = end_date.getFullYear() + '-' + end_month + '-' + end_day

export default {
  name: "ReserveDate",
  props: {
    reserves: String,
    clickTeacherName: String,
    period: [],
    my_reserves: []
  },
  emits: ['close_reserve_date', 'clickDateTime'],
  data() {
    return {
      start,
      end,
      show_alert: false,
      my_reserves_date: [],
      form: {
        date: start,
        time: '',
        remark: ''
      }
    };
  },
  created() {
    let my_reserves_date = []
    for (let i = 0; i < this.my_reserves.length; i++) {
      my_reserves_date.push(this.my_reserves[i].date + this.my_reserves[i].teacher);
    }
    this.my_reserves_date = my_reserves_date
  },
  methods: {
    close() {
      this.$emit('close_reserve_date');
      this.$router.push({
        path: '/reserve_teacher'
      })
    },
    clickTime(time) {
      this.form.time = time
      this.show_alert = false
    },
    dates() {
      if (this.form.time !== '') {
        this.$emit('clickDateTime', this.form)
      } else {
        this.show_alert = true
      }
    },
    update_info() {
      this.$emit('close_reserve_date');
      this.$router.push({
        path: '/update'
      })
    }
  }

}
</script>

<style scoped>
.close {
  background-color: #02bfbf;
  width: 5vh;
  height: 5vh;
  line-height: 5vh;
  text-align: center;
  color: #fff;
  float: right;
  margin-top: 2vh;
  margin-right: 5vw;
  margin-bottom: 3vh;
}

.container {
  height: 100vh;
}

.clear {
  clear: both;
}

.date {
  width: 80%;
  height: 5vh;
  background-color: #c0f5f1;
  border-left: 5px solid #15bfbf;
  border-right: 5px solid #15bfbf;
}

.btn_list {
  margin: 3vh auto;
  text-align: center;
}

.but {
  margin: 2vh 2vw;
  line-height: 2.5rem;
  background-color: #498a78;
  border-radius: 20px;
  color: #ffffff;
  font-size: 1.5rem;
  height: 15vh;
}


.active {
  background-color: #0d6efd !important;
}

.but:disabled {
  background-color: #69b09c;
  color: white;
}

.fa-08x {
  display: block;
  font-size: 0.8rem;
  line-height: 1.5rem;
}

.c-time {
  display: block;
  margin-top: -5px;
}

.click {
  width: 13rem;
  background: #37c2bb;
  color: #fff;
  border: none;
  font-size: 1.5rem;
  line-height: 2.3rem;
  border-radius: 20px;
  text-align: center;
  margin: 3vh auto 0 auto;
}
</style>