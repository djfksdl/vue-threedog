import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/potal/MainView.vue'
import DiaryView from '@/views/manager/DiaryView.vue'
import PetAddFormView from '@/views/mypage/PetAddFormView.vue'
import EditView from '@/views/edit/EditView.vue'
import LoginView from '@/views/potal/LoginView.vue'
import ManagerLoginView from '@/views/potal/ManagerLoginView.vue'
import SignView from '@/views/potal/SignView.vue'
import ManagerSignView from '@/views/potal/ManagerSignView.vue'
import ReviewFormView from '@/views/mypage/ReviewFormView.vue'
import TotalSalesView from '@/views/manager/TotalSalesView.vue'
import MyDiaryView from '@/views/mypage/MyDiaryView.vue'

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
  {
    path: '/mlogin',
    name: 'mlogin',
    component: ManagerLoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignView
  },
  {
    path: '/msignup',
    name: 'msignup',
    component: ManagerSignView
  },
  {
    path: '/reviewform',
    name: 'reviewform',
    component: ReviewFormView
  },
  {
    path: '/totalsales',
    name: 'totalsales',
    component:TotalSalesView
  },
  {
    path: '/mydiary',
    name: 'mydiary',
    component:MyDiaryView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router