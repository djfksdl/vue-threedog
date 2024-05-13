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
                        <h3>예약내역</h3>
                        <router-link to="/reserve">더보기 +</router-link>
                    </div>
                    <!-- 예약내역 내용 -->
                    <div class="mprcContents" >
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
                            <p>2024년 05월 13일 14시~16시</p>
                        </div>
                        <div>
                            <p>금액</p>
                            <p>23,000원</p>
                        </div>
                    </div>
                </div>

                <!-- 후기 -->
                <div class="mpReviewConfirmContainer">
                    <!-- 후기 윗부분 -->
                    <div class="mprvcTop">
                        <h3>내가 쓴 후기</h3>
                        <router-link to="">더보기 +</router-link>
                    </div>
                    <!-- 후기 내용 -->
                    <div class="mprvcContents" >
                        <!-- 후기내용 예약정보부분 -->
                        <div class="mprvcContentsInfo">
                            
                            <!-- 이용정보 -->
                            <div class="mprvcContentsInfos">
                                <img src="@/assets/images/spy2.jpg" alt="">
                                <!-- 후기사진 -->
                                <p><span>매장명 :</span> 하이미디어</p>
                                <p><span>이용펫:</span> 보리</p>
                                <p><span>가격:</span> 23,000원</p>
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
                        <!-- 후기내용 내가 쓴부분 -->
                        <div class="mprvcContentsMine">
                            <p>
                                Let's get it Look at it Pay attention
                                얼어붙은 맘 어디 깨볼까? 놀라버렸던 네 심장 말이야
                                맘에 들었어 넌 그냥 Say yes 내가 널 부르면 “얼음 땡”
                                (Da da da dun dun) 널 노리는 내 두 눈
                                숨을 죽인 그다음 한 발 낮춘 attitude 
                                때를 기다리는 pose 어둠 속 빛난 tiger eyes
                                날 감춘 채로 다가가 새빨간 말로 홀려 놔
                                방심한 순간 claw 우린 더 높이
                                하늘에 닿을 것처럼 외쳐 너를 깨워
                                올려 봐 노려봐 넌 내 거니까 다
                                자꾸 널 보면 탐이 탐이 나
                                해야 해야 해야 한입에 널 삼킬 때야
                            </p>
                        </div>
                    </div>
                </div>

                <!-- 알림장 -->
                <div class="mpDiaryConfirmContainer">
                    <!-- 알림장 윗부분 -->
                    <div class="mpdcTop">
                        <h3>알림장</h3>
                        <router-link to="">더보기 +</router-link>
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
                            <p><span>미용예절 :</span> 아주 잘 했어요. 칭찬해주세요.</p>
                            <p><span>컨디션 :</span> 좋아요</p>
                            <p><span>엉킴(부위) :</span> 없어요.</p>
                            <p><span>싫어했던 부위 :</span> 배, 뒷다리</p>
                            <p><span>목욕/드라이 :</span> 매우 싫어해요.</p>
                        </div>
                        <div class="mpdcInfo2">
                            <p><span>추가요금 :</span> 없어요.</p>
                            <p><span>전달사항 :</span> 
                                한입에 널 삼킬 때야
                                (탐이 탐이 나)
                                해야 해야 해야
                                이미 내가 이긴 패야
                                (널 보면 탐이 탐이 나)
                                해야 해야 해야
                                뜨겁게 떠오르는 해야
                                별안간 홀린 그 순간 Bite
                                단 한 번에 난 널 휘리휘리 Catch ya
                                더 높이 Keep it up
                                Uh huh
                                Happily ever after? Nope!
                                (Da da da dun dun)
                                못 기다린대 못 돼버린 내 맘이
                                겁 따윈 없는 척하지 마 너 감히
                                멀어져 넌 가니
                                어차피 한 입 거리 (Hey)
                                옳지 착하지 더 이리이리 오렴
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