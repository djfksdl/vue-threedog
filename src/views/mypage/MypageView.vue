<template>
    <div id="wrap">
        <AppHeader />
        <div class="mypageContainer">
            <!-- 사이드 바 자리 -->
            <div class="container">
                <!-- 예약 내역 -->
                <div class="mpReserveConfirmContainer">
                    <!-- 예약내역 윗부분 -->
                    <div class="mprcTop">
                        <h2>예약내역</h2>
                        <router-link to="/reserve">더보기 +</router-link>
                    </div>
                    <!-- 예약내역 내용 -->
                    <div class="mprcContents" >
                        <router-link to="/reserve">
                            <div>
                                <p>매장명</p>
                                <p>하이미디어</p>
                            </div>
                            <div>
                                <p>이용펫명</p>
                                <p>보리</p>
                            </div>
                            <div>
                                <p>예약일시</p>
                                <p>2024년 05월 13일 14시~16시</p>
                            </div>
                            <div>
                                <p>금액</p>
                                <p>23,000원</p>
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
                    <div class="mprvcContents" >
                        <!-- 후기내용 예약정보부분 -->
                        <div class="mprvcContentsInfo">
                            <!-- 사진 -->
                            <img src="@/assets/images/spy2.jpg" alt="">
                            <div>
                                <!-- 이용정보 -->
                                <div class="mprvcContentsInfos">
                                    <!-- 후기사진 -->
                                    <p><span>매장명 </span> 하이미디어</p>
                                    <p><span>이용펫 </span> 보리</p>
                                    <p><span>가격 </span> 23,000원</p>
                                </div>
                                <!-- 별점 -->
                                <div class="star-rating">
                                    <div class="star">
                                        <span class="yellowStar"><img src="@/assets/images/star_yellow.jpg"></span>
                                        <span class="yellowStar"><img src="@/assets/images/star_yellow.jpg"></span>
                                        <span class="yellowStar"><img src="@/assets/images/star_yellow.jpg"></span>
                                        <span class="yellowStar"><img src="@/assets/images/star_yellow.jpg"></span>
                                        <span class="grayStar"><img src="@/assets/images/star_gray.jpg"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 후기내용 내가 쓴부분 -->
                        <div class="mprvcContentsMine">
                            <p>
                                갑자기 천장에서 다량의 물이 쏟아지며 출근길 시민들이 큰 불편을 겪었습니다.
                                꽁꽁 얼어붙은 한강 위로 고양이가 걸어다닙니다.
                                돌을 던져봐도 끄떡없습니다.
                                41년 만에 가장 추웠던 어제보다는 기온이 조금 올랐지만, 서울의 오늘 최저기온도 영하 13도 가까이 떨어졌습니다.
                                주택가 골목길 곳곳엔 빙판길이 만들어졌습니다.
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
                    <div class="mpdcContents" >
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
        <AppFooter />
    </div>
 </template>
 <script>
 import '@/assets/css/mypage/reserve.css'
 import AppHeader from "@/components/AppHeader.vue"
 import AppFooter from "@/components/AppFooter.vue"
 export default {
    name: "MypageView",
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {};
    },
    methods: {},
    created(){}
 };
 </script>
 <style></style>