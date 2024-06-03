<template>
    <div id="wrap">
        <AppHeader />
        <!-- 사이드 바 자리 -->
        <SideBar />
        <div class="mypageContainer">
            <div class="container">
                <!-- 예약 내역 -->
                <div class="mpReserveConfirmContainer">
                    <!-- 예약내역 윗부분 -->
                    <div class="mprcTop">
                        <h2>예약내역</h2>
                        <router-link to="/reserve">더보기 +</router-link>
                    </div>
                    <!-- 예약내역 내용 -->
                    <div class="mprcContents">
                        <router-link to="/reserve">
                            <div>
                                <p>매장명</p>
                                <p>{{ reserveVo.title }}</p>
                            </div>
                            <div>
                                <p>이용펫명</p>
                                <p>{{ reserveVo.dogName }}</p>
                            </div>
                            <div>
                                <p>예약일시</p>
                                <p>{{ formattedRtDate }} {{ formattedRtTime }}</p>
                            </div>
                            <div>
                                <p>금액</p>
                                <p>{{ totalPrice.toLocaleString() }} 원</p>
                            </div>
                        </router-link>
                    </div>
                </div>

                <!-- 후기 -->
                <div class="mpReviewConfirmContainer">
                    <!-- 후기 윗부분 -->
                    <div class="mprvcTop">
                        <h2>내가 쓴 후기</h2>
                        <router-link to="/review">더보기 +</router-link>
                    </div>
                    <!-- 후기 내용 -->
                    <div class="mprvcContents">
                        <!-- 후기내용 예약정보부분 -->
                        <div class="mprvcContentsInfo">
                            <!-- 사진 -->
                            <img src="@/assets/images/spy2.jpg" alt="">
                            <div>
                                <!-- 이용정보 -->
                                <div class="mprvcContentsInfos">
                                    <!-- 후기사진 -->
                                    <p><span>매장명 </span> {{ reviewVo.title }}</p>
                                    <p><span>이용펫 </span> {{ reviewVo.dogName }}</p>
                                    <p><span>가격 </span> {{ totalPrice2.toLocaleString() }} 원</p>
                                </div>
                                <!-- 별점 -->
                                <div class="star-rating">
                                    <div class="star">
                                        <div class="star" style="margin-top: 2px;">
                                            <!-- Full stars -->
                                            <span v-for="i in Math.floor(reviewVo.star)" :key="i"
                                                style="padding: none;"><img src="@/assets/images/star_yellow.jpg"
                                                    style="width: 15px;"></span>
                                            <!-- Half star -->
                                            <!-- Empty stars -->
                                            <span v-for="i in 5 - Math.ceil(reviewVo.star)" :key="'empty_' + i"><img
                                                    src="@/assets/images/star_gray.jpg" style="width: 15px;"></span>
                                            <!-- {{ reviewVo.star }}.0 -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 후기내용 내가 쓴부분 -->
                        <div class="mprvcContentsMine">
                            <p>
                                {{ reviewVo.rContent }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- 알림장 -->
                <div class="mpDiaryConfirmContainer">
                    <!-- 알림장 윗부분 -->
                    <div class="mpdcTop">
                        <h2>알림장</h2>
                        <router-link to="/mydiary">더보기 +</router-link>
                    </div>
                    <!-- 알림장 내용 -->
                    <div class="mpdcContents">
                        <!-- 알림장 사진 -->
                        <div class="mpdcImg">
                            <img src="@/assets/images/spy2.jpg">
                        </div>
                        <!-- 알림장 내용 -->
                        <div class="mpdcInfo1">
                            <p><span>이용일 :</span> 2024년05월13일</p>
                            <p><span>이용펫 :</span> 보리</p>
                            <p><span>미용예절 :</span> 아주 잘 했어요.</p>
                            <p><span>컨디션 :</span> 좋아요</p>
                            <p><span>엉킴(부위) :</span> 없어요.</p>
                            <p><span>싫어했던 부위 :</span> 배, 뒷다리</p>
                            <p><span>목욕/드라이 :</span> 매우 싫어해요.</p>
                        </div>
                        <div class="mpdcInfo2">
                            <p><span>추가요금 :</span> 없어요.</p>
                            <p><span>전달사항 :</span>
                                출근길 스프링클러가 동파되면서 지하철역이 한바탕 아수라장으로 변했고, 한강물은 곳곳이 꽁꽁 얼었습니다.
                                입구에는 고드름이 주렁주렁 맺혔고, 바닥은 미끄러운 빙판으로 변했습니다.
                                오늘(27일) 오전 6시쯤, 지하철 3호선 화정역 천장에서 스프링클러가 동파됐습니다.
                                갑자기 천장에서 다량의 물이 쏟아지며 출근길 시민들이 큰 불편을 겪었습니다.
                                꽁꽁 얼어붙은 한강 위로 고양이가 걸어다닙니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TopButton />
        <AppFooter />
    </div>
</template>
<script>
import axios from "axios"
import '@/assets/css/mypage/reserve.css'
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import SideBar from "@/components/SideBar.vue"
import TopButton from "@/components/TopButton.vue"

export default {
    name: "MypageView",
    components: {
        AppHeader,
        AppFooter,
        SideBar,
        TopButton
    },
    data() {
        return {
            reserveVo: {
                rsNo: 0,
                dogNo: 0,
                rtNo: 0,
                uNo: this.$store.state.authUser.uNo,
                expectedPrice: 0,
                bNo: 0,
                rtDate: "",
                rtTime: "",
                dogName: "",
                title: "",
                surcharge: 0,
            },
            reviewVo: {
                title: "",
                dogNo: 0,
                expectedPrice: 0,
                surcharge: 0,
                bNo: 0,
                rNo: 0,
                uNo: this.$store.state.authUser.uNo,
                rsNo: 0,
                rContent: "",
                rDate: "",
                views: 0,
                riNo: 0,
                star: 0,
                dogName: "",

            },

        };
    },
    computed: {
        totalPrice() {
            return this.reserveVo ? this.reserveVo.expectedPrice + this.reserveVo.surcharge : 0;
        },
        totalPrice2() {
            return this.reviewVo ? this.reviewVo.expectedPrice + this.reviewVo.surcharge : 0;
        },
        formattedRtDate() {
            if (!this.reserveVo) return '';
            const date = new Date(this.reserveVo.rtDate);
            return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
        },
        formattedRtTime() {
            if (!this.reserveVo || !this.reserveVo.rtTime) return '';
            const time = this.reserveVo.rtTime;
            const [hours, minutes] = time.split(':');
            return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
        }
    },
    methods: {
        getReverve() {
            console.log("예약내역 불러오기");

            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/reserve`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { uNo: this.reserveVo.uNo },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("예약내역 불러오기 성공");
                console.log(response.data.apiData); //수신데이타
                this.reserveVo = response.data.apiData;

            }).catch(error => {
                console.log(error);
            });
        },
        getReview() {
            console.log("내가쓴후기 불러오기");
            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/review`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { uNo: this.reviewVo.uNo },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("예약내역 불러오기 성공");
                console.log(response.data.apiData); //수신데이타
                this.reviewVo = response.data.apiData;

            }).catch(error => {
                console.log(error);
            });
        },
        getDiary() {
            console.log("알림장불러오기");
        }
    },
    created() {
        this.getReverve();
        this.getReview();
        this.getDiary();
    }
};
</script>
<style></style>