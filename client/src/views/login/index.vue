<template>
  <div>
    <img :src="bg" class="wave" />
  </div>
  <div class="login-container">
    <div class="img">
      <img :src="illustration" />
    </div>
    <div class="login-box">
      <div class="login-form">
        <img :src="avatar" class="avatar" />
        <el-form v-if="currentPage === 0" ref="ruleFormRef" :model="ruleForm" :rules="loginRules" size="large">
          <el-form-item prop="username">
            <!-- :prefix-icon="useRenderIcon(User)" -->
            <el-input clearable v-model="ruleForm.username" placeholder="账号" />
          </el-form-item>
          <!--  :prefix-icon="useRenderIcon(Lock)" -->
          <el-form-item prop="password" placeholder="password">
            <el-input clearable show-password v-model="ruleForm.password" />
          </el-form-item>
          <el-form-item>
            <el-button
              class="w-full mt-4"
              size="default"
              type="primary"
              :loading="loading"
              @click="onSignin(ruleFormRef)"
            >
              登录
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="w-full" size="default" type="primary" :loading="loading" @click="onSignup(ruleFormRef)">
              注册
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup>
// utils
import { loginRules } from './utils/rule'
import { setToken } from '@/utils/auth'

// assets
import bg from '@/assets/login/bg.png'
import avatar from '@/assets/login/avatar.svg'
import illustration from '@/assets/login/illustration.svg?component'

// vue
import { ref, toRaw, reactive, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

// api
import { signin, signup } from '@/api/auth'

// element
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'Login'
})

const loading = ref(false)
const ruleForm = reactive({
  username: 'admin',
  password: 'admin123',
  verifyCode: ''
})

const currentPage = computed(() => {
  return 0
  // return useUserStoreHook().currentPage;
})

const router = useRouter()

const onSignup = async (formEl) => {
  loading.value = true

  let params = {
    username: ruleForm.username,
    password: ruleForm.password
  }
  signup(params)
    .then((res) => {
      ElMessage({ message: '注册成功', type: 'success' })
    })
    .finally(() => {
      loading.value = false
    })
  // getLogin(params)
  //   .then((res) => {
  //     console.log('res: ', res)
  //   })
  //   .finally(() => {
  //     loading.value = false
  //   })

  // if (!formEl) return;
  // await formEl.validate((valid, fields) => {
  //   if (valid) {
  //     useUserStoreHook()
  //       .loginByUsername({ username: ruleForm.username, password: "admin123" })
  //       .then(res => {
  //         if (res.success) {
  //           // 获取后端路由
  //           initRouter().then(() => {
  //             router.push("/");
  //             message("登录成功", { type: "success" });
  //           });
  //         }
  //       });
  //   } else {
  //     loading.value = false;
  //     return fields;
  //   }
  // });
}

const onSignin = async (formEl) => {
  loading.value = true

  let params = {
    username: ruleForm.username,
    password: ruleForm.password
  }
  signin(params)
    .then((res) => {
      let { access_token } = res
      setToken({ access_token })
      router.push('/feature')
      ElMessage({ message: '登录成功', type: 'success' })
    })
    .finally(() => {
      loading.value = false
    })
  // if (!formEl) return;
  // await formEl.validate((valid, fields) => {
  //   if (valid) {
  //     useUserStoreHook()
  //       .loginByUsername({ username: ruleForm.username, password: "admin123" })
  //       .then(res => {
  //         if (res.success) {
  //           // 获取后端路由
  //           initRouter().then(() => {
  //             router.push("/");
  //             message("登录成功", { type: "success" });
  //           });
  //         }
  //       });
  //   } else {
  //     loading.value = false;
  //     return fields;
  //   }
  // });
}
</script>
<style lang="scss" scoped>
.wave {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: -1;
  height: 100%;
}

.login-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 18rem;
  width: 100vw;
  height: 100vh;
  padding: 0 2rem;

  .img {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
      width: 500px;
    }
  }

  .avatar {
    width: 350px;
    height: 80px;
    margin-bottom: 32px;
  }

  .login-box {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .login-form {
    width: 360px;
  }
}

@media screen and (width <= 1180px) {
  .login-container {
    grid-gap: 9rem;
  }

  .login-form {
    width: 290px;
  }

  .login-form h2 {
    margin: 8px 0;
    font-size: 2.4rem;
  }

  .img img {
    width: 360px;
  }

  .avatar {
    width: 280px;
    height: 80px;
  }
}

@media screen and (width <= 968px) {
  .wave {
    display: none;
  }

  .img {
    display: none;
  }

  .login-container {
    grid-template-columns: 1fr;
  }

  .login-box {
    justify-content: center;
  }
}
</style>
