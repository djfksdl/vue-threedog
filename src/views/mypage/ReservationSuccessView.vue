<template>
    <div id="wrap">
        <AppHeader />
        <div id="ReservationSuccess">
            <SideBar />
            <div class="container">
                <div class="reservationSuccess">
                    <div class="reservationSuccessHp">
                        <h1>예약완료페이지</h1>
                        <p>감사합니다. 예약이 정상적으로 완료되었습니다.</p>
                    </div>
                    <div>{{ reservationData.rtDate }}</div>
                </div>
            </div>
        </div>

        <AppFooter />
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import '@/assets/css/mypage/mypage.css'
import AppHeader from '@/components/AppHeader.vue';
import SideBar from '@/components/SideBar.vue';
import AppFooter from '@/components/AppFooter.vue';


export default {
    name: "ReservationSuccessView",
    components: {
        AppHeader,
        SideBar,
        AppFooter,
    },
    computed: {
        ...mapGetters(['reservationData'])
    },
    data() {
        return {};
    },
    methods: {},
};
</script>


<style>
.reservationSuccess {
    width: 1200px;
    /* background-color: red; */
    margin: 0 auto;
    border: 1px solid black;
}

.reservationSuccess .reservationSuccessHp {
    padding: 30px 30px;
    text-align: center;
    background-color: #236C3F;
    color: white;
}

.reservationSuccess .reservationSuccessHp p {
    color: rgb(255, 255, 255);
    margin-top: 10px;
}
</style>