<template>
    <form v-on:submit.prevent ="addShopInfo" enctype="multipart/form-data">
        <div id="wrap">
            <ManagerHeader />
            <div class="container3">

                <!-- 로고 + 타이틀 등록 -->
                <div class="eLogoTitle">
                    <h1>로고, 타이틀 등록</h1>
                    <!-- 로고 -->
                    <div class="eLogoTitleInfo">
                        <div class="eLogo">
                            <div id='att_zone4' class="addLImgBox" data-placeholder="파일을 첨부하려면 파일 선택 버튼을 클릭하거나 파일을 드래그하세요."></div>
                                <input id="btnAtt4" type="file" class="eFileAddBtn">
                            </div>

                            <!-- 타이틀-->
                            <div class="eTitle">
                                <input type="text" placeholder="타이틀" v-model="shopInfo.title">
                                <input type="text" placeholder="부제목 들어갈 곳" v-model="shopInfo.subTitle">
                            </div>
                    </div>
                </div>
                
                <!-- 내용부분 -->
                <div class="eMidContainer">

                    <!-- 이미지 슬라이드 첨부파일 -->
                    <div class="eSlideImgContainer">
                        <h1>슬라이드 사진등록</h1>
                        <div class="eSlideImgInfo">
                            <input id="btnAtt" type="file" multiple='multiple' class="eFileAddBtn" >
                            <p>*사진은 최대 5장까지 첨부할 수 있습니다.</p>
                        </div>
                        <div id='att_zone' class="addImgBox" data-placeholder="파일을 첨부하려면 파일 선택 버튼을 클릭하거나 파일을 드래그하세요."></div>
                    </div>

                    <!-- 미용사진 슬라이드 첨부파일 -->
                    <div class="eCutImgContainer">
                        <h1>미용사진 등록</h1>
                        <div class="eCutSlideImgInfo">
                            <input id="btnAtt2" type="file" multiple='multiple' class="eCutFileAddBtn" >
                            <p>*사진은 최대 20장까지 첨부할 수 있습니다.</p>
                        </div>
                        <div id='att_zone2' class="addcImgBox" data-placeholder="파일을 첨부하려면 파일 선택 버튼을 클릭하거나 파일을 드래그하세요."></div>
                    </div>

                    <!-- 디자이너 소개 -->
                    <div class="eDesignerSlideContainer">
                        <h1>디자이너 소개</h1>
                        <div class="eDesignerContentsBox">
                            <!-- 디자이너소개 왼쪽 -->
                            <div class="eDLeftBox">
                                <div class="eNameBox">
                                    <label>이름:</label>
                                    <input type="text" placeholder="이름을 입력하세요" v-model="shopInfo.dName">
                                </div>
                                <div class="eJobBox">
                                    <label>직책:</label>
                                    <input type="text" placeholder="ex)원장" v-model="shopInfo.job">
                                </div>
                                <!-- <h2>이서현 원장</h2> -->
                                <div class="eCareerBox">
                                    <!-- <h3>경력</h3> -->
                                    <label>경력:</label>
                                    <textarea class="eCareerBoxInfo" placeholder="ex)-2000년 애견미용강사&#10;   -2002년 '깔끔하개' 개원" v-model="shopInfo.introduce"></textarea>
                                </div>
                            </div>
                            <!-- 디자이너소개 오른쪽 -->
                            <div class="edRightBox">
                                <div id='att_zone3' class="addDImgBox" data-placeholder="파일을 첨부하려면 파일 선택 버튼을 클릭하거나 파일을 드래그하세요."></div>
                                <input id="btnAtt3" type="file" class="eFileAddBtn">
                            </div>
                        </div>
                    </div>

                    <!-- 가격 + 후기 -->
                    <div class="ePriceReviewContainer">
                        <!-- 가격 -->
                        <!-- <div class="ePriceBox" v-if="priceList.length >= 65"> -->
                        <div class="ePriceBox" v-if="priceList.length >= 65">
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
                                    <td><input type="text" v-model="priceList[0].onePrice" ></td>
                                    <td><input type="text" v-model="priceList[1].onePrice"></td>
                                    <td><input type="text" v-model="priceList[2].onePrice"></td>
                                    <td><input type="text" v-model="priceList[3].onePrice"></td>
                                    <td colspan="2"><input type="text" v-model="priceList[4].onePrice"></td>
                                </tr>
                                <tr>
                                    <th>2kg~5kg</th>
                                    <td><input type="text" v-model="priceList[5].onePrice" ></td>
                                    <td><input type="text" v-model="priceList[6].onePrice"></td>
                                    <td><input type="text" v-model="priceList[7].onePrice"></td>
                                    <td><input type="text" v-model="priceList[8].onePrice"></td>
                                    <td colspan="2"><input type="text" v-model="priceList[9].onePrice"></td>
                                </tr>
                                <tr>
                                    <th>5kg~8kg</th>
                                    <td><input type="text" v-model="priceList[10].onePrice" ></td>
                                    <td><input type="text" v-model="priceList[11].onePrice"></td>
                                    <td><input type="text" v-model="priceList[12].onePrice"></td>
                                    <td><input type="text" v-model="priceList[13].onePrice"></td>
                                    <td colspan="2"><input type="text" v-model="priceList[14].onePrice"></td>
                                </tr>
                                <tr>
                                    <th>8kg~10kg</th>
                                    <td><input type="text" v-model="priceList[15].onePrice" ></td>
                                    <td><input type="text" v-model="priceList[16].onePrice"></td>
                                    <td><input type="text" v-model="priceList[17].onePrice"></td>
                                    <td><input type="text" v-model="priceList[18].onePrice"></td>
                                    <td colspan="2"><input type="text" v-model="priceList[19].onePrice"></td>
                                </tr>
                            
                                <!-- 중형견 -->
                                <tr>
                                    <th colspan="7" class="eNonBorder">중형견(슈나, 코카 등...)</th>
                                </tr>
                                <tr>
                                    <th>5kg이하</th>
                                    <td><input type="text" v-model="priceList[20].onePrice" ></td>
                                    <td><input type="text" v-model="priceList[21].onePrice"></td>
                                    <td><input type="text" v-model="priceList[22].onePrice"></td>
                                    <td><input type="text" v-model="priceList[23].onePrice"></td>
                                    <td colspan="2"><input type="text" v-model="priceList[24].onePrice"></td>
                                </tr>
                                <tr>
                                    <th>5kg~8kg</th>
                                    <td><input type="text" v-model="priceList[25].onePrice" ></td>
                                    <td><input type="text" v-model="priceList[26].onePrice"></td>
                                    <td><input type="text" v-model="priceList[27].onePrice"></td>
                                    <td><input type="text" v-model="priceList[28].onePrice"></td>
                                    <td colspan="2"><input type="text" v-model="priceList[29].onePrice"></td>
                                </tr>
                                <tr >
                                    <th>8kg~10kg</th>
                                    <td><input type="text" v-model="priceList[30].onePrice" ></td>
                                    <td><input type="text" v-model="priceList[31].onePrice"></td>
                                    <td><input type="text" v-model="priceList[32].onePrice"></td>
                                    <td><input type="text" v-model="priceList[33].onePrice"></td>
                                    <td colspan="2"><input type="text" v-model="priceList[34].onePrice"></td>
                                </tr>
                                <tr>
                                    <th>10kg~12kg</th>
                                    <td><input type="text" v-model="priceList[35].onePrice" ></td>
                                    <td><input type="text" v-model="priceList[36].onePrice"></td>
                                    <td><input type="text" v-model="priceList[37].onePrice"></td>
                                    <td><input type="text" v-model="priceList[38].onePrice"></td>
                                    <td colspan="2"><input type="text" v-model="priceList[39].onePrice"></td>
                                </tr>
                                <tr >
                                    <th>12kg이상</th>
                                    <td colspan="6">초과 lkg당 <input type="text" v-model="priceList[40].onePrice">원 추가</td>
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
                                    <td><input type="text" v-model="priceList[41].onePrice" ></td>
                                    <td><input type="text" v-model="priceList[42].onePrice"></td>
                                    <td><input type="text" v-model="priceList[43].onePrice"></td>
                                    <td><input type="text" v-model="priceList[44].onePrice"></td>
                                    <td><input type="text" v-model="priceList[45].onePrice"></td>
                                    <td><input type="text" v-model="priceList[46].onePrice"></td>
                                </tr>
                                <tr >
                                    <th>5kg~8kg</th>
                                    <td><input type="text" v-model="priceList[47].onePrice" ></td>
                                    <td><input type="text" v-model="priceList[48].onePrice"></td>
                                    <td><input type="text" v-model="priceList[49].onePrice"></td>
                                    <td><input type="text" v-model="priceList[50].onePrice"></td>
                                    <td><input type="text" v-model="priceList[51].onePrice"></td>
                                    <td><input type="text" v-model="priceList[52].onePrice"></td>
                                </tr>
                                <tr >
                                    <th>8kg이상</th>
                                    <td><input type="text" v-model="priceList[53].onePrice" ></td>
                                    <td><input type="text" v-model="priceList[54].onePrice"></td>
                                    <td><input type="text" v-model="priceList[55].onePrice"></td>
                                    <td><input type="text" v-model="priceList[56].onePrice"></td>
                                    <td><input type="text" v-model="priceList[57].onePrice"></td>
                                    <td><input type="text" v-model="priceList[58].onePrice"></td>
                                </tr>
                                <!-- 추가요금 -->
                                <tr>
                                    <th colspan="7">&nbsp;</th>
                                </tr>
                                <tr>
                                    <th rowspan="4" colspan="2" class="eNonBorder2">추가요금</th>
                                    <th>가위컷</th>
                                    <td><input type="text" v-model="priceList[59].onePrice"></td>
                                    <th>특수얼굴컷</th>
                                    <td colspan="2"><input type="text" v-model="priceList[62].onePrice"></td>
                                </tr>
                                <tr>
                                    <th>엉킴</th>
                                    <td><input type="text" v-model="priceList[60].onePrice"></td>
                                    <th>투톤염색</th>
                                    <td colspan="2"><input type="text" v-model="priceList[63].onePrice"></td>
                                </tr>
                                <tr>
                                    <th>기장</th>
                                    <td><input type="text" v-model="priceList[61].onePrice"></td>
                                    <th>염색</th>
                                    <td colspan="2"><input type="text" v-model="priceList[64].onePrice"></td>
                                </tr>
                            </table>
                        </div>
                        <!-- 후기 -->
                        <div class="eReviewBox">
                            <div class="eReviewBoxTitle">
                                <h1>후기</h1>
                                <!-- <router-link to="" >더보기 +</router-link> -->
                            </div>
                            <!-- 후기 슬라이드 -->
                            <div class="eReviewSlide">
                                <div class="eReviewSlideContentBox">
                                <p>후기 슬라이드 들어갈 곳</p>
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
                                    <div class="eTimeRight "> 
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
                                            <p class="eReservTel">{{ shopInfo.bPhone}}</p>
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

                    <!-- 등록 버튼 -->
                    <button type="submit">가게정보 등록 버튼</button>
                </div>
            </div>
            <TopButton />  
            <ManagerFooter />  
        </div><!-- wrap --> 
    </form>
    <!-- 모달창 -->


