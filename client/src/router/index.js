import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/components/404.vue')
  },
  {
    path: '/feature',
    name: 'feature',
    redirect: { name: 'user' },
    component: () => import('@/components/layout/index.vue'),
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/index.vue')
      },
      {
        path: 'file',
        name: 'file',
        component: () => import('@/views/file/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
