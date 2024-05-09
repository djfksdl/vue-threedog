import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/potal/MainView.vue'
import DiaryView from '@/views/manager/DiaryView.vue'
import PetAddFormView from '@/views/mypage/PetAddFormView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/diary',
    name: 'diary',
    component:DiaryView
  },
  {
    path: '/petaddform',
    name: 'petaddform',
    component:PetAddFormView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router