<template>
  <el-container class="layout-container" style="height: 500px">
    <el-header class="text-right text-xs">
      <Header />
    </el-header>
    <el-container class="mt-3 ml-3 mr-3">
      <el-aside>
        <Nav />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from './header.vue'
import Nav from './nav.vue'
</script>
<style lang="scss">
.el-header {
  position: relative;
  color: var(--el-text-color-primary);
  background-color: $--box-bg-color;
}

.el-aside {
  width: 160px !important;
  height: fit-content;
  margin-right: 18px;
  background-color: $--box-bg-color;
}

.el-main {
  background-color: $--box-bg-color;
}
</style>
