<template>
    <div id="wrap">
        <ManagerHeader />
          <div class="container2">
            <!-- 타이틀 -->
            <div class="eTitle">
                <h1>{{ shopInfo.title }}</h1>
                <p>{{ shopInfo.subTitle }}</p>
            </div>
            <!-- 이미지 슬라이드 -->
            <div class="eImgSlide wrapper-slide">
                <Carousel :autoplay="5000" :wrap-around="true" :show-arrows="false" ref="carouselRef">
                    <Slide v-for="slide in slides" :key="slide">
                        <div class="img-slide">
                            <img v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${slide }`">
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
                                <div class="eCareerBoxInfo">{{ shopInfo.introduce }}</div>
                            </div>
                        </div>
                        <!-- 디자이너소개 오른쪽 -->
                        <div class="edRightBox">
                            <img v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${shopInfo.dProfile }`">
                        </div>
                    </div>
                </div>

                <!-- 가격 + 후기 -->
                <div  v-if="priceList.length > 0" class="ePriceReviewContainer">
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
                                <td>{{ priceList[0].onePrice }}</td>
                                <td>{{ priceList[1].onePrice }}</td>
                                <td>{{ priceList[2].onePrice }}</td>
                                <td>{{ priceList[3].onePrice }}</td>
                                <td colspan="2">{{ priceList[4].onePrice }}</td>
                            </tr>
                            <tr>
                                <th>2kg~5kg</th>
                                <td>{{ priceList[5].onePrice }}</td>
                                <td>{{ priceList[6].onePrice }}</td>
                                <td>{{ priceList[7].onePrice }}</td>
                                <td>{{ priceList[8].onePrice }}</td>
                                <td colspan="2">{{ priceList[9].onePrice }}</td>
                            </tr>
                            <tr>
                                <th>5kg~8kg</th>
                                <td>{{ priceList[10].onePrice }}</td>
                                <td>{{ priceList[11].onePrice }}</td>
                                <td>{{ priceList[12].onePrice }}</td>
                                <td>{{ priceList[13].onePrice }}</td>
                                <td colspan="2">{{ priceList[14].onePrice }}</td>
                            </tr>
                            <tr>
                                <th>8kg~10kg</th>
                                <td>{{ priceList[15].onePrice }}</td>
                                <td>{{ priceList[16].onePrice }}</td>
                                <td>{{ priceList[17].onePrice }}</td>
                                <td>{{ priceList[18].onePrice }}</td>
                                <td colspan="2">{{ priceList[19].onePrice }}</td>
                            </tr>
                            <!-- <tr v-for="(price, index) in smallDogPrices" :key="index">
                                <th>{{ price.weightDiv }}</th>
                                <td>{{price.목욕}}</td>
                                <td>{{price.부분}}</td>
                                <td>{{price.목욕_부분}}</td>
                                <td>{{price.얼굴_부분_목욕}}</td>
                                <td colspan="2">{{price.기본전체미용}}</td>
                            </tr> -->
                        
                            <!-- 중형견 -->
                            <tr>
                                <th colspan="7" class="eNonBorder">중형견(슈나, 코카 등...)</th>
                            </tr>
                            <tr>
                                <th>5kg이하</th>
                                <td>{{ priceList[20].onePrice }}</td>
                                <td>{{ priceList[21].onePrice }}</td>
                                <td>{{ priceList[22].onePrice }}</td>
                                <td>{{ priceList[23].onePrice }}</td>
                                <td colspan="2">{{ priceList[24].onePrice }}</td>
                            </tr>
                            <tr>
                                <th>5kg~8kg</th>
                                <td>{{ priceList[25].onePrice }}</td>
                                <td>{{ priceList[26].onePrice }}</td>
                                <td>{{ priceList[27].onePrice }}</td>
                                <td>{{ priceList[28].onePrice }}</td>
                                <td colspan="2">{{ priceList[29].onePrice }}</td>
                            </tr>
                            <tr>
                                <th>8kg~10kg</th>
                                <td>{{ priceList[30].onePrice }}</td>
                                <td>{{ priceList[31].onePrice }}</td>
                                <td>{{ priceList[32].onePrice }}</td>
                                <td>{{ priceList[33].onePrice }}</td>
                                <td colspan="2">{{ priceList[34].onePrice }}</td>
                            </tr>
                            <tr>
                                <th>10kg~12kg</th>
                                <td>{{ priceList[35].onePrice }}</td>
                                <td>{{ priceList[36].onePrice }}</td>
                                <td>{{ priceList[37].onePrice }}</td>
                                <td>{{ priceList[38].onePrice }}</td>
                                <td colspan="2">{{ priceList[39].onePrice }}</td>
                            </tr>
                            <tr>
                                <th>12kg이상</th>
                                <td colspan="6">초과 lkg당 {{ priceList[40].onePrice }}원 추가</td>
                            </tr>
                            <!-- <tr v-for="(price, index) in mediumDogPrices" :key="index">
                                <th>{{ price.weightDiv }}</th> 
                                <td v-if="index == 4" colspan="6">{{price.목욕}}</td>
                                <td v-else>{{price.목욕}}</td>
                                <td v-if="index != 4">{{price.부분}}</td>
                                <td v-if="index != 4">{{price.목욕_부분}}</td>
                                <td v-if="index != 4">{{price.얼굴_부분_목욕}}</td>
                                <td v-if="index != 4" colspan="2">{{price.기본전체미용}}</td>
                            </tr> -->
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
                                <td>{{ priceList[41].onePrice }}</td>
                                <td>{{ priceList[42].onePrice }}</td>
                                <td>{{ priceList[43].onePrice }}</td>
                                <td>{{ priceList[44].onePrice }}</td>
                                <td>{{ priceList[45].onePrice }}</td>
                                <td>{{ priceList[46].onePrice }}</td>
                            </tr>
                            <tr>
                                <th>5kg~8kg</th>
                                <td>{{ priceList[47].onePrice }}</td>
                                <td>{{ priceList[48].onePrice }}</td>
                                <td>{{ priceList[49].onePrice }}</td>
                                <td>{{ priceList[50].onePrice }}</td>
                                <td>{{ priceList[51].onePrice }}</td>
                                <td>{{ priceList[52].onePrice }}</td>
                            </tr>
                            <tr>
                                <th>8kg이상</th>
                                <td>{{ priceList[53].onePrice }}</td>
                                <td>{{ priceList[54].onePrice }}</td>
                                <td>{{ priceList[55].onePrice }}</td>
                                <td>{{ priceList[56].onePrice }}</td>
                                <td>{{ priceList[57].onePrice }}</td>
                                <td>{{ priceList[58].onePrice }}</td>
                            </tr>
                            <!-- <tr v-for="(price, index) in specialDogPrices" :key="index">
                                <th>{{ price.weightDiv }}</th>
                                <td>{{price.목욕}}</td>
                                <td>{{price.부분}}</td>
                                <td>{{price.목욕_부분}}</td>
                                <td>{{price.얼굴_부분_목욕}}</td>
                                <td>{{price.스포팅}}</td>
                                <td>{{price.가위컷}}</td>
                            </tr> -->
                            <!-- 추가요금 -->
                            <tr>
                                <th colspan="7">&nbsp;</th>
                            </tr>
                            <tr>
                                <th rowspan="4" class="eNonBorder2">추가요금</th>
                                <th>가위컷</th>
                                <td>{{priceList[59].onePrice}}</td>
                                <th>특수얼굴컷</th>
                                <td colspan="3">{{priceList[62].onePrice}}</td>
                            </tr>
                            <tr>
                                <th>엉킴</th>
                                <td>{{priceList[60].onePrice}}</td>
                                <th>투톤염색</th>
                                <td colspan="3">{{priceList[63].onePrice}}</td>
                            </tr>
                            <tr>
                                <th>기장</th>
                                <td>{{priceList[61].onePrice}}</td>
                                <th>염색</th>
                                <td colspan="3">{{priceList[64].onePrice}}</td>
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
                                <div class="eRoadRight" >
                                    <div class="eRoadRightContents">
                                        <p>{{ shopInfo.bAddress }} {{ shopInfo.bdAddress}} ({{ shopInfo.bZipCode }})</p>
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
                                        <p class="eReservTel">{{ shopInfo.bPhone }}</p>
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

