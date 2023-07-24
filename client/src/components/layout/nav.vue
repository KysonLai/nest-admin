<template>
  <el-menu router :default-active="defaultActive" @open="handleOpen" @close="handleClose">
    <el-menu-item v-for="item in menu" :key="item.value" :index="item.value">
      <el-icon><location /></el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
let menu = [
  {
    title: '用户管理',
    value: 'user'
  },
  {
    title: '文件上传',
    value: 'file'
  }
]

let defaultActive = menu[0].value

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
