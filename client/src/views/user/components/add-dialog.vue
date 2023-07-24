<template>
  <el-dialog
    :title="isEdit ? '编辑' : '添加'"
    width="700px"
    v-model="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @close="close"
  >
    <el-form :model="form" label-width="60px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
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
import { ref, reactive, computed } from 'vue'
import { isEmpty } from '@/utils/index.js'

defineOptions({
  name: 'DialogTemplate'
})

const loading = ref(false)
const visible = ref(false)
const actionType = ref('add')
const init_form = {
  username: '',
  password: ''
}
const form = reactive({ ...init_form })
const isEdit = computed(() => {
  return actionType.value == 'edit'
})

const open = (row) => {
  visible.value = true
  init(row)
}

const close = () => {
  visible.value = false
  reset()
}

const init = (row) => {
  actionType.value = isEmpty(row) ? 'add' : 'edit'
  Object.assign(form, row)
}

const reset = () => {
  Object.assign(form, init_form)
}

const emit = defineEmits(['add', 'edit'])
const submit = () => {
  let { username, password, id } = form
  let params = {
    username,
    password
  }

  if (isEdit) {
    Object.assign(params, { id })
  }

  emit(actionType.value, params)
  close()
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped>
.el-button {
  padding: 14px 42px;
}
</style>
