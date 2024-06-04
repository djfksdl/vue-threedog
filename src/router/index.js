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
import ReservationFormView from '@/views/mypage/ReservationFormView.vue'
import ReviewView from '@/views/mypage/ReviewView.vue'
import ReserveView from '@/views/mypage/ReserveView.vue'
import MypageView from '@/views/mypage/MypageView.vue'
import SearchView from '@/views/potal/SearchView.vue'
import EditFormView from '@/views/edit/EditFormView.vue'
import ScheduleView from '@/views/manager/ScheduleView.vue'
import NaverLogin from '@/views/potal/NaverLogin.vue'
import SearchMap from '@/views/potal/SearchMap.vue'
import InsertTime from '@/views/manager/InsertTime.vue'
import ReservationSuccessView from '@/views/mypage/ReservationSuccessView.vue'
import PetUpdateForm from '@/views/mypage/PetUpdateForm'


const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/diary',
    name: 'diary',
    component: DiaryView
  },
  {
    path: '/petaddform',
    name: 'petaddform',
    component: PetAddFormView
  },
  {
    path: '/edit/:bNo',
    name: 'editForOwner',
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
    path: '/reviewform/:rsNo',
    name: 'reviewform',
    component: ReviewFormView
  },
  {
    path: '/totalsales',
    name: 'totalsales',
    component: TotalSalesView
  },
  {
    path: '/mydiary',
    name: 'mydiary',
    component: MyDiaryView
  },
  {
    path: '/reservationform',
    name: 'reservationform',
    component: ReservationFormView
  },
  {
    path: '/review/:bNo',
    name: 'review',
    component: ReviewView
  },
  {
    path: '/reserve/:uNo',
    name: 'reserve',
    component: ReserveView
  },
  {
    path: '/mypage/:uNo',
    name: 'mypage',
    component: MypageView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/editform/:bNo',
    name: 'editform',
    component: EditFormView
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: ScheduleView
  },
  {
    path: '/naverlogin',
    name: 'naverlogin',
    component: NaverLogin
  },
  {
    path: '/searchmap',
    name: 'searchmap',
    component: SearchMap
  },
  {
    path: '/inserttime/:bNo',
    name: 'insertTime',
    component: InsertTime
  },
  {
    path: '/reservationsuccess',
    name: 'ReservationSuccessView',
    component: ReservationSuccessView

  },
  {
    path: '/petupdateform/:dogNo',
    name: 'petupdateform',
    component: PetUpdateForm,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router