<template>
    <div id="wrap">
        <AppHeader />
        <div class="reseerveContainer">

            <!-- 사이드 바 자리 -->
            <SideBar />
            <div class="container">
                <!-- 예약상세 내역 -->
                <div class="reserveCheckForm" v-bind:key="i" v-for="(reserveVo, i) in reserveList">
                    <!-- 예약정보 -->
                    <div class="rcfInfo">
                        <div>
                            <p>매장명</p>
                            <p>{{ reserveVo.title }}</p>
                        </div>
                        <div>
                            <p>펫명</p>
                            <p>{{ reserveVo.dogName }}</p>
                        </div>
                        <div>
                            <p>예약일시</p>
                            <p>{{ formatDate(reserveVo.rtDate) }} {{ formatTime(reserveVo.rtTime) }}</p>


                        </div>
                        <div>
                            <p>매장주소</p>
                            <p>{{ reserveVo.bAddress }} 번지{{ reserveVo.bdAddress }}</p>
                        </div>
                    </div>
                    <!-- 결제금액 -->
                    <div class="rcfSum">
                        <div>
                            <p>결제상품</p>
                            <p>{{ reserveVo.size }} {{ reserveVo.beauty }}</p>

                        </div>
                        <div>
                            <p>예상가격</p>
                            <p>{{ (reserveVo.expectedPrice).toLocaleString() }}</p>
                        </div>
                        <div>
                            <p>마일리지 사용</p>
                            <p>-{{ reserveVo.usePoint.toLocaleString() }}원</p>
                        </div>
                        <div>
                            <p>최종 결제 금액</p>
                            <p>{{ (reserveVo.expectedPrice + reserveVo.surcharge -
                    reserveVo.usePoint).toLocaleString() }}원</p>

                        </div>
                    </div>
                    <!-- {{ reserveVo.rNo }} -->
                    <div>
                        <!-- 취소/변경안내버튼 -->
                        <div class="rcfChange" v-if="!reserveVo.pushNo">
                            <button>
                                예약 변경/취소는 매장<span>({{ reserveVo.bPhone }})</span>으로 전화주세요.
                            </button>
                        </div>
                        <!-- 후기 작성버튼 -->
                        <div class="rrfChange" v-else-if="reserveVo.pushNo && reserveVo.rNo == 0">
                            <router-link :to="`/reviewform/${reserveVo.rsNo}`">후기 작성</router-link>
                        </div>
                        <!-- 후기 확인버튼 -->
                        <div class="rrfConfirm" v-else-if="reserveVo.rNo">
                            <router-link to="/review">후기 확인</router-link>

                        </div>
                    </div>

                </div>



            </div>
        </div>
        <AppFooter />
    </div>
</template>
<script>
import axios from "axios"
import '@/assets/css/mypage/reserve.css'
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import SideBar from "@/components/SideBar.vue"
export default {
    name: "ReserveView",
    components: {
        AppHeader,
        AppFooter,
        SideBar
    },
    data() {
        return {
            reserveList: [],
            reserveVo: {
                rsNo: 0,
                dogNo: 0,
                rtNo: 0,
                expectedPrice: 0,
                surcharges: 0,
                rtDate: "",
                rtTime: "",
                rtFinish: false,
                bNo: 0,
                bAddress: "",
                bdAddress: "",
                bPhone: "",
                title: "",
                uNo: this.$route.params.uNo,
                dogName: "",
                uPoint: "",
                pNo: 0,
                pDiv: false,
                rsNum: 0, //rsNo
                usePoint: 0,
                size: "",
                rNo: 0,
            },
            pushVo: {
                pushNo: 0,
                rsNo: 0,
                pushTime: "",
            }

        };
    },

    computed: {
    },
    methods: {
        getReserveList() {
            console.log("예약내역 가져오기");

            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/reservationlist`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { uNo: this.reserveVo.uNo },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("예약내역 불러오기 성공");
                console.log(response.data.apiData); //수신데이타
                this.reserveList = response.data.apiData;

                console.log(this.reserveList);
            }).catch(error => {
                console.log(error);
            });
        },
        formatDate(date) {
            if (!date) return ''; // date가 없는 경우 빈 문자열 반환
            const formattedDate = new Date(date);
            const year = formattedDate.getFullYear();
            const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
            const day = String(formattedDate.getDate()).padStart(2, '0');
            return `${year}년 ${month}월 ${day}일`;
        },
        formatTime(time) {
            if (!time) return ''; // time이 없는 경우 빈 문자열 반환
            const [hours, minutes] = time.split(':');
            return `${hours}:${minutes}`;
        },


    },


    created() {
        this.getReserveList();

    }
};
</script>
<style></style>