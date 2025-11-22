import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login.vue'),
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/auth.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/HomePage.vue'),
      redirect: '/home/newchat',
      children: [
        {
          path: 'newchat',
          name: 'NewChat',
          component: () => import('@/components/NewChat/index.vue'),
        },
        {
          path: 'result',
          name: 'Result',
          component: () => import('@/components/ResultShow/index.vue'),
        },
      ],
    },
  ],
})

export default router
