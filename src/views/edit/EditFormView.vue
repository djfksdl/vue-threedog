<template>
    <div id="wrap">
        <ManagerHeader />
          <div class="container2">
            <!-- 타이틀 -->
            <div class="eTitle">
                <input type="text" placeholder="타이틀">
                <input type="text" placeholder="부제목 들어갈 곳">
            </div>

            <!-- 이미지 슬라이드 -->
            <input type="file" class="eFileAddBtn">
            <div class="eImgSlide wrapper-slide">
                <Carousel :autoplay="5000" :wrap-around="true" :show-arrows="false" ref="carouselRef">
                    <Slide v-for="slide in slides" :key="slide">
                        <div class="img-slide">
                            <img class="slideImg" :src="slide" />
                        </div>
                    </Slide>
                    <template #addons>
                        <!-- <Navigation /> -->
                        <Pagination />
                    </template>
                </Carousel>
                <div class="arrow left" @click="prevSlide">
                    <i class="fas fa-chevron-left"></i>
                </div>
                <div class="arrow right" @click="nextSlide">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
            <!-- 중간내용부분 -->
            <div class="eMidContainer">

                <!-- 미용사진 -->
                <div class="eCutImgContainer">
                    <h1>미용사진</h1>
                    <div class="eCutSlide">
                        <img src="@/assets/images/dog.jpg">
                        <img src="@/assets/images/dog.jpg">
                        <img src="@/assets/images/spy.jpg">
                        <img src="@/assets/images/dog.jpg">
                        <img src="@/assets/images/dog.jpg">
                        <img src="@/assets/images/dog.jpg">
                    </div>
                </div>

                <!-- 디자이너 소개 -->
                <div class="eDesignerSlideContainer">
                    <h1>디자이너 소개</h1>
                    <div class="eDesignerContentsBox">
                        <!-- 디자이너소개 왼쪽 -->
                        <div class="eDLeftBox">
                            <h2>이서현 원장</h2>
                            <div class="eCareerBox">
                                <h3>경력</h3>
                                <p>- 2000년 애견미용 입문</p>
                                <p>- 전 애견미용 학원강사</p>
                                <p>- 2000년 애견미용 입문</p>
                                <p>- 2000년 애견미용 입문</p>
                                <p>- 2000년 애견미용 입문</p>
                                <p>- 2000년 애견미용 입문</p>
                            </div>
                        </div>
                        <!-- 디자이너소개 오른쪽 -->
                        <div class="edRightBox">
                            <img src="@/assets/images/profile.png">
                        </div>
                    </div>
                </div>

                <!-- 가격 + 후기 -->
                <div class="ePriceReviewContainer">
                    <!-- 가격 -->
                    <div class="ePriceBox">
                        <h1>가격</h1>
                        <table border="1">
                            <!-- 소형견 -->
                            <tr>
                                <th colspan="7" class="eNonBorder">소형견(말티즈, 요크셔, 시츄, 푸들 등...)</th>
                            </tr>
                            <tr>
                                <th>몸무게</th>
                                <th>목욕</th>
                                <th>부분</th>
                                <th>목욕+부분</th>
                                <th>얼굴+부분+목욕</th>
                                <th colspan="2">기본전체미용</th>
                            </tr>
                            <tr>
                                <th>2kg이하</th>
                                <td>12,000</td>
                                <td>12,000</td>
                                <td>15,000</td>
                                <td>20,000</td>
                                <td colspan="2">25,000</td>
                            </tr>
                            <tr>
                                <th>2kg~5kg</th>
                                <td>15,000</td>
                                <td>15,000</td>
                                <td>20,000</td>
                                <td>25,000</td>
                                <td colspan="2">30,000</td>
                            </tr>
                            <tr>
                                <th>5kg~8kg</th>
                                <td>20,000</td>
                                <td>20,000</td>
                                <td>25,000</td>
                                <td>30,000</td>
                                <td colspan="2">35,000</td>
                            </tr>
                            <tr>
                                <th>8kg~10kg</th>
                                <td>25,000</td>
                                <td>25,000</td>
                                <td>30,000</td>
                                <td>35,000</td>
                                <td colspan="2">40,000</td>
                            </tr>
                            <!-- 중형견 -->
                            <tr>
                                <th colspan="7" class="eNonBorder">중형견(슈나, 코카 등...)</th>
                            </tr>
                            <tr>
                                <th>5kg이하</th>
                                <td>20,000</td>
                                <td>20,000</td>
                                <td>25,000</td>
                                <td>30,000</td>
                                <td colspan="2">35,000</td>
                            </tr>
                            <tr>
                                <th>5kg~8kg</th>
                                <td>25,000</td>
                                <td>25,000</td>
                                <td>30,000</td>
                                <td>35,000</td>
                                <td colspan="2">40,000</td>
                            </tr>
                            <tr>
                                <th>8kg~10kg</th>
                                <td>30,000</td>
                                <td>30,000</td>
                                <td>35,000</td>
                                <td>40,000</td>
                                <td colspan="2">45,000</td>
                            </tr>
                            <tr>
                                <th>10kg~12kg</th>
                                <td>35,000</td>
                                <td>35,000</td>
                                <td>40,000</td>
                                <td>45,000</td>
                                <td colspan="2">50,000</td>
                            </tr>
                            <tr>
                                <th>12kg이상</th>
                                <td colspan="6">초과 1kg당 5,000원 추가</td>
                                
                            </tr>
                            <!-- 특수견 -->
                            <tr>
                                <th colspan="7" class="eNonBorder">특수견(비숑. 베들링턴 등...)</th>
                            </tr>
                            <tr>
                                <th>몸무게</th>
                                <th>목욕</th>
                                <th>부분</th>
                                <th>목욕+부분</th>
                                <th>얼굴+부분+목욕</th>
                                <th>스포팅</th>
                                <th>가위컷</th>
                            </tr>
                            <tr>
                                <th>5kg이하</th>
                                <td>20,000</td>
                                <td>20,000</td>
                                <td>25,000</td>
                                <td>30,000</td>
                                <td>35,000</td>
                                <td>60,000</td>
                            </tr>
                            <tr>
                                <th>5kg~8kg</th>
                                <td>25,000</td>
                                <td>25,000</td>
                                <td>30,000</td>
                                <td>35,000</td>
                                <td>40,000</td>
                                <td>60,000</td>
                            </tr>
                            <tr>
                                <th>8kg이상</th>
                                <td>30,000</td>
                                <td>30,000</td>
                                <td>35,000</td>
                                <td>40,000</td>
                                <td>45,000</td>
                                <td>60,000</td>
                            </tr>
                            <!-- 추가요금 -->
                            <tr>
                                <th colspan="7">&nbsp;</th>
                            </tr>
                            <tr>
                                <th rowspan="4" class="eNonBorder2">추가요금</th>
                                <th>가위컷</th>
                                <td>25,000</td>
                                <th>특수얼굴컷</th>
                                <td colspan="3">5,000</td>
                            </tr>
                            <tr>
                                <th>엉킴</th>
                                <td>5,000</td>
                                <th>투톤 염색</th>
                                <td colspan="3">10,000</td>
                            </tr>
                            <tr>
                                <th>기장</th>
                                <td>5,000</td>
                                <th>염색</th>
                                <td colspan="3">5,000</td>
                            </tr>
                        </table>
                    </div>
                    <!-- 후기 -->
                    <div class="eReviewBox">
                        <div class="eReviewBoxTitle">
                            <h1>후기</h1>
                            <router-link to="" >더보기 +</router-link>
                        </div>
                        <!-- 후기 슬라이드 -->
                        <div class="eReviewSlide">
                            <img src="@/assets/images/spy.jpg">
                            <!-- 후기 슬라이드 내용 -->
                            <div class="eReviewSlideContentBox">
                                <div class="eReviewSlideContentBoxTop">
                                    <h2>썬글라스컷</h2>
                                    <p>보리집사님</p>
                                </div>
                                <p>1960년대에 앤 베이커(Ann Baker)는 조세핀(Josephine)이라는 이름을 가진 앙고라 계열이지만 여러 혈통이 섞인 하얀 장모종을 발견했다. 조세핀이라는 고양이는 자동차 사고를 당해 다쳐서 캘리포니아 대학에 있었는데, 베이커는 조세핀이 비밀 정부기관에서 유전자 실험으로 생겨났다고 믿고 있었고, 베이커는 이 고양이와 버만 고양이를 교배시켜 랙돌을 탄생시켰다. 역사가 짧은데다가 한동안 앤 베이커가 랙돌 브리딩계를 아주 꽉 잡고 있었기 때문에[2] 유전자풀이 굉장히 좁다. 현재 랙돌의 유전자 중 약 40% 정도가 앤 베이커의 랙돌 한 마리에게서 왔다고 한다. 그럼에도 불구하고 아직까지 알려진 종특 유전병은 없다. 물론 HCM은 조심해야 하지만, 제대로 된 캐터리라면 먼저 유전자 검사를 한 뒤에 브리딩을 하니 고양이 분양시에 제대로 확인을 하면 된다.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 위치  -->
                <div class="ePositionContainer">
                    <h1>위치</h1>
                    <div class="ePositionBox">

                        <!-- 위치 왼쪽 -->
                        <div class="ePositionLeft">

                            <!-- 이용시간 -->
                            <div class="eTime">
                                <!-- 이용시간-왼쪽 -->
                                <div class="eTimeLeft">
                                    <h3>이용시간</h3>
                                </div>
                                <!-- 이용시간-오른쪽 -->
                                <div class="eTimeRight">
                                    <div class="eTimeRightContents">
                                        <p>평일</p>
                                        <p>am 9:00~ pm18:00</p>
                                    </div>
                                    <div class="eTimeRightContents">
                                        <p>토요일</p>
                                        <p>am 9:00~ pm15:00</p>
                                    </div>
                                    <div class="eTimeRightContents">
                                        <p>점심시간</p>
                                        <p>pm 12:00~ pm13:00</p>
                                    </div>
                                    <div class="eTimeRightContents">
                                        <p>공휴일/주말</p>
                                        <p>영업종료</p>
                                    </div>
                                </div>
                            </div>

                            <!-- 오시는길 -->
                            <div class="eRoad">
                                <!-- 오시는길-왼쪽 -->
                                <div class="eRoadLeft">
                                    <h3>오시는길</h3>
                                </div>
                                <!-- 오시는길-오른쪽 -->
                                <div class="eRoadRight">
                                    <div class="eRoadRightContents">
                                        <p>서울특별시 강남구 봉은사로 317</p>
                                    </div>
                                    <div class="eRoadRightBtnBox">
                                        <button class="kakaoMapBtn">카카오 지도보기</button>
                                        <button class="naverMapBtn">네이버 지도보기</button>
                                    </div>
                                </div>
                            </div>

                            <!-- 미용예약 -->
                            <div class="eReserv">
                                <!-- 미용예약-왼쪽 -->
                                <div class="eReservLeft">
                                    <h3>예약문의</h3>
                                </div>
                                <!-- 미용예약-오른쪽 -->
                                <div class="eReservRight">
                                    <div>
                                        <p class="eReservTel">02-1234-5678</p>
                                    </div>
                                    <div class="eReservBtnBox">
                                        <router-link to="/reservationform" class="eReservBtn">예약하러 가기</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 위치 오른쪽 -->
                        <div class="ePositionLRight">
                            <!-- <img src="@/assets/images/eMap.png"> -->
                            <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" style="width: 636px; height: 410px;">
                                <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
                            </KakaoMap>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        <TopButton />  
        <ManagerFooter />  
    </div><!-- wrap --> 

    <!-- 모달창 -->


