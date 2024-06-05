import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/storage"
import { useKakao } from 'vue3-kakao-maps/@utils';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

window.Kakao.init("cc117c6a33aaf46b90fc5b309a9912d1"); //카카오 로그인 자바스크립트 키
useKakao('c0e61a675067767007fc527e42495678'); //카카오 지도
createApp(App).use(router)
    .use(store)
    .use(router)
    .component('VueDatePicker', VueDatePicker)
    .mount('#app');