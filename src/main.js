import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/storage"
import { useKakao } from 'vue3-kakao-maps/@utils';

useKakao('57e9df8ad65dc994e5c28c552418428b');
createApp(App).use(router)
    .use(store)
    .use(router)
    .mount('#app');