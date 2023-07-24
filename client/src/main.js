import { createApp } from 'vue'
import App from './app.vue'

// css
import './style/main.scss'
// import './style/common.scss'

// router
import router from './router'

// element
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})

// element-plus-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
