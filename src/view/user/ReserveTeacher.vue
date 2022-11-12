<template>
  <div class="container">
    <div class="top">
      <img :src="logo" alt="" class="logo">
    </div>
    <h2 class="header2">
      选择预约老师
    </h2>
    <div class="content">
      <div class="list row" v-for="(item,index) in teachers" :key="item" :id="'list_'+index"
           @click="click_teacher(index)">
        <div class="img col-3">
          <img :src="require('@/assets/teacher/teacher'+index+'.jpg')" alt="">
        </div>
        <div class="title col-9">
          <h6><b>{{ item.name }}</b>
            <b-badge class="badge" :variant="item.grade==='高级咨询师'?'warning':'light'">{{ item.grade }}</b-badge>
          </h6>
          <p>{{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>

  <tab-bar nav="reserve_teacher"></tab-bar>
  <b-modal v-model="show" centered="true" hide-footer="true" hide-header="true">
    <p class="modal-head">
      <img class="modal-logo" :src="modal_logo" alt="">
      &nbsp;&nbsp;&nbsp;&nbsp;<b>学员首次登录，信息待完善</b><br>
      <span class="modal-con">去个人信息中补充设置自己的信息表吧!</span>
    </p>
    <img class="modal-logo2" :src="modal_logo2" alt="">
    <div class="clear"></div>
    <div class="d-grid">
      <button @click="setting" class="sub_btn">去设置</button>
    </div>
  </b-modal>
</template>

<script>
import TabBar from "@/components/TabBar"

export default {
  name: "ReserveTeacher",
  components: {
    TabBar
  },
  props: {
    model_show: Boolean,
    teachers: []
  },
  emits: ['click_teacher'],
  data() {
    return {
      show: this.model_show,
      logo: require("@/assets/logo.png"),
      modal_logo: require("@/assets/first_login.png"),
      modal_logo2: require("@/assets/first_login2.png"),
    }
  },
  methods: {
    setting() {
      this.$router.push({path: "/update"})
    },
    click_teacher(index) {
      this.$emit('click_teacher', this.teachers[index].name)
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 90vw;
  height: calc(100vh - 64px);
  overflow: auto;
}

.header2 {
  font-family: "Source Han Serif SC", serif;
  color: rgb(43, 91, 84);
  font-weight: bolder;
}

.top {
  width: 100%;
  height: 25vh;
  text-align: center;
}

.logo {
  height: 100%;
}

.modal-logo {
  height: 1rem;
}

.modal-head {
  float: left;
  width: 80%;
  font-size: 1.2rem;
}

.modal-con {
  font-size: 1rem;
}

.modal-logo2 {
  float: left;
  width: 20%;
}

.clear {
  clear: both;
}

.sub_btn:active,
.sub_btn:focus {
  background: #37c2bb;
  color: white;
  border-radius: 20px;
  margin: 0 auto;
  padding-left: 5vw;
  padding-right: 5vw;
  border: none;
}

.sub_btn {
  background: #37c2bb;
  color: white;
  border-radius: 20px;
  margin: 0 auto;
  padding-left: 5vw;
  padding-right: 5vw;
  border: none;
}

.content {
  width: 100%;
}

.title > h6 {
  line-height: 2.6rem;
  font-size: 1.25rem;
}

.title > h6 > .badge {
  margin-left: 2vw !important;
  font-size: 0.6rem !important;
  line-height: 0.6rem !important;
}

.title > p {
  font-size: 0.8rem;
  line-height: 0.9rem;
  color: rgba(0,0,0,0.5);
}


.list {
  background-color: #e0f5ef;
  width: 100%;
  height: 12vh;
  margin: 0 auto 2vh auto;
  color: #008080;
  overflow: hidden;
  text-overflow:ellipsis
}

.img {
  line-height: 12vh;
  height: 12vh;
  padding-left: 1vw;
}

.img img {
  height: 90%;
}


</style>
