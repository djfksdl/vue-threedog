<template>
    <div id="wrap">
        <AppHeader />
        <div id="ReservationSuccess">
            <SideBar />
            <div class="container">
                <div class="reservationSuccess">
                    <div class="reservationSuccessHp">
                        <img src="@/assets/images/check_date.png" style="width: 100px; margin-bottom: 10px;">
                        <h1>예약완료페이지</h1>
                        <p>감사합니다. 예약이 정상적으로 완료되었습니다.</p>
                    </div>
                    <div style=" margin-top: 30px; font-size: 18px; ">
                        <!-- <div>
                            <ul>
                                <label>가게명</label><li> {{ reservationData.title }}</li>
                                <label>가게전화번호</label><li> {{ reservationData.bPhone }}</li>
                                <label>가게 주소</label><li>{{ reservationData.bAddress }}, {{ reservationData.bdAddress }} 번지</li>
                            </ul>
                        </div> -->
                        <div>
                            <ul>
                                <li> <label>예약자성함</label>{{ this.$store.state.authUser.uName }}</li>
                                <li><label>반려견이름</label> {{ reservationData.dogName }}</li>
                                <li><label>날짜 </label>{{ reservationData.rtDate }}</li>
                                <li><label>시간</label>{{ reservationData.rtTime }}</li>
                                <li><label>사용한 포인트</label> {{ reservationData.usePoint.toLocaleString() }} 원</li>
                                <li><label>목록</label> {{ reservationData.beauty }}</li>
                                <li> <label>추가요금목록</label>{{ reservationData.beauty2 }}</li>
                                <li><label>예상가격</label> {{ reservationData.expectedPrice.toLocaleString() }} 원</li>
                            </ul>
                        </div>
                    </div>
                    <div class="routerlinkBox">
                        <div class="routerlink1">
                            <button
                                style="background-color: #236C3F; color: white; border: none; color: white;"><router-link
                                    :to="`/mypage/${this.$store.state.authUser.uNo}`">마이페이지로
                                    돌아가기</router-link></button>
                        </div>
                        <div class="routerlink2">
                            <button style="background-color: white; border: 1px solid  #236C3F;"><router-link
                                    :to="`/`">홈으로 돌아가기</router-link></button>
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
        ...mapGetters(['reservationData']),
        formattedBeauty2() {
            try {
                // 문자열을 배열로 변환
                const beauty2Array = JSON.parse(this.reservationData.beauty2);
                // 배열을 문자열로 변환 (대괄호와 따옴표 제거)
                return beauty2Array.join(', ');
            } catch (e) {
                console.error("Error parsing beauty2 data:", e);
                return this.reservationData.beauty2;
            }
        }
    },
    data() {
        return {};
    },
    methods: {},
};
</script>


<style></style>