</template>
  
<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
import { defineComponent} from "vue";
import "vue3-carousel/dist/carousel.css";
// 코드에서 setup을 사용하고 있으므로 setup 내에서 import와 reactive를 사용할 수 있습니다.
import { reactive, onMounted } from 'vue';
//Composition API에서는 setup 함수 내에서 직접적으로 this를 사용할 수 없기 때문에 $store에 접근하려면 useStore 훅을 사용하여 스토어를 가져와야 함
// import { useStore } from 'vuex';
// import { useRoute } from 'vue-router';

    //스토어 가져오기
    // const store = useStore();

    //bNo가져오기
    // const { params } = useRoute();

    //리액티브 변수 초기화
    const coordinate = reactive({
        lat: 0,
        lng: 0
    });

    // 가게 정보 불러오기 
    // const getLatLng = () => {
    //     axios({
    //         method: 'get',
    //         url: `${store.state.apiBaseUrl}/api/su/shopInfo`, //store변수 사용
    //         headers: { "Content-Type": "application/json; charset=utf-8" },
    //         params: { bNo: params.bNo },
    //         responseType: 'json'
    //     }).then(response => {
    //         // shopInfo 객체에서 위도와 경도 값을 받아와서 coordinate 객체에 할당합니다.
    //         coordinate.lat = response.data.apiData.latitude;
    //         coordinate.lng = response.data.apiData.longitude;
    //     }).catch(error => {
    //         console.log(error);
    //     });

    // };
    // 컴포넌트가 마운트된 후에 가게 정보 가져오기
    onMounted(() => {
        // getLatLng();
    });
