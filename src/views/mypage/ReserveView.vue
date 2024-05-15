<template>
    <div id="wrap">
        <AppHeader />
        <div class="reseerveContainer">
            
            <!-- 사이드 바 자리 -->
            <SideBar />
            <div class="container">
                <!-- 예약상세 내역 -->
                <div class="reserveCheckForm">
                    <!-- 예약정보 -->
                    <div class="rcfInfo">
                        <div>
                            <p>매장명</p>
                            <p>하이미디어</p>
                        </div>
                        <div>
                            <p>펫명</p>
                            <p>마리</p>
                        </div>
                        <div>
                            <p>예약일시</p>
                            <p>2024년 05월 13일 14시 ~ 16시</p>
                        </div>
                        <div>
                            <p>매장주소</p>
                            <p>서울특별시 강남구 역삼동 123번지</p>
                        </div>
                    </div>
                    <!-- 결제금액 -->
                    <div class="rcfSum">
                        <div>
                            <p>결제상품</p>
                            <p>소형견 전체미용</p>
                        </div>
                        <div>
                            <p>마일리지 사용</p>
                            <p>-1,000원</p>
                        </div>
                        <div>
                            <p>최종 결제 금액</p>
                            <p>23,000원</p>
                        </div>
                    </div>
                    <!-- 취소/변경안내버튼 -->
                    <div class="rcfChange">
                        <button>
                            예약 변경/취소는 매장<span>(02-1234-5678)</span>으로 전화주세요.
                        </button>
                    </div>
                </div>

                <!-- 후기 쓸 폼 -->
                <div class="reserveReviewForm">
                    <!-- 예약정보 -->
                    <div class="rrfInfo">
                        <div>
                            <p>매장명</p>
                            <p>하이미디어</p>
                        </div>
                        <div>
                            <p>펫명</p>
                            <p>보리</p>
                        </div>
                        <div>
                            <p>예약일시</p>
                            <p>2024년 04월 10일 14시 ~ 16시</p>
                        </div>
                        <div>
                            <p>매장주소</p>
                            <p>서울특별시 강남구 역삼동 123번지</p>
                        </div>
                    </div>
                    <!-- 결제금액 확인 -->
                    <div class="rrfSum">
                        <div>
                            <p>최종 결제 금액</p>
                            <p>23,000원</p>
                        </div>
                    </div>
                    <!-- 후기 작성버튼 -->
                    <div class="rrfChange">
                        <router-link to="reviewform">후기 작성</router-link>
                    </div>
                </div>

                <!-- 후기 보기 폼 -->
                <div class="reserveReviewConfirmForm">
                    <!-- 예약정보 -->
                    <div class="rrfcInfo">
                        <div>
                            <p>매장명</p>
                            <p>하이미디어</p>
                        </div>
                        <div>
                            <p>펫명</p>
                            <p>마리</p>
                        </div>
                        <div>
                            <p>예약일시</p>
                            <p>2024년 03월 08일 14시 ~ 16시</p>
                        </div>
                        <div>
                            <p>매장주소</p>
                            <p>서울특별시 강남구 역삼동 123번지</p>
                        </div>
                    </div>
                    <!-- 결제금액 확인 -->
                    <div class="rrfcSum">
                        <div>
                            <p>최종 결제 금액</p>
                            <p>23,000원</p>
                        </div>
                    </div>
                    <!-- 후기 확인버튼 -->
                    <div class="rrfConfirm">
                        <router-link to="/review">후기 확인</router-link>
                    </div>
                </div>
            </div>
        </div>
        <AppFooter />
    </div>
 </template>
 <script>
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
        return {};
    },
    methods: {},
    created(){}
 };
 </script>
 <style></style>