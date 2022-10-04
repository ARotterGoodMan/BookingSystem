<template>
  <ul class="nav nav-fill">
    <li class="nav-item">
      <a href="#/userInfo" class="nav-link" :class="nav==='userInfo'?'active':''">
        <i class="fa fa-id-card"></i><br>
        个人信息
      </a>
    </li>
    <li class="nav-item">
      <a href="#/reserve_teacher" class="nav-link" :class="nav==='reserve_teacher'?'active':''">
        <i class="fa fa-hand-pointer-o"></i><br>
        开始预约
      </a>
    </li>
    <li class="nav-item">
      <a href="#/remind" class="nav-link"  :class="nav==='remind'?'active':''">
        <i class="fa fa-envelope-o"></i><br>
        预约信息 </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    nav: {
      type: String
    }
  }
}
</script>

<style scoped>
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