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
                    <ul>
                        <li>{{ reservationData.saveName }}</li>
                        <li>가게명 {{ reservationData.title }}</li>
                        <li>가게전화번호 {{ reservationData.bPhone }}</li>
                        <li>가게 주소{{ reservationData.bAddress }}</li>
                        <li>{{ reservationData.bdAddress }}</li>
                        <li>예약자성함 {{ this.$store.state.authUser.uName }}</li>
                        <li>반려견이름 {{ reservationData.dogName }}</li>
                        <li>날짜 {{ reservationData.rtDate }}</li>
                        <li>시간 {{ reservationData.rtTime }}</li>
                        <li>사용한 포인트 {{ reservationData.usePoint.toLocaleString() }} 원</li>
                        <li>목록 {{ reservationData.beauty }}</li>
                        <!-- <li>몸무게 {{ reservationData.weightDiv }}</li> -->
                        <li>추가요금목록 {{ reservationData.beauty2 }}</li>
                        <li>예상가격 {{ reservationData.expectedPrice.toLocaleString() }} 원</li>
                    </ul>
                    <div class="routerlinkBox">
                        <div class="routerlink1">
                            <button><router-link :to="`/mypage/${this.$store.state.authUser.uNo}`">마이페이지로 돌아가기</router-link></button>
                        </div>
                        <div class="routerlink2">
                            <button><router-link :to="`/`">홈으로 돌아가기</router-link></button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
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


<style></style>