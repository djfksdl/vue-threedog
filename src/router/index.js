import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/potal/MainView.vue'
import DiaryView from '@/views/manager/DiaryView.vue'
import PetAddFormView from '@/views/mypage/PetAddFormView.vue'
import EditView from '@/views/edit/EditView.vue'
import LoginView from '@/views/potal/LoginView.vue'

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
  {
    path: '/edit',
    name: 'edit',
    component: EditView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router