</template>
  
<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
import { defineComponent, ref } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
// import slide01 from "@/assets/images/main-slide.png";
// import slide02 from "@/assets/images/main-slide02.jpg";
import "vue3-carousel/dist/carousel.css";
// 코드에서 setup을 사용하고 있으므로 setup 내에서 import와 reactive를 사용할 수 있습니다.
import { reactive, onMounted } from 'vue';
//Composition API에서는 setup 함수 내에서 직접적으로 this를 사용할 수 없기 때문에 $store에 접근하려면 useStore 훅을 사용하여 스토어를 가져와야 함
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

    //스토어 가져오기
    const store = useStore();

    //bNo가져오기
    const { params } = useRoute();

    //리액티브 변수 초기화
    const coordinate = reactive({
        lat: 0,
        lng: 0
    });

    //슬라이드
    const slides = ref([]);
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

    // 가게 정보 에서 위도 경도 슬라이드 리스트 값 받아오기
    const getLatLngSlide = () => {
        axios({
            method: 'get',
            url: `${store.state.apiBaseUrl}/api/su/shopInfo`, //store변수 사용
            headers: { "Content-Type": "application/json; charset=utf-8" },
            params: { bNo: params.bNo },
            responseType: 'json'
        }).then(response => {
            // shopInfo 객체에서 위도와 경도 값을 받아와서 coordinate 객체에 할당합니다.
            coordinate.lat = response.data.apiData.shopInfo.latitude;
            coordinate.lng = response.data.apiData.shopInfo.longitude;

            slides.value = response.data.apiData.sList;

        }).catch(error => {
            console.log(error);
        });

    };
    // 컴포넌트가 마운트된 후에 가게 정보 가져오기
    onMounted(() => {
        getLatLngSlide();
    });
    
    
