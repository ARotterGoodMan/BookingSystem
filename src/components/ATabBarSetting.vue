<template>
  <ul class="nav2">
    <li class="nav-item">
      <a href="#/admin/remind" class="nav-link">
        <i class="fa fa-angle-left fa-2x"></i>
      </a>
    </li>
  </ul>
  <ul class="nav nav-fill">
    <li class="nav-item">
      <a href="#/admin/students" class="nav-link" :class="nav==='a-student'?'active':''">
        <i class="fa fa-hand-pointer-o"></i><br>
        学生管理
      </a>
    </li>
    <li class="nav-item">
      <a href="#/admin/teachers" class="nav-link" :class="nav==='a_teacher'?'active':''">
        <i class="fa fa-hand-pointer-o"></i><br>
        教师管理
      </a>
    </li>
    <li class="nav-item">
      <a href="#/admin/rest_day" class="nav-link" :class="nav==='a_rest_day'?'active':''">
        <i class="fa fa-hand-pointer-o"></i><br>
        休息管理
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ATabBarSetting",
  props: {
    nav: String
  }
}
</script>

<style scoped>
.nav2 {
  position: fixed;
  top: 10px;
  left: 5px;
  list-style: none;
  padding-left: 0;
}

.nav {
  background-color: #fff;
  position: fixed;
  width: 100vw;
  bottom: 0;
}

.nav-link {
  color: #999999;
}

.active {
  color: red;
}
</style>