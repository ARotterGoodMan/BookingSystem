<template>
  <div class="container">
    <h4>
      您的预约列表
      <i class="fa fa-calendar-check-o float-end" style="color:#02bfbf;"></i>
    </h4>
    <div class="list_top">
      <div class="list_top_1">
        <h3>长按可取消</h3>
      </div>
      <div class="list_top_2">
        <h3><b>{{ my_reserves.length }}</b></h3>
        <p>累计预约</p></div>
    </div>
    <div class="clear"></div>
    <div class="content">
      <div class="list row" v-for="(item,index) in my_reserves" :key="item" :id="'list_'+index"
           @dblclick="db_click(index)" @touchstart="touchstart(index)" @touchend="touchend(index)"
           @mouseleave="touchend(index)">
        <div class="img col-3">
          <img class="rounded-circle" :src="item.teacher==='王老师'?teacher1:teacher2"
               alt="item.teacher">
        </div>
        <div class="title col-5">
          <p><b>{{ item.teacher }}</b></p>
          <p>{{ item.time }}</p>
        </div>
        <div class="date col-4">
          <h1>
            <b>{{ item.date.split("-")[1] + '/' + item.date.split("-")[2] }}</b>
          </h1>
        </div>
        <div class="col-1"></div>
        <div class="delete col-2 float-end text-white text-center none" @click="del(index)">
          取消
        </div>
      </div>
    </div>
  </div>
  <tab-bar nav="remind"></tab-bar>
</template>

<script>
import TabBar from "@/components/TabBar"

export default {
  name: "RemindInfo",
  components: {
    TabBar
  },
  props: {
    my_reserves: []
  },
  emits: ['delete'],
  data() {
    return {
      log: console.log,
      timeOutEvent: 0,
      teacher1: require('@/assets/teacher/teacher0.jpg'),
      teacher2: require('@/assets/teacher/teacher1.jpg'),
    }
  },
  methods: {
    del(index) {
      console.log(this.my_reserves[index])
      this.$emit('delete', this.my_reserves[index])
    },
    db_click(index) {
      this.timeOutEvent = this.timeOutEvent === 1 ? 0 : 1
      if (this.timeOutEvent === 1) {
        for (let i = 0; i < this.my_reserves.length; i++) {
          if (index === i) {
            document.getElementById("list_" + i).className = 'list row active'
          } else {
            document.getElementById("list_" + i).className = 'list row'
          }
        }
      } else {
        for (let i = 0; i < this.my_reserves.length; i++) {
          document.getElementById("list_" + i).className = 'list row'
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
          } else {
            document.getElementById("list_" + i).className = 'list row'
          }
        }
        this.timeOutEvent = 0
      } else {
        for (let i = 0; i < this.my_reserves.length; i++) {
          setTimeout(() => {
            document.getElementById("list_" + i).className = 'list row'
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
  margin: 5vh auto 64px auto;
  height: calc(95vh - 64px);
}

.list_top {
  width: 100%;
  height: 13vh;
  background-color: #02bfbf;
  margin: 5vh auto 2vh auto;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0 8px 0;

}

.list_top > .list_top_1 {
  height: 100%;
  line-height: 13vh;
  width: 60%;
  float: left;
}

.list_top > .list_top_1 > h3 {
  height: 100%;
  line-height: 13vh;
  margin-left: 5vh;
  color: #aae9e9;
}

.list_top > .list_top_2 {
  width: 40%;
  height: 100%;
  text-align: center;
  float: left;
}

.list_top > .list_top_2 > h3 {
  color: #fff;
  margin-top: 2vh;
}

.list_top > .list_top_2 > p {
  margin-top: 2vh;
  color: #aae9e9;
}

.content {
  margin: 2vh auto 0 auto;
  height: calc(71vh - 64px);
  overflow: auto;
}

.clear {
  clear: both;
}

.list {
  background-color: rgba(255,255,255,0.5);
  width: 100%;
  height: 12vh;
  margin: 0 auto 2vh auto;
  border-radius: 20px;
}

.img {
  line-height: 12vh;
  height:12vh;
}

.img > img {
  height: 80%;
  margin: auto;
}

.title > p {
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.title > p:last-child {
  color: rgba(0, 0, 0, 0.5);
}

.date > h1 {
  line-height: 12vh;
}

.delete {
  height: 12vh;
  display: none;
  line-height: 12vh;
  background-color: red;
  border-radius: 20px;
  font-size: 0.8rem;
}


.active > .img {
  display: none;
}

.active > .delete {
  display: block;
}

</style>