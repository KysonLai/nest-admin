<template>
  <el-dialog
    title="标题"
    width="700px"
    v-model="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @close="close"
  >
    <el-form size="small" label-width="150px">
      <el-form-item label="内容"> </el-form-item>
    </el-form>

    <template #footer>
      <div class="text-right">
        <el-button class="w120" size="small" plain @click="close"> 取 消 </el-button>
        <el-button class="w120" type="primary" size="small" :loading="loading" @click="submit"> 确 定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'DialogTemplate'
})

const loading = ref(false)
const visible = ref(false)

const reset = () => {}
const init = () => {}

const close = () => {
  visible.value = false
  reset()
}

const open = () => {
  visible.value = true
  init()
}

const submit = () => {}

defineExpose({
  open
})
</script>
<style lang="scss" scoped>
.el-button {
  padding: 14px 42px;
}
</style>
