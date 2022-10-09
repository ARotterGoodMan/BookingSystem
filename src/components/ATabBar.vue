<template>
  <ul class="nav nav-fill">
    <li class="nav-item">
      <a href="#/admin/rest_day" class="nav-link" :class="nav==='a_rest_day'?'active':''">
        <i class="fa fa-hand-pointer-o"></i><br>
        休息管理
      </a>
    </li>
    <li class="nav-item">
      <a href="#/admin/remind" class="nav-link" :class="nav==='a_remind'?'active':''">
        <i class="fa fa-envelope-o"></i><br>
        预约信息
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ATabBar",
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