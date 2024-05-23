<template>
    <!-- 첨부파일 2개 완료! -->
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
                    <!-- 타이틀 -->
                    <div class="eTitle">
                        <input type="text" placeholder="타이틀">
                        <input type="text" placeholder="부제목 들어갈 곳">
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
                                <input type="text" placeholder="이름을 입력하세요">
                            </div>
                            <div class="eJobBox">
                                <label>직책:</label>
                                <input type="text" placeholder="ex)원장">
                            </div>
                            <!-- <h2>이서현 원장</h2> -->
                            <div class="eCareerBox">
                                <!-- <h3>경력</h3> -->
                                <label>경력:</label>
                                <textarea class="eCareerBoxInfo" placeholder="ex)-2000년 애견미용강사&#10;   -2002년 '깔끔하개' 개원"></textarea>
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
                            <tr v-for="(price, index) in smallDogPrices" :key="index">
                                <th>{{ price.weightDiv }}</th>
                                <td><input type="text" v-model="price.목욕"></td>
                                <td><input type="text" v-model="price.부분"></td>
                                <td><input type="text" v-model="price.목욕_부분"></td>
                                <td><input type="text" v-model="price.얼굴_부분_목욕"></td>
                                <td colspan="2"><input type="text" v-model="price.기본전체미용"></td>
                            </tr>
                        
                            <!-- 중형견 -->
                            <tr>
                                <th colspan="7" class="eNonBorder">중형견(슈나, 코카 등...)</th>
                            </tr>
                            <tr v-for="(price, index) in mediumDogPrices" :key="index">
                                <th>{{ price.weightDiv }}</th>
                                <td><input type="text" v-model="price.목욕"></td>
                                <td><input type="text" v-model="price.부분"></td>
                                <td><input type="text" v-model="price.목욕_부분"></td>
                                <td><input type="text" v-model="price.얼굴_부분_목욕"></td>
                                <td colspan="2"><input type="text" v-model="price.기본전체미용"></td>
                            </tr>
                            <!-- 특수견 -->
                            <tr>
                                <th colspan="7" class="eNonBorder">특수견(비숑. 베들링턴 등...)</th>
                            </tr>
                            <tr v-for="(price, index) in specialDogPrices" :key="index">
                                <th>{{ price.weightDiv }}</th>
                                <td><input type="text" v-model="price.목욕"></td>
                                <td><input type="text" v-model="price.부분"></td>
                                <td><input type="text" v-model="price.목욕_부분"></td>
                                <td><input type="text" v-model="price.얼굴_부분_목욕"></td>
                                <td><input type="text" v-model="price.스포팅"></td>
                                <td><input type="text" v-model="price.가위컷"></td>
                            </tr>
                            <!-- 추가요금 -->
                            <tr>
                                <th colspan="7">&nbsp;</th>
                            </tr>
                            <tr>
                                <th rowspan="4" class="eNonBorder2">추가요금</th>
                                <th>가위컷</th>
                                <td><input type="text" v-model="additionalCharges.컷"></td>
                                <th>특수얼굴컷</th>
                                <td colspan="3"><input type="text" v-model="additionalCharges.특수얼굴컷"></td>
                            </tr>
                            <tr>
                                <th>엉킴</th>
                                <td><input type="text" v-model="additionalCharges.엉킴"></td>
                                <th>투톤 염색</th>
                                <td colspan="3"><input type="text" v-model="additionalCharges.투톤염색"></td>
                            </tr>
                            <tr>
                                <th>기장</th>
                                <td><input type="text" v-model="additionalCharges.기장"></td>
                                <th>염색</th>
                                <td colspan="3"><input type="text" v-model="additionalCharges.염색"></td>
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
                                <div class="eTimeRight">
                                    <div class="eTimeRightTitle">
                                        <p>평일</p>
                                        <p>토요일</p>
                                        <p>점심시간</p>
                                        <p>공휴일/주말</p>
                                    </div>
                                    <div class="eTimeRightContents">
                                        <textarea placeholder="ex)am 9:00~ pm18:00&#10;   am 9:00~ pm15:00&#10;   pm 12:00~ pm13:00&#10;   영업종료"></textarea>
                                        
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
                                        <p>서울특별시 강남구 봉은사로 317(213426)</p>
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
import { defineComponent } from "vue";

    const coordinate = {
        lat: 37.498085,
        lng: 127.027978
    };
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
                priceList:[],
                additionalCharges: {}
            }
        },
        computed: {
            // 가격표 필터링
            smallDogPrices() {
                return this.priceList.filter(price => price.sizeDiv === '소형견');
            },
            mediumDogPrices() {
                return this.priceList.filter(price => price.sizeDiv === '중형견');
            },
            specialDogPrices() {
                return this.priceList.filter(price => price.sizeDiv === '특수견');
            },
            
        },
        methods: {

            //가격표 불러오기
            getPrice(){
                // console.log("값 가져오기");
                axios({
                    method: 'get', // put, post, delete 
                    url: `${this.$store.state.apiBaseUrl}/api/su/firstprice`,
                    headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                    // params: {uId: this.userVo.uId}, //get방식 파라미터로 값이 전달
                    // data: this.userVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                    responseType: 'json' //수신타입
                }).then(response => {
                    console.log(response.data.apiData); //수신데이타

                    this.priceList = response.data.apiData;

                    // 추가요금 데이터 설정 - priceList안에 있는 값 쓸 수 있도록
                    const additionalCharges = this.priceList.find(price => price.sizeDiv === '추가요금');
                    if (additionalCharges) {
                        this.additionalCharges = additionalCharges;
                    }

                }).catch(error => {
                    console.log(error);
                });
            },

            // 가게 정보 불러오기
            getShopInfo(){
                // console.log("가게 정보 불러오기");
                axios({
                    method: 'get', // put, post, delete 
                    url: `${this.$store.state.apiBaseUrl}/api/su/shopInfo`,
                    headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                    // params: {uId: this.userVo.uId}, //get방식 파라미터로 값이 전달
                    // data: this.userVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                    responseType: 'json' //수신타입
                }).then(response => {
                    console.log(response.data.apiData); //수신데이타

                    console.log("불러왔지롱");

                    

                }).catch(error => {
                    console.log(error);
                });
            }
  
        },
        created(){
            this.getPrice();
            this.getShopInfo();
        },
        mounted() {

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
  