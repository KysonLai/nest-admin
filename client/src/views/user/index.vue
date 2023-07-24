<template>
  <!-- 筛选框 -->
  <div class="flex mb-4">
    <div class="w-[300px]">
      <el-input v-model="keyword" placeholder="请输入用户ID或名称" />
    </div>
    <el-button class="ml-4" type="primary" @click.prevent="onSearch"> 搜索 </el-button>
  </div>

  <!-- 操作按钮 -->
  <el-button class="mb-4" type="primary" @click.prevent="openAddDialog()"> 新增 </el-button>

  <!-- 表格 -->
  <el-table :data="tableData" v-loading="loading" border class="w-full mb-4">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="roles" label="角色" width="180" />
    <el-table-column prop="gender" label="性别" width="180" />
    <el-table-column prop="createdTime" label="创建时间" width="180" />
    <el-table-column prop="action" label="操作">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click.prevent="openAddDialog(row)"> 编辑 </el-button>
        <el-button link type="primary" size="small" @click.prevent="onDelete(row.id)"> 删除 </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页器 -->
  <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    v-model:current-page="page"
    v-model:page-size="pageSize"
    :total="pageTotal"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />

  <!-- 新增弹窗 -->
  <AddDialog ref="addDialog" @add="onAdd" @edit="onEdit" />
</template>
<script setup>
// vue
import { reactive, ref, onMounted } from 'vue'
// api
import { getUser, delUser, addUser, updateUser } from '@/api/user'
// element
import { ElMessage } from 'element-plus'
// component
import AddDialog from './components/add-dialog.vue'

let keyword = ref('')
let loading = ref(false)
const addDialog = ref(null) // 新增弹窗
let tableData = ref([])
let page = ref(1)
let pageTotal = ref(0)
let pageSize = ref(10)

const getList = () => {
  loading.value = true

  let params = {
    page: page.value,
    page_size: pageSize.value,
    keyword: keyword.value
  }
  getUser(params)
    .then((res) => {
      let { list, total } = res
      tableData.value = list
      pageTotal = total
    })
    .finally(() => {
      loading.value = false
    })
}

// 增
const onAdd = (params) => {
  addUser(params).then((res) => {
    getList()
    ElMessage({ message: '添加成功', type: 'success' })
  })
}

// 删
const onDelete = (id) => {
  let params = {
    id
  }
  delUser(params).then((res) => {
    getList()
    ElMessage({ message: '删除成功', type: 'success' })
  })
}

// 改
const onEdit = (params) => {
  updateUser(params).then((res) => {
    getList()
    ElMessage({ message: '修改成功', type: 'success' })
  })
}

// 查
const onSearch = (i) => {
  getList()
}

const openAddDialog = (row) => {
  addDialog.value.open(row)
}

const handleSizeChange = (val) => {
  pageSize.value = val
  getList()
}
const handleCurrentChange = (val) => {
  page.value = val
  getList()
}

onMounted(() => {
  getList()
})
</script>