</script>
<script>
   import '@/assets/css/edit/editform.css'
   import ManagerFooter from "@/components/ManagerFooter.vue"
   import ManagerHeader from "@/components/ManagerHeader.vue"
   import TopButton from "@/components/TopButton.vue"
   import axios from 'axios';
   
    export default defineComponent({
        name: "EditView",
        components: {
                ManagerFooter,
                ManagerHeader,
                TopButton
        },
        data() {
            return{
                bNo: this.$route.params.bNo,
                shopInfo: {
                    bZipCode: "",
                    bAddress: "",
                    bdAddress: "",
                    bPhone: "",
                    title: "", //""으로하면 빈 문자열인데 오류뜬다.
                    subTitle: "",
                    logo: null,
                    utilTime: "",
                    dName:"",
                    introduce:"",
                    dProfile:null,
                    job:"",
                    slideImgs:[],
                    cutImgs:[],
                },
                priceList: this.initializePriceList(),

            }
        },
        methods: {

            //가격리스트 없을때! 가격리스트 초기화!
            initializePriceList() {
                let priceList = [];
                for (let i = 1; i < 66; i++) { // beautyNo가 1번 부터 시작이라 1번부터 값을 할당해야함
                    priceList.push({ beautyNo: i ,onePrice: '' });
                }
                return priceList;
            },



            // 가게정보 등록하기
            addShopInfo(){
                console.log("가게정보 등록하기 버튼");
                let formData = new FormData();

                formData.append("bNo", this.bNo);

                formData.append("logo", this.shopInfo.logo);
                formData.append("title", this.shopInfo.title);
                formData.append("subTitle", this.shopInfo.subTitle);
                
                this.shopInfo.slideImgs.forEach((img, index) => {
                    formData.append(`slideImgs[${index}]`, img);
                });
                this.shopInfo.cutImgs.forEach((img, index) => {
                    formData.append(`cutImgs[${index}]`, img);
                });

                formData.append("dName", this.shopInfo.dName);
                formData.append("job", this.shopInfo.job);
                formData.append("introduce", this.shopInfo.introduce);
                formData.append("dProfile", this.shopInfo.dProfile);

                // priceList의 각 항목을 개별적으로 추가
                for (let i = 0; i < this.priceList.length; i++) {
                    formData.append(`priceList[${i}].onePrice`, this.priceList[i].onePrice);
                    formData.append(`priceList[${i}].beautyNo`, this.priceList[i].beautyNo);
                    
                }

                console.log("=====보내기전 정보 담은거 확인=====");

                console.log(formData.get("logo"));
                console.log(formData.get("subTitle"));

                // console.log(formData.get("slideImgs"));
                // console.log(formData.get("cutImgs"));

                console.log(formData.get("dName"));
                console.log(formData.get("job"));
                console.log(formData.get("introduce"));

                console.log(formData.get("dProfile"));

                // console.log("가격리스트의 첫번째 값 확인");
                // priceList 항목 개별 확인
                // for (let i = 0; i < this.priceList.length; i++) {
                //     console.log(`priceList[${i}]`, formData.get(`priceList[${i}].beautyNo`),formData.get(`priceList[${i}].onePrice`));
                // }


                axios({
                    
                    method: 'post', // put, post, delete 
                    url: `${this.$store.state.apiBaseUrl}/api/su/registerShop`,
                    headers: { "Content-Type": "multipart/form-data" }, //전송타입
                    // params: {bNo: this.bNo}, //get방식 파라미터로 값이 전달
                    data: formData, // formData로 묶어서 보낼떈 Json형태로 보내기 -> springboot에서 받을땐 modelattribute로 받음(formData의 예외다!)
                    responseType: 'json' //수신타입
                }).then(response => {
                    console.log(response.data.apiData);

                    // if (response.data.apiData == 1) {
                    //     alert("홈페이지가 성공적으로 만들어졌습니다.");
                    //     this.$router.push(`/edit/${this.bNo}`);
                    // } else {
                    //     alert("정보를 다시 확인해주세요.");
                    // }
                    

                }).catch(error => {
                    console.log(error);
                });
            },

            // 가게정보 불러오기 - 수정할때 if문 줘서 살리기
            // getShopInfo(){
            //     // console.log(this.bNo);
            //     axios({
            //         method: 'get', // put, post, delete 
            //         url: `${this.$store.state.apiBaseUrl}/api/su/shopInfo`,
            //         headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
            //         params: {bNo: this.bNo}, //get방식 파라미터로 값이 전달
            //         // data: this.userVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
            //         responseType: 'json' //수신타입
            //     }).then(response => {

            //         this.shopInfo = response.data.apiData;

            //         // 빈 문자열을 null로 변환
            //         // if (this.shopInfo.title === "") {
            //         //     this.shopInfo.title = null;
            //         // }

            //     }).catch(error => {
            //         console.log(error);
            //     });
            // },

            //가격정보 불러오기
            getPrice(){
                // console.log(this.bNo);
                // axios({
                //     method: 'get', // put, post, delete 
                //     url: `${this.$store.state.apiBaseUrl}/api/su/getPriceBybNo`,
                //     headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //     params: {bNo: this.bNo}, //get방식 파라미터로 값이 전달
                //     // data: this.userVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                //     responseType: 'json' //수신타입
                // }).then(response => {
                //     // console.log(response.data.apiData); //수신데이타

                //     // 필요한 요소 개수 (여기서는 65개로 가정) - length만큼 onePrice를 초기화애야함.
                //         const requiredLength = 65;

                //     // pList가 비어 있는 경우
                //     if (!response.data.apiData || response.data.apiData.length === 0) {
                //         // beautyNo를 1부터 시작하여 +1씩 증가하며 priceList 초기화
                //         this.priceList = Array.from({ length: requiredLength }, (_, index) => ({ beautyNo: index + 1, onePrice: 0 }));
                //     } else {
                //         // priceList의 각 요소가 onePrice 프로퍼티를 가지도록 초기화
                //         const receivedList = response.data.apiData.map(item => ({ beautyNo: item.beautyNo, onePrice: item.onePrice }));
                //         // 필요한 길이만큼 초기화
                //         this.priceList = [...receivedList, ...Array.from({ length: requiredLength - receivedList.length }, (_, index) => ({ beautyNo: receivedList.length + index + 1, onePrice: 0 }))];
                //     }

                // }).catch(error => {
                //     console.log(error);
                // });
            },
  
        },
        created(){

            // this.getShopInfo();
            // this.getPrice();
        },
        mounted() {

            const self = this; // imageLoader 함수 내부에서 this가 Vue 인스턴스를 참조하지 않기 때문에 this를 따로 할당해준다.
           
            // ==========가게 로고 1개 첨부파일==========
            (function imageView(att_zone4, btn) {
                var attZone = document.getElementById(att_zone4);
                var btnAtt4 = document.getElementById(btn);

                // 이미지와 체크박스를 감싸고 있는 div 속성
                var div_style = 'display:inline-block;position:relative;width:125px;height:125px;border:1px solid #a7a4a4;z-index:1';

                // 미리보기 이미지 속성
                var img_style = 'width:100%;height:100%;z-index:none;object-fit:contain';

                // 이미지를 업로드하고 미리보기 설정
                btnAtt4.onchange = function (e) {
                    var file = e.target.files[0];
                    
                    if (!file.type.match(/image.*/)) {
                        alert("이미지 파일만 업로드 가능합니다.");
                        return;
                    }
                    
                    imageLoader(file);
                  
                
                };

                // 드래그 앤 드롭 기능 설정
                attZone.addEventListener('dragenter', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }, false);

                attZone.addEventListener('dragover', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }, false);

                attZone.addEventListener('drop', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var dt = e.dataTransfer;
                    var file = dt.files[0];
                    if (!file.type.match(/image.*/)) {
                        alert("이미지 파일만 업로드 가능합니다.");
                        return;
                    }
                    
                    imageLoader(file);

                    
                    
                }, false);


                // 첨부된 이미지를 미리보기
                function imageLoader(file) {
                    var reader = new FileReader();

                    reader.onload = function (ee) {
                        let img = document.createElement('img');
                        img.setAttribute('style', img_style);
                        img.src = ee.target.result;
                        attZone.innerHTML = '';// 기존 내용 비우기
                        attZone.appendChild(makeDiv(img));//첨부된 div밀어넣기
                        attZone.classList.add('file-attached'); // 파일 첨부됨을 나타내는 클래스 추가 -> 관련 css로 배경이미지 안보이게 하기
                        
                       
                        self.shopInfo.logo = file;//로고에 이미지 할당하기.
                    };

                    reader.readAsDataURL(file);
                    
                }

                // 첨부된 파일이 있는 경우 미리보기를 생성하는 함수
                function makeDiv(img) {
                    var div = document.createElement('div');
                    div.setAttribute('style', div_style);

                    div.appendChild(img);
                    return div;
                }
                
            })('att_zone4', 'btnAtt4');
    
            // ==========이미지 슬라이드 5개 첨부파일==========
            (function imageView(att_zone, btn) {
                var attZone = document.getElementById(att_zone);
                var btnAtt = document.getElementById(btn);
                var sel_files = [];


                // 이미지와 체크박스를 감싸고 있는 div속성 
                var div_style = 'display:inline-block;position:relative;width:280px;height:200px;margin:5px;border:1px solid #a7a4a4;z-index:1';

                // 미리보기 이미지 속성
                var img_style = 'width:100%;height:100%;z-index:none;object-fit:contain';


                // 이미지안에 표시되는 체크박스의 속성
                var chk_style = 'width:30px;height:30px;position:absolute;font-size:18px;right:0px;background-color:rgba(255,255,255,0.1); color:#ff0000; border:none;font-weight:bold';


                btnAtt.onchange = function (e) {
                    var files = e.target.files;
                    var fileArr = Array.prototype.slice.call(files);
                    for (let f of fileArr) {
                        imageLoader(f);
                    }
                };


                // 탐색기에서 드래그앤 드롭 사용
                attZone.addEventListener('dragenter', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }, false);

                attZone.addEventListener('dragover', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }, false);

                attZone.addEventListener('drop', function (e) {
                    var files = {};
                    e.preventDefault();
                    e.stopPropagation();
                    var dt = e.dataTransfer;
                    files = dt.files;
                    for (let f of files) {
                        imageLoader(f);
                    }
                }, false);


                // 첨부된 이미지들을 배열에 넣고 미리보기
                function imageLoader(file) {
                    if (sel_files.length >= 5) { // 이미 5개 이상인 경우 추가하지 않음
                        if (!alerted) { // 이미 alert가 띄워진 경우는 추가하지 않음
                            alert("최대 5장까지만 첨부할 수 있습니다.");
                            alerted = true; // alert 띄움 플래그를 true로 설정
                        }
                        return;
                    }
                    sel_files.push(file);
                    var reader = new FileReader();
                    reader.onload = function (ee) {
                        let img = document.createElement('img');
                        img.setAttribute('style', img_style);
                        img.src = ee.target.result;
                        attZone.appendChild(makeDiv(img, file));
                    };
                    reader.readAsDataURL(file);

                    // slideImgs 배열에 파일 추가
                    self.shopInfo.slideImgs= sel_files;
                    // console.log("배열에 추가:")
                    // console.log(self.shopInfo.slideImgs);
                }



                //  첨부된 파일이 있는 경우 checkbox와 함께 attZone에 추가할 div를 만들어 반환
                function makeDiv(img, file) {
                    var div = document.createElement('div');
                    div.setAttribute('style', div_style);

                    var btn = document.createElement('input');
                    btn.setAttribute('type', 'button');
                    btn.setAttribute('value', 'x');
                    btn.setAttribute('delFile', file.name);
                    btn.setAttribute('style', chk_style);
                    btn.onclick = function (ev) {
                        var ele = ev.srcElement;
                        var delFile = ele.getAttribute('delFile');
                        for (var i = 0; i < sel_files.length; i++) {
                            if (delFile == sel_files[i].name) {
                                sel_files.splice(i, 1);
                            }
                        }

                        var dt = new DataTransfer();
                        for (let f of sel_files) {
                            dt.items.add(f);
                        }
                        btnAtt.files = dt.files;
                        var p = ele.parentNode;
                        attZone.removeChild(p);
                    };
                    // self.shopInfo.slideImgs = file;
                    div.appendChild(img);
                    div.appendChild(btn);
                    return div;
                }
                // 이미 alert가 띄워진 경우를 확인하는 플래그
                var alerted = false;
            })('att_zone', 'btnAtt');

            // ==========미용컷 20개 첨부파일==========
            (function imageView(att_zone2, btn) {
                var attZone = document.getElementById(att_zone2);
                var btnAtt2 = document.getElementById(btn);
                var sel_files = [];


                // 이미지와 체크박스를 감싸고 있는 div속성 
                var div_style = 'display:inline-block;position:relative;width:200px;height:200px;margin:5px;border:1px solid #a7a4a4;z-index:1';

                // 미리보기 이미지 속성
                var img_style = 'width:100%;height:100%;z-index:none;object-fit:contain';


                // 이미지안에 표시되는 체크박스의 속성
                var chk_style = 'width:30px;height:30px;position:absolute;font-size:18px;right:0px;background-color:rgba(255,255,255,0.1);color:#a7a4a4;border:none;font-weight:bold';


                btnAtt2.onchange = function (e) {
                    var files = e.target.files;
                    var fileArr = Array.prototype.slice.call(files);
                    for (let f of fileArr) {
                        imageLoader(f);
                    }
                };


                // 탐색기에서 드래그앤 드롭 사용
                attZone.addEventListener('dragenter', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }, false);

                attZone.addEventListener('dragover', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }, false);

                attZone.addEventListener('drop', function (e) {
                    var files = {};
                    e.preventDefault();
                    e.stopPropagation();
                    var dt = e.dataTransfer;
                    files = dt.files;
                    for (let f of files) {
                        imageLoader(f);
                    }
                }, false);



                // 첨부된 이미지들을 배열에 넣고 미리보기
                function imageLoader(file) {
                    if (sel_files.length >= 20) { // 이미 5개 이상인 경우 추가하지 않음
                        if (!alerted) { // 이미 alert가 띄워진 경우는 추가하지 않음
                            alert("최대 20장까지만 첨부할 수 있습니다.");
                            alerted = true; // alert 띄움 플래그를 true로 설정
                        }
                        return;
                    }
                    sel_files.push(file);
                    var reader = new FileReader();
                    reader.onload = function (ee) {
                        let img = document.createElement('img');
                        img.setAttribute('style', img_style);
                        img.src = ee.target.result;
                        attZone.appendChild(makeDiv(img, file));
                    };
                    reader.readAsDataURL(file);

                    self.shopInfo.cutImgs = sel_files;
                }



                //  첨부된 파일이 있는 경우 checkbox와 함께 attZone에 추가할 div를 만들어 반환
                function makeDiv(img, file) {
                    var div = document.createElement('div');
                    div.setAttribute('style', div_style);

                    var btn = document.createElement('input');
                    btn.setAttribute('type', 'button');
                    btn.setAttribute('value', 'x');
                    btn.setAttribute('delFile', file.name);
                    btn.setAttribute('style', chk_style);
                    btn.onclick = function (ev) {
                        var ele = ev.srcElement;
                        var delFile = ele.getAttribute('delFile');
                        for (var i = 0; i < sel_files.length; i++) {
                            if (delFile == sel_files[i].name) {
                                sel_files.splice(i, 1);
                            }
                        }

                        var dt = new DataTransfer();
                        for (let f of sel_files) {
                            dt.items.add(f);
                        }
                        btnAtt2.files = dt.files;
                        var p = ele.parentNode;
                        attZone.removeChild(p);
                    };
                    div.appendChild(img);
                    div.appendChild(btn);
                    return div;
                }
                // 이미 alert가 띄워진 경우를 확인하는 플래그
                var alerted = false;
            })('att_zone2', 'btnAtt2');

            // ==========디자이너 소개 프로필 1개 첨부파일==========
            (function imageView(att_zone3, btn) {
                var attZone = document.getElementById(att_zone3);
                var btnAtt3 = document.getElementById(btn);

                // 이미지와 체크박스를 감싸고 있는 div 속성
                var div_style = 'display:inline-block;position:relative;width:398px;height:398px;border:1px solid #a7a4a4;z-index:1';

                // 미리보기 이미지 속성
                var img_style = 'width:100%;height:100%;z-index:none;object-fit:contain';

                // 이미지를 업로드하고 미리보기 설정
                btnAtt3.onchange = function (e) {
                    var file = e.target.files[0];
                    if (!file.type.match(/image.*/)) {
                        alert("이미지 파일만 업로드 가능합니다.");
                        return;
                    }
                    imageLoader(file);
                };

                // 드래그 앤 드롭 기능 설정
                attZone.addEventListener('dragenter', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }, false);

                attZone.addEventListener('dragover', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }, false);

                attZone.addEventListener('drop', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var dt = e.dataTransfer;
                    var file = dt.files[0];
                    if (!file.type.match(/image.*/)) {
                        alert("이미지 파일만 업로드 가능합니다.");
                        return;
                    }
                    imageLoader(file);
                }, false);

                // 첨부된 이미지를 미리보기
                function imageLoader(file) {
                    var reader = new FileReader();
                    reader.onload = function (ee) {
                        let img = document.createElement('img');
                        img.setAttribute('style', img_style);
                        img.src = ee.target.result;
                        attZone.innerHTML = '';// 기존 내용 비우기
                        attZone.appendChild(makeDiv(img));//첨부된 div밀어넣기
                        attZone.classList.add('file-attached'); // 파일 첨부됨을 나타내는 클래스 추가 -> 관련 css로 배경이미지 안보이게 하기

                        self.shopInfo.dProfile = file;//디자이너 프로필에 이미지 할당하기.
                    };
                    reader.readAsDataURL(file);
                }

                // 첨부된 파일이 있는 경우 미리보기를 생성하는 함수
                function makeDiv(img) {
                    var div = document.createElement('div');
                    div.setAttribute('style', div_style);

                    div.appendChild(img);
                    return div;
                }
            })('att_zone3', 'btnAtt3');
        },
        
            
   })
</script>
<style>
</style>
  