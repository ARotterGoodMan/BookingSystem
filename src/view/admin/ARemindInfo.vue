<template>
  <div class="container">
    <h4>
      管理员查看预约信息类列表
      <i class="fa fa-calendar-check-o float-end" style="color:#02bfbf;" @click="$emit('export')"></i>
    </h4>
    <div class="list_top row">
      <div class="list_top_2 col" v-for="(teacher,index) in teachers" :key="teacher">
        <h3><b>{{ teachers_booting_number[index] }}</b></h3>
        <p>
          <b class="text-white">{{ teacher.name }}</b>
        </p>
      </div>
    </div>
    <div class="clear"></div>
    <div class="content">
      <div class="list row" v-for="(item,index) in my_reserves" :key="item" :id="'list_'+index"
           @dblclick="db_click(index)" @touchstart="touchstart(index)" @touchend="touchend(index)"
           @mouseleave="touchend(index)">
        <div class="img col-3" :id="'list_img_'+index">
          <h2 class="text-center" style="line-height: 12vh;width: 100%">{{ item.name }}</h2>
        </div>
        <div class="title col-5">
          <p><b>{{ item.teacher }}</b></p>
          <p>{{ item.time }}</p>
        </div>
        <div class="date col-3">
          <h4>
            <b>{{ item.date.split("-")[1] + '/' + item.date.split("-")[2] }}</b>
          </h4>
        </div>
        <div class="delete col-2 float-end text-white text-center none" @click="del(index)">
          <button class="button text-white text-center w-100">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
  <a-tab-bar nav="a_remind" @setting="$emit('setting')"/>
</template>

<script>
import ATabBar from "@/components/ATabBar";

export default {
  name: "ARemindInfo",
  components: {ATabBar},
  props: {
    my_reserves: [],
    teachers: []
  },
  emits: ['delete', 'export'],
  data() {
    return {
      timeOutEvent: 0,
      teachers_booting_number: []
    }
  },
  created() {
    for (let i = 0; i < this.teachers.length; i++) {
      this.teachers_booting_number[i] =
          this.my_reserves.filter(u => u.teacher === this.teachers[i].name).length
    }
  },
  beforeUpdate() {
    for (let i = 0; i < this.teachers.length; i++) {
      this.teachers_booting_number[i] =
          this.my_reserves.filter(u => u.teacher === this.teachers[i].name).length
    }
  },
  methods: {
    del(index) {
      this.$emit('delete', this.my_reserves[index])
    },
    db_click(index) {
      this.timeOutEvent = this.timeOutEvent === 1 ? 0 : 1
      if (this.timeOutEvent === 1) {
        for (let i = 0; i < this.my_reserves.length; i++) {
          if (index === i) {
            document.getElementById("list_" + i).className = 'list row active'
            document.getElementById("list_img_" + i).className = 'img col-2'
          } else {
            document.getElementById("list_" + i).className = 'list row'
            document.getElementById("list_img_" + i).className = 'img col-3'
          }
        }
      } else {
        for (let i = 0; i < this.my_reserves.length; i++) {
          document.getElementById("list_" + i).className = 'list row'
          document.getElementById("list_img_" + i).className = 'img col-3'
        }
      }
    },
    touchstart() {
      setTimeout(() => {
        this.timeOutEvent = 1
      }, 1000)
    },
    touchend(index) {
      if (this.timeOutEvent === 1) {
        for (let i = 0; i < this.my_reserves.length; i++) {
          if (index === i) {
            document.getElementById("list_" + i).className = 'list row active'
            document.getElementById("list_img_" + i).className = 'img col-2'
          } else {
            document.getElementById("list_" + i).className = 'list row'
          }
        }
        this.timeOutEvent = 0
      } else {
        for (let i = 0; i < this.my_reserves.length; i++) {
          setTimeout(() => {
            document.getElementById("list_" + i).className = 'list row'
            document.getElementById("list_img_" + i).className = 'img col-3'
            this.timeOutEvent = 0
          }, 1000)
        }
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 90vw;
  margin: 5vh auto 0 auto;
  height: 95vh;
}

.list_top {
  width: 100%;
  height: 13vh;
  background-color: #02bfbf;
  margin: 5vh auto 2vh auto;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0 8px 0;

}

.list_top > .list_top_2 {
  height: 100%;
  text-align: center;
  float: left;
}

.list_top > .list_top_2 > h3 {
  color: #fff;
  margin-top: 2vh;
}

.list_top > .list_top_2 > p {
  margin-top: 1vh;
  color: #aae9e9;
}

.content {
  margin: 2vh auto 0 auto;
  height: 69vh;
  overflow: auto;
}

.clear {
  clear: both;
}

.list {
  background-color: #fff;
  width: 100%;
  height: 12vh;
  margin: 0 auto 2vh auto;
  border-radius: 20px;
}

.img {
  line-height: 12vh;
}

.title > p {
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.title > p:last-child {
  color: rgba(0, 0, 0, 0.5);
}

.date > h4 {
  line-height: 12vh;
}

.delete {
  height: 12vh;
  display: none;
}

.delete > .button {
  height: 10vh;
  line-height: 1.2;
  background-color: red;
  border-radius: 20px;
  text-align: center;
  font-size: 0.8rem;
  margin-top: 1vh;
  margin-bottom: 1vh;
}

.active > .delete {
  display: block;
}

</style>