</script>
<script>
import axios from 'axios';
//    import { defineComponent,ref} from "vue";
//    import { Carousel, Pagination, Slide } from "vue3-carousel";
   import '@/assets/css/edit/edit.css'
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
        return {
            bNo: this.$route.params.bNo,
            shopInfo: {
                bZipCode: "",
                bAddress: "",
                bdAddress: "",
                bPhone: "",
                title: "",
                subTitle: "",
                logo:"",
                dName:"",
                introduce:"",
                dProfile:"",
                job:"",
            },
            priceList:[],
            slideList:[],
            cutList:[]

        }
           
       },
       computed: {
        },  
       setup() { //props, context를 통해 외부에서 전달받은 데이터를 받거나, reactive, ref 등을 사용하여 반응성을 갖는 데이터를 정의하고, 해당 데이터에 대한 로직을 구성할 수 있음
        },
       methods: {

        // 가게 정보 불러오기
        getShopInfo(){
            // console.log(this.bNo);
            axios({
                method: 'get', // put, post, delete 
                url: `${this.$store.state.apiBaseUrl}/api/su/shopInfo`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: {bNo: this.bNo}, //get방식 파라미터로 값이 전달
                // data: this.userVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {

                this.shopInfo = response.data.apiData.shopInfo;
                this.priceList = response.data.apiData.pList;
                this.slideList = response.data.apiData.sList;

                // console.log(this.shopInfo.logo);
                // console.log(this.shopInfo.dProfile);
                // console.log(this.priceList);
                // console.log(this.slideList);

            }).catch(error => {
                console.log(error);
            });
        },
        
        
  
       },
       created(){
        this.getShopInfo();
       }
   })
</script>
<style>

</style>
  