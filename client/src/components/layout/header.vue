<template>
  <div class="box">
    <!-- <button @click="toggleDark()">
      <i inline-block align-middle i="dark:carbon-moon carbon-sun" />
      <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
    </button> -->
    <img class="avatar-img" src="@/assets/main/avatar.jpg" />
    <span class="ml-2 cursor-pointer">admin</span>
  </div>
</template>
<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
// console.log('isDark: ', isDark)
const toggleDark = useToggle(isDark)
</script>

<style lang="scss" scoped>
.box {
  right: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.avatar-img {
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 50%;
}
</style>