</template>
  
<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
import { defineComponent, ref } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import slide01 from "@/assets/images/main-slide.png";
import slide02 from "@/assets/images/main-slide02.jpg";
import "vue3-carousel/dist/carousel.css";
    const coordinate = {
        lat: 37.498085,
        lng: 127.027978
    };
    const slides = ref([slide01, slide02]);
    const carouselRef = ref(null);

    const nextSlide = () => {
        if (carouselRef.value && carouselRef.value.next) {
            carouselRef.value.next();
        }
    };

    const prevSlide = () => {
        if (carouselRef.value && carouselRef.value.prev) {
            carouselRef.value.prev();
        }
    };
</script>
<script>
//    import { defineComponent,ref} from "vue";
//    import { Carousel, Pagination, Slide } from "vue3-carousel";
   import '@/assets/css/edit/editform.css'
   import ManagerFooter from "@/components/ManagerFooter.vue"
   import ManagerHeader from "@/components/ManagerHeader.vue"
   import TopButton from "@/components/TopButton.vue"

//    import slide01 from "@/assets/images/main-slide.png";
//    import slide02 from "@/assets/images/main-slide02.jpg";
//    import "vue3-carousel/dist/carousel.css";
  
   export default defineComponent({
       name: "EditView",
       components: {
            ManagerFooter,
            ManagerHeader,
            TopButton,
            Carousel,
            Slide,
            Pagination,
            // Navigation,
       },
       data() {
           
       },
       setup() {
            // const slides = ref([slide01, slide02]);
            // const carouselRef = ref(null);

            // const nextSlide = () => {
            // if (carouselRef.value && carouselRef.value.next) {
            //     carouselRef.value.next();
            // }
            // };

            // const prevSlide = () => {
            // if (carouselRef.value && carouselRef.value.prev) {
            //     carouselRef.value.prev();
            // }
            // };

            // return {
            // slides,
            // nextSlide,
            // prevSlide,
            // carouselRef,
            // };
        },
       methods: {
        
  
       },
   })
</script>
<style>
.wrapper-slide {
  position: relative;
  width: 100%;
  height: 600px;
}

.img-slide {
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.slideImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: rgba(224, 217, 217, 0.986); /* 더 밝은 회색 */
  cursor: pointer;
  z-index: 100;
}

.left {
  left: 20px;
}

.right {
  right: 20px;
}

.fas.fa-chevron-left,
.fas.fa-chevron-right {
  font-size: 36px;
}
</style>
  