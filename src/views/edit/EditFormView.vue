<template>
    <div id="wrap">
        <ManagerHeader />
          <div class="container3">
            <!-- 타이틀 -->
            <div class="eTitle">
                <input type="text" placeholder="타이틀">
                <input type="text" placeholder="부제목 들어갈 곳">
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
                            <input type="file">
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
  
   export default defineComponent({
       name: "EditView",
       components: {
            ManagerFooter,
            ManagerHeader,
            TopButton
       },
       data() {
           
       },
       setup() {

        },
       methods: {
        
  
       },
       mounted() {

            // imageView 함수를 호출하여 이미지 업로드 및 미리보기를 설정
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



                // 첨부된 이미리들을 배열에 넣고 미리보기
                function imageLoader(file) {
                    if (sel_files.length >= 5) { // 이미 5개 이상인 경우 추가하지 않음
                        alert("최대 5장까지만 첨부할 수 있습니다.");
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
            })('att_zone', 'btnAtt');

            // ==========미용컷 첨부파일==========
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



                // 첨부된 이미리들을 배열에 넣고 미리보기
                function imageLoader(file) {
                    if (sel_files.length >= 20) { // 이미 5개 이상인 경우 추가하지 않음
                        alert("최대 20장까지만 첨부할 수 있습니다.");
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
            })('att_zone2', 'btnAtt2');


            },
   })
</script>
<style>
</style>
  