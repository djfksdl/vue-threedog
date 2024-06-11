<template>
    <div id="wrap">
        <AppHeader />
        <div id="reservationForm">
            <SideBar />
            <div class="container8">
                <h1>예약하기</h1>

                <div>
                    <div class="managerInfor">
                        <div class="managerInfor2" style="display: flex">
                            <div>
                                <img  v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${businessVo.logo}`"
                                    style="width: 220px;height: 220px; border-radius: 5%; border: 1px solid #a7a4a4;">
                            </div>

                            <div class="managerInfor3">
                                <label>매장명</label>
                                <p>{{ businessVo.title }}</p>
                                <label>전화번호</label>
                                <p>{{ businessVo.bPhone }}</p>
                                <label>장소</label>
                                <p>{{ businessVo.bAddress }} {{ businessVo.bdAddress }}</p>
                                <label>평균별점</label>
                                <!-- <p>⭐⭐⭐⭐⭐ {{ businessVo.averageStar }}</p> -->

                                <p class="star" style="margin-top: 2px;">
                                    <!-- Full stars -->
                                    <span v-for="i in Math.floor(businessVo.averageStar)" :key="i"
                                        style="padding: none;"><img src="@/assets/images/star_yellow.jpg"
                                            style="width: 15px;"></span>
                                    <!-- Half star -->
                                    <span v-if="businessVo.averageStar - Math.floor(businessVo.averageStar) >= 0.5"><img
                                            src="@/assets/images/star_ban.png" style="width: 15px;"></span>
                                    <!-- Empty stars -->
                                    <span v-for="i in 5 - Math.ceil(businessVo.averageStar)" :key="'empty_' + i"><img
                                            src="@/assets/images/star_gray.jpg" style="width: 15px;"></span>
                                    {{ businessVo.averageStar }}
                                </p>


                            </div>
                        </div>
                    </div>

                </div>

                <div>
                    
                    <div class="buttonCon">
                        <button
                            :style="{ backgroundColor: currentStep >= 1 ? '#236c3f' : '', color: currentStep === 1 ? 'white' : '' }"
                            @click="setStep(1)"> <span :style="{ color: currentStep >= 1 ? 'white' : '' }">1. 날짜 및
                                시간선택</span></button>
                        <span>></span>
                        <button
                            :style="{ backgroundColor: currentStep >= 2 ? '#236c3f' : '', color: currentStep === 2 ? 'white' : '' }"
                            @click="setStep(2)"> <span :style="{ color: currentStep >= 2 ? 'white' : '' }">2. 반려견 정보</span>
                        </button>
                        <span>></span>
                        <button
                            :style="{ backgroundColor: currentStep >= 3 ? '#236c3f' : '', color: currentStep === 3 ? 'white' : '' }"
                            @click="setStep(3)"> <span :style="{ color: currentStep >= 3 ? 'white' : '' }">3. 미용선택 및 예상금액</span>
                        </button>
                        <span>></span>
                        <button
                            :style="{ backgroundColor: currentStep >= 4 ? '#236c3f' : '', color: currentStep === 4 ? 'white' : '' }"
                            @click="setStep(4)"> <span :style="{ color: currentStep >= 4 ? 'white' : '' }">4. 주의사항 및
                                동의서</span> </button>

                    </div>


                    <form v-on:submit.prevent="reserveInsert">
                        <div>
                            <div v-if="currentStep == 1">
                                <div>
                                    <h2>📅 날짜와 시간을 선택해주세요</h2>
                                </div>
                                <div class="choiceBox">
                                    <div class="calendar">
                                        <Datepicker @selectedDateTime="handleSelectedDateTime" />
                                    </div>
                                </div>

                                <div class="setstepBtnCon1" v-if="reserveVo.rtNo">
                                    <button @click="setStep(2)">선택</button>
                                </div>

                            </div>
                            <div class="reservationBox">
                                <div v-if="currentStep == 2">
                                    <div style="display: flex">
                                        <div class="petChoice">
                                            <h2>🐶 반려견선택</h2>

                                            <!-- <div class="petChoice" style="font-size: 16px; font-weight: bold">반려견 선택</div> -->
                                            <span v-for="dogVo in dogList" :key="dogVo.dogNo">
                                                <!-- {{ dogVo.dogNo }} -->
                                                <label :for="'pet-' + dogVo.dogNo">{{ dogVo.dogName }}</label>
                                                <input type="radio" name="pet" :id="'pet-' + dogVo.dogNo"
                                                    :value="dogVo.dogNo" @change="selectedDogClick"
                                                    v-model="selectedDog">
                                            </span>

                                        </div>

                                        <div class="character" v-if="dogVo.dogNo">
                                            <h2>📝 특이사항</h2>
                                            <button type="button"
                                                :style="{ backgroundColor: dogVo.skin ? '#236C3F' : 'white', color: dogVo.skin ? 'white' : 'black' }"
                                                @click="toggleSkinStatus">피부병</button>
                                            <button type="button"
                                                :style="{ backgroundColor: dogVo.heart ? '#236C3F' : 'white', color: dogVo.heart ? 'white' : 'black' }"
                                                @click="toggleHeartStatus">심장질환</button>
                                            <button type="button"
                                                :style="{ backgroundColor: dogVo.marking ? '#236C3F' : 'white', color: dogVo.marking ? 'white' : 'black' }"
                                                @click="toggleMarkingStatus">마킹</button>
                                            <button type="button"
                                                :style="{ backgroundColor: dogVo.mounting ? '#236C3F' : 'white', color: dogVo.mounting ? 'white' : 'black' }"
                                                @click="toggleMountingStatus">마운팅</button>


                                            <div class="bite">
                                                <div class="biteRange">
                                                    <label style="font-weight: bold;">입질정도</label>
                                                    <div class="biteRange2">

                                                        <input type="range" min="1" max="3" step="1" list="tickmarks"
                                                            v-model="dogVo.bite">
                                                        <datalist id="tickmarks">
                                                            <option value="1"></option>
                                                            <option value="2"></option>
                                                            <option value="3"></option>
                                                        </datalist>
                                                    </div>
                                                </div>
                                                <div class="pbox">
                                                    <p>하</p>
                                                    <p>중</p>
                                                    <p>상</p>
                                                </div>



                                            </div>
                                            <textarea placeholder="기타 특이사항을 적어주세요." v-model="dogVo.memo"></textarea>
                                        </div>
                                    </div>

                                    <div class="setstepBtnCon2" >
                                        <button class="setstepBtn1" @click="setStep(1)">이전으로 이동</button>
                                        <button v-if="dogVo.dogNo" @click="setStep(3)">선택</button>
                                    </div>

                                </div>


                                <div v-if="currentStep == 3">
                                    <div class="price">
                                        <!-- {{ dogVo.size }} -->
                                        <p>표 목록을 선택하세요.</p>
                                        <div class="tableBox">
                                            <!-- 소형견 -->
                                            <table v-if="dogVo.size === '소형견'" style="width: 650px;">
                                                <thead>
                                                    <tr>
                                                        <th>몸무게</th>
                                                        <th>목욕</th>
                                                        <th>부분</th>
                                                        <th>목욕+부분</th>
                                                        <th>얼굴+부분+목욕</th>
                                                        <th colspan="2">기본전체미용</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-for="(priceVo, i) in priceList" :key="i">
                                                    <tr v-if="i % 5 == 0">
                                                        <th>{{ priceVo.weightDiv }}</th>
                                                        <td :class="{ selected: selectedPriceIndex == i }"
                                                            @click="addPrice(priceVo.onePrice, i)">{{
                                    priceVo.onePrice.toLocaleString() }}</td>
                                                        <td :class="{ selected: selectedPriceIndex == i + 1 }"
                                                            @click="addPrice(priceList[i + 1]?.onePrice, i + 1)">{{
                                    priceList[i
                                        +
                                        1]?.onePrice.toLocaleString() }}</td>
                                                        <td :class="{ selected: selectedPriceIndex == i + 2 }"
                                                            @click="addPrice(priceList[i + 2]?.onePrice, i + 2)">{{
                                    priceList[i
                                        +
                                        2]?.onePrice.toLocaleString() }}</td>
                                                        <td :class="{ selected: selectedPriceIndex == i + 3 }"
                                                            @click="addPrice(priceList[i + 3]?.onePrice, i + 3)">{{
                                    priceList[i
                                        +
                                        3]?.onePrice.toLocaleString() }}</td>
                                                        <td :class="{ selected: selectedPriceIndex == i + 4 }"
                                                            @click="addPrice(priceList[i + 4]?.onePrice, i + 4)">{{
                                    priceList[i
                                        +
                                        4]?.onePrice.toLocaleString() }}</td>
                                                    </tr>
                                                </tbody>


                                            </table>

                                            <!-- 중형견 -->
                                            <table v-if="dogVo.size === '중형견'" style="width: 650px;">
                                                <thead>
                                                    <tr>
                                                        <th>몸무게</th>
                                                        <th>목욕</th>
                                                        <th>부분</th>
                                                        <th>목욕+부분</th>
                                                        <th>얼굴+부분+목욕</th>
                                                        <th colspan="2">기본전체미용</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-for="(priceVo, i) in priceList" :key="i">
                                                    <tr v-if="i % 5 == 0">
                                                        <th>{{ priceVo.weightDiv }}</th>
                                                        <td :class="{ selected: selectedPriceIndex == i }"
                                                            @click="addPrice(priceVo.onePrice, i)">{{
                                    priceVo.onePrice.toLocaleString() }}</td>
                                                        <td :class="{ selected: selectedPriceIndex == i + 1 }"
                                                            @click="addPrice(priceList[i + 1]?.onePrice, i + 1)">{{
                                    priceList[i
                                        +
                                        1]?.onePrice.toLocaleString() }}</td>
                                                        <td :class="{ selected: selectedPriceIndex == i + 2 }"
                                                            @click="addPrice(priceList[i + 2]?.onePrice, i + 2)">{{
                                    priceList[i
                                        +
                                        2]?.onePrice.toLocaleString() }}</td>
                                                        <td :class="{ selected: selectedPriceIndex == i + 3 }"
                                                            @click="addPrice(priceList[i + 3]?.onePrice, i + 3)">{{
                                    priceList[i
                                        +
                                        3]?.onePrice.toLocaleString() }}</td>
                                                        <td :class="{ selected: selectedPriceIndex == i + 4 }"
                                                            @click="addPrice(priceList[i + 4]?.onePrice, i + 4)">{{
                                    priceList[i
                                        +
                                        4]?.onePrice.toLocaleString() }}</td>
                                                    </tr>

                                                </tbody>


                                            </table>

                                            <!-- 특수견 -->
                                            <table v-if="dogVo.size == '특수견'">
                                                <thead>
                                                    <tr>
                                                        <th>몸무게</th>
                                                        <th>목욕</th>
                                                        <th>부분</th>
                                                        <th>목욕+부분</th>
                                                        <th>얼굴+부분+목욕</th>
                                                        <th>스포팅</th>
                                                        <th>가위컷</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-for="(priceVo, i) in priceList" :key="i">
                                                    <tr v-if="i % 6 == 0">
                                                        <th>{{ priceVo.weightDiv }}</th>
                                                        <td :class="{ selected: selectedPriceIndex == i }"
                                                            @click="addPrice(priceList[i]?.onePrice, i)">{{
                                    priceVo.onePrice.toLocaleString()
                                }}</td>
                                                        <td :class="{ selected: selectedPriceIndex == i + 1 }"
                                                            @click="addPrice(priceList[i + 1]?.onePrice, i + 1)">{{
                                    priceList[i
                                        +
                                        1]?.onePrice.toLocaleString() }}</td>
                                                        <td :class="{ selected: selectedPriceIndex == i + 2 }"
                                                            @click="addPrice(priceList[i + 2]?.onePrice, i + 2)">{{
                                    priceList[i
                                        +
                                        2]?.onePrice.toLocaleString() }}</td>
                                                        <td :class="{ selected: selectedPriceIndex == i + 3 }"
                                                            @click="addPrice(priceList[i + 3]?.onePrice, i + 3)">{{
                                    priceList[i
                                        +
                                        3]?.onePrice.toLocaleString() }}</td>
                                                        <td :class="{ selected: selectedPriceIndex == i + 4 }"
                                                            @click="addPrice(priceList[i + 4]?.onePrice, i + 4)">{{
                                    priceList[i
                                        +
                                        4]?.onePrice.toLocaleString() }}</td>
                                                        <td :class="{ selected: selectedPriceIndex == i + 5 }"
                                                            @click="addPrice(priceList[i + 5]?.onePrice, i + 5)">{{
                                    priceList[i
                                        +
                                                            5]?.onePrice.toLocaleString() }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>


                                        </div>
                                        <table style="width: 650px;">
                                            <tbody>
                                                <tr>
                                                    <th rowspan="7">추가요금</th>
                                                </tr>
                                                <tr v-for="(priceList2, i) in priceList2" :key="i">
                                                    <th>{{ priceList2.beauty }}</th>
                                                    <td :class="{ 'selected': priceList2.selected }"
                                                        @click="toggleSelected(priceList2)">{{
                                                        priceList2.onePrice.toLocaleString()
                                                        }}</td>
                                                </tr>
                                            </tbody>
                                        </table>


                                    </div>


                                    <div class="expectPrice">
                                        <div> 예상가격</div>
                                        <div style="font-weight: bold;">{{ (this.reserveVo.expectedPrice -
                                            this.usePoint).toLocaleString()
                                            }}<span style=" font-weight: lighter; "> 원</span></div>
                                    </div>

                                    <div class="setstepBtnCon3">
                                        <button class="setstepBtn1" @click="moveToStep(2)">이전으로 이동</button>
                                        <button  v-if="this.reserveVo.expectedPrice!==0" @click="moveToStep(4)">다음으로 이동</button>
                                    </div>

                                </div>

                                <div v-if="currentStep == 4">



                                    <div class="notice">
                                        <h2> ⚠️ 안내사항 및 미용시 주의사항</h2>
                                        <!-- <label for="notice">안내사항 및 미용시 주의사항</label> -->
                                        <div id="notice">
                                            <strong>안내사항</strong><br>
                                            <p>1. 미용 후 추가 요금이 발생할 수 있습니다. (예약금제외)</p>
                                            <p>2. 심장병/당뇨/고혈압 / 발작 등의 지병 기타 사나움 등의 요인으로 미용을 중단할 수 있습니다. 이에 해당하는 반려견 미용 중
                                                또는
                                                미용 후
                                                문제시
                                                책임을
                                                지지 않습니다. (이로인해 지불한 미용비는 환불되지 않습니다.)</p>
                                            <p>3. 사나운 반려견의 경우 사전에 알려주시기 바라며, 미용사의 물림 사고가 발생시 보호자에게 치료비를 청구할 수 있습니다.</p>
                                            <p>4. 이는 만일의 상황에 대한 동의서이니 견주의 충분한 이해와 양해를 부탁드립니다.</p>
                                            <br>

                                            <strong>[미용 후 주의사항]</strong>
                                            <p>1. 짧은 기계미용과 많은 털 엉킴이 있을시 미용 후 자극이 와서 긁거나 핥을 수 있습니다.</p>
                                            <p> - 우리 아가들의 피부는 사람에 비해 약하기 때문에 미용 후 긁거나 핥으면 상처가 나거나 진물, 심하면 피가 날수있습니다.
                                                우리아가가 지속적으로 핥고 긁기 전에 먼저 지켜봐 주시기 바랍니다.</p>
                                            <p> 2. 일시적으로 미용 스트레스가 올 수 있으나 대부분 2~5일 후 점차 사라지게 됩니다.</p>
                                            <p> - 밥을 먹지 않거나 구석에 숨어있는 다거나, 배변을 보지 않는 등 미용 전에는 없었던 행동을 보일 수 있답니다.</p>
                                            <p> 미용을 반복하다 보면 점차 좋아지기도 합니다. 푹 쉬게 안정을 취해주시고, 좋아하는 간식을 챙겨주시기 바랍니다.</p>
                                            <p> 3. 항문 주위의 털 정리와 항문낭 제거로 엉덩이를 끌고 다닐 수 있습니다.</p>
                                            <p> 4. 이중모(포메라니안, 스피츠, 폼피츠, 페키, 웰시 등) 아이들은 클리퍼로 몸을 미용했을 시 알로페이사증후군이 올 수 있으며,
                                            </p>
                                            <p>그로인해 털이 나지 않을 수 있습니다. 이를 숙지하시고 아이들의 미용스타일을 결정해주시기 바랍니다.</p>
                                            <p> - 가급적 가위컷 추천드립니다.</p>
                                            <p>5. 평소엔 털에 가려져 보이지 않았던 피부병이 미용 후에 발견될 수 있습니다.</p>
                                            <p> 6. 귀 질환이나 피부 질환이 있는 경우는 반드시 병원 치료를 받길 바랍니다.</p>
                                            <p> 7. 생식기 및 귀털 제거에서 자극을 최소화하기 위해 지저분해 보일 수 있는 점 양해 부탁드립니다.</p>
                                        </div>
                                        <div class="agreeCheckboxCon">
                                            <input type="checkbox" id="agreeCheckbox"><label for="agreeCheckbox">안내사항 및
                                                미용시
                                                주의사항에 동의합니다.</label>
                                        </div>
                                    </div>

                                    <div class="signBox">
                                        <h2> 🖊️ 전자서명 </h2>
                                        <div class="sign">
                                            <div>
                                                <canvas ref="signatureCanvas" v-on:mousedown="onBegin"
                                                    v-on:mouseup="onEnd" width="875" height="250"
                                                    style="border: 1px solid #000;">
                                                </canvas>
                                            </div>
                                            <div class="sign0">
                                                <button @click.prevent="clearCanvas">지우기</button>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="cal">
                                        <p>노쇼방지를 위해 예약금 20,000원을 받고 있습니다.</p>
                                        <button type="button" v-for="(payment, index) in paymentMethods" :key="index"
                                            @click="togglePayment(index)"
                                            :class="{ 'selected': selectedPayment === index }">
                                            {{ payment }}
                                        </button>
                                    </div>


                                    <div class="point">
                                        <label>포인트</label>
                                        <input type="number" step="10" v-model="usePoint">
                                        <button type="button" @click="useAllPoint">전액사용</button>
                                        <p>{{ (this.uPoint - this.usePoint).toLocaleString() }}P 사용가능</p>
                                    </div>


                                    <div class="setstepBtnCon4">
                                        <button class="setstepBtn1" @click="setStep(3)">이전으로 이동</button>
                                        <button class="reserveInsert" type="submit">예약</button>
                                    </div>
                                </div>





                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>


        <TopButton />
        <AppFooter />
    </div><!-- wrap -->
</template>

<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
import SignaturePad from 'signature_pad';
import axios from "axios"
import { mapActions } from 'vuex';
import '@/assets/css/mypage/mypage.css'
import Datepicker from '@/components/DatePicker.vue'
import SideBar from '@/components/SideBar.vue'
import TopButton from "@/components/TopButton.vue"






export default {
    name: "ReservationFormView",
    components: {
        AppHeader,
        AppFooter,
        Datepicker,
        SideBar,
        TopButton,

    },
    data() {
        return {
            currentStep: 1,
            selectedPriceIndex: null,
            signaturePad: null,
            reserveList: [],
            // 고객
            reserveVo: {
                rsNo: 0,
                bNo: this.$route.params.bNo,
                dogNo: 0,
                rtDate: "",
                rtTime: "",
                singImg: "",
                expectedPrice: 0,
                attitude: "",
                rContdition: "",
                tangle: "",
                disliked: "",
                bath: "",
                surcharge: 0,
                message: "",
                curruntWeight: 0,
                rtNo: 0,
                rtFinish: false,
            },
            // 사업자
            businessVo: {
                saveName: "",
                bNo: this.$route.params.bNo,
                title: "",
                bPhone: "",
                bAddress: "",
                bdAddress: "",
                averageStar: 0.0,
                rtDate: "",
                rsTime: "",
            },
            dogList: [],
            dogVo: {
                uNo: this.$store.state.authUser.uNo,
                dogNo: "",
                dogName: "",
                neutering: false,
                experience: false,
                bite: 0,
                memo: "",
                size: "",
                skin: false,
                heart: false,
                marking: false,
                mounting: false,
            },
            priceList: [],
            priceList2: [],
            priceVo: {
                priceNo: 0,
                beautyNo: 0,
                bNo: this.$route.params.bNo,
                onePrice: 0,
                sizeDiv: "",
                weightDiv: "",
                beauty: "",
                beauty2: [],
                priceNo2: [],
            },
            // 유저
            uNo: this.$store.state.authUser.uNo,
            uPoint: 0,
            isClicked: false,    //포인트버튼
            usePoint: 0,
            paymentMethods: ['휴대폰', '무통장입금'], // 사용 가능한 결제 방법
            selectedPayment: null, // 선택된 결제 방법 인덱스
            bNo:this.$route.params.bNo,

            

        };
    },

    watch: {
        currentStep(newVal) {
            if (newVal === 4) {
                this.initSignaturePad();
            }
        }
    },

    methods: {

        setStep(step) {
            this.currentStep = step;
        },
        moveToStep(step) {
            this.currentStep = step;
        },

        //가게정보
        getBList() {
            console.log("가게정보 가져오기");
            console.log(this.businessVo);
            let bNo = this.businessVo.bNo;
            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/getbList`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { bNo: bNo },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("성공");
                console.log(response.data.apiData); //수신데이타
                this.businessVo = response.data.apiData;

                console.log(this.businessList);
            }).catch(error => {
                console.log(error);
            });
        },

        // 날짜 시간
        handleSelectedDateTime(selected) {
            // 선택한 날짜와 시간 데이터를 받아서 처리합니다.
            console.log("과연?????????????????????");
            console.log('선택한 날짜:', selected.newDate);
            console.log('선택한 시간:', selected.time);
            console.log('선택한 시간 rtNo:', selected.rtNo);
            this.reserveVo.rtDate = selected.newDate;
            this.reserveVo.rtTime = selected.time;
            this.reserveVo.rtNo = selected.rtNo;



        },


        // 반려견선택
        getPetList() {
            console.log("내 반려견 가져오기");
            // console.log(this.dogVo)
            console.log(this.dogVo.uNo);
            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/getpetlist`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { uNo: this.dogVo.uNo },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("반려견성공");
                console.log(response.data.apiData); //수신데이타

                this.dogList = response.data.apiData;

                // 초기화
                this.addPrice();
                this.reserveVo.expectedPrice = 0;
                this.priceList.forEach(item => {
                    item.selected = false;
                });



            }).catch(error => {
                console.log(error);
            });
        },




        // 반려견정보 가져오기
        selectedDogClick() {
            console.log(this.selectedDog);
            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/getpetinfor`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { dogNo: this.selectedDog },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("성공");
                console.log(response.data.apiData); //수신데이타
                this.dogVo = response.data.apiData;



                // 초기화
                this.getPrice();
                this.getPlusPrice();
                this.reserveVo.expectedPrice = 0;
                this.priceVo.beauty2 = [];
                this.addPrice();


            }).catch(error => {
                console.log(error);
            });
        },

        // 특이사항 버튼
        toggleSkinStatus() {
            this.dogVo.skin = !this.dogVo.skin; // 피부병 상태 토글
        },
        toggleHeartStatus() {
            this.dogVo.heart = !this.dogVo.heart; // 심장질환 상태 토글
        },
        toggleMarkingStatus() {
            this.dogVo.marking = !this.dogVo.marking; // 마킹 상태 토글
        },
        toggleMountingStatus() {
            this.dogVo.mounting = !this.dogVo.mounting;
        },


        // 가격표가져오기
        getPrice() {
            console.log("가격표 가져오기");
            console.log("사업자번호 : ", this.priceVo.bNo);
            console.log("크기 : ", this.dogVo.size);
            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/getprice`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { bNo: this.priceVo.bNo, sizeDiv: this.dogVo.size },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("가격가져오기성공");
                console.log(response.data.apiData); //수신데이타
                this.priceList = response.data.apiData;

            }).catch(error => {
                console.log(error);
            });
        },

        // 추가요금가져오기
        getPlusPrice() {
            console.log("가격표-추가요금 가져오기");
            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/getplusprice`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { bNo: this.priceVo.bNo },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("가격표-추가요금 가져오기");
                console.log(response.data.apiData); //수신데이타
                this.priceList2 = response.data.apiData;

            }).catch(error => {
                console.log(error);
            });
        },

        // 추가요금 가격표
        toggleSelected(priceList2) {
            // 선택 상태를 토글합니다.
            priceList2.selected = !priceList2.selected;

            if (priceList2.selected) {
                console.log('선택한 값 :', priceList2.onePrice);
                this.reserveVo.expectedPrice += priceList2.onePrice; // 선택한 값의 누적을 수행합니다.

                // 가격표 No 출력 및 추가
                console.log("priceNo:", priceList2.priceNo);
                this.priceVo.priceNo2.push(priceList2.priceNo); // priceNo2 배열에 추가합니다.

                // 선택한 td의 가로의 th 값을 가져옵니다.
                const thValue = priceList2.beauty;
                console.log('선택한 td의 가로의 th 값:', thValue);
                this.priceVo.beauty2.push(thValue);
                console.log(this.priceVo.beauty2);

            } else {
                console.log('선택 취소한 값 :', priceList2.onePrice);
                this.reserveVo.expectedPrice -= priceList2.onePrice; // 선택 취소한 값의 차감을 수행합니다.

                // 선택 취소한 th 값을 beauty2 배열에서 제거합니다.
                const thIndex = this.priceVo.beauty2.indexOf(priceList2.beauty);
                if (thIndex > -1) {
                    this.priceVo.beauty2.splice(thIndex, 1);
                }

                // 선택 취소한 priceNo 값을 priceNo2 배열에서 제거합니다.
                const priceNoIndex = this.priceVo.priceNo2.indexOf(priceList2.priceNo);
                if (priceNoIndex > -1) {
                    this.priceVo.priceNo2.splice(priceNoIndex, 1);
                }
            }

            // 콘솔에 현재 예상 가격 출력
            console.log('현재 예상 가격 :', this.reserveVo.expectedPrice);
            // 콘솔에 현재 priceNo2 배열 출력
            console.log('현재 priceNo 배열 :', this.priceVo.priceNo2);
        }

        ,


        addPrice(price, index) {
            console.log("가격예상클릭");
            console.log("선택한 가격:", price);
            console.log("선택한 가격의 인덱스:", index);
            // 선택한 td의 열 인덱스 계산
            const colIndex = event.target.cellIndex;

            // table 요소 가져오기
            const table = event.target.closest('table');

            // 선택된 td와 동일한 열에 있는 thead의 th 요소 가져오기
            const theadTh = table.querySelector('thead th:nth-child(' + (colIndex + 1) + ')');

            // 선택된 td의 열에 있는 thead의 th의 내용 가져오기
            const firstThValue = theadTh.textContent;

            console.log("선택한 td의 전체 세로의 첫번째 th 값:", firstThValue);

            // 선택한 행의 인덱스 계산
            const rowIndex = Math.floor(index / 5) * 5;

            // 선택한 행의 첫 번째 열의 th 값
            const thValue = this.priceList[rowIndex + 1].weightDiv;

            console.log("선택한 행의 첫 번째 열의 th 값:", thValue);
            console.log(this.priceVo.priceNo);


            // 만약 이미 선택된 가격 항목이면 선택 해제
            if (this.selectedPriceIndex === index) {
                this.selectedPriceIndex = null;
                this.selectedPrice = 0;

                // 선택이 해제되면 예상가격에서 선택된 가격을 뺀다
                this.reserveVo.expectedPrice = 0;
            } else {
                // 선택된 가격이 없을 경우에만 새로운 가격을 선택
                // 이전에 선택된 가격이 있었다면, 먼저 그 가격을 예상가격에서 빼준다
                if (this.selectedPriceIndex !== null) {
                    this.reserveVo.expectedPrice = 0;
                }

                // 새로운 가격을 예상가격에 추가
                this.reserveVo.expectedPrice += price;
                this.selectedPriceIndex = index;
                this.selectedPrice = price; // 선택된 가격 업데이트

                // priceVo에 담기
                this.priceVo.onePrice = price;
                this.priceVo.weightDiv = thValue;
                this.priceVo.beauty = firstThValue;


                // firstThValue와 thValue에 맞는 priceNo 값을 priceList에서 찾기
                this.priceList.forEach(item => {
                    if (item.beauty === firstThValue && item.weightDiv === thValue) {
                        console.log("가격표 No:", item.priceNo);
                        this.priceVo.priceNo = item.priceNo;
                        console.log("가격표맞아??????????????");
                        console.log(this.priceVo.priceNo);
                    }
                });
            }

            // priceList2 배열의 모든 요소의 selected 속성을 초기화
            this.priceList2.forEach(item => {
                item.selected = false;
            });
        },


        // 포인트 전액사용 버튼
        useAllPoint() {
            this.usePoint = this.uPoint;
        },


        // 유저포인트
        getPoint() {
            console.log("유저포인트 가져오기");
            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/getpoint`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { uNo: this.dogVo.uNo },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("유저포인트 가져오기");
                console.log(response.data.apiData); //수신데이타
                this.uPoint = response.data.apiData.uPoint;
            }).catch(error => {
                console.log(error);
            });
        },

        // 결제방법 버튼
        togglePayment(index) {
            // 이미 선택된 결제 방법이라면 선택 취소하고, 아니라면 선택합니다.
            this.selectedPayment = this.selectedPayment === index ? null : index;
        },

        ...mapActions(['updateReservationData']),

        // 예약하기
        reserveInsert() {
            console.log(this.uNo);
            console.log(this.bNo);
            const formData = new FormData();

            // 서명이 비어 있는지 확인
            const canvas = this.$refs.signatureCanvas;
            const context = canvas.getContext('2d');
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
            const isEmpty = imageData.every(channel => channel === 0);

            if (!this.reserveVo.rtDate || !this.reserveVo.rtTime) {
                alert('날짜와 시간을 선택해주세요.');
            } else if (this.reserveVo.expectedPrice == 0) {
                alert("반려견을 선택하여 예약할 목록을 선택하세요.");
            }
            // else if (!document.getElementById('agreeCheckbox').checked) {
            //     alert('안내사항 및 미용시 주의사항에 동의해주세요.');
            // } 
            else if (isEmpty) {
                alert("서명을 해주세요.");
            } else {
                // Canvas를 이미지 파일로 변환하여 FormData에 추가
                const dataURL = canvas.toDataURL(); // Canvas를 Data URL로 변환
                const blob = this.dataURItoBlob(dataURL); // Data URL을 Blob으로 변환

                // Blob을 File 객체로 변환
                const imageFile = new File([blob], 'signature.png', { type: 'image/png' });


                // FormData에 이미지 파일 추가
                formData.append('signFile', imageFile);

                // 예약에 필요한 데이터 추가
                formData.append('rtDate', this.reserveVo.rtDate); 
                formData.append('rtTime', this.reserveVo.rtTime); 
                formData.append('dogNo', this.dogVo.dogNo); 
                formData.append('skin', this.dogVo.skin); 
                formData.append('heart', this.dogVo.heart); 
                formData.append('marking', this.dogVo.marking); 
                formData.append('mounting', this.dogVo.mounting);
                formData.append('bite', this.dogVo.bite); 
                formData.append('memo', this.dogVo.memo);
                formData.append('beauty', this.priceVo.beauty); 
                formData.append('onePrice', this.priceVo.onePrice); 
                formData.append('weightDiv', this.priceVo.weightDiv); 
                formData.append('expectedPrice', this.reserveVo.expectedPrice);
                formData.append('usePoint', this.usePoint);
                formData.append('bNo', this.reserveVo.bNo);
                formData.append('uNo', this.uNo);
                formData.append('rtNo', this.reserveVo.rtNo);
                formData.append('rtFinish', this.reserveVo.rtFinish);
                formData.append('priceNo', this.priceVo.priceNo); 
                formData.append('rsNo', this.reserveVo.rsNo);
                formData.append('bNo', this.bNo);

                this.priceVo.priceNo2.forEach((item, index) => {
                    formData.append(`priceNoPlus[${index}]`, item);
                });
                console.log("예약제바아아아아아아아아알");

                // 예약에 필요한 데이터 추가
                const reservationData = {
                    rtDate: this.reserveVo.rtDate,
                    rtTime: this.reserveVo.rtTime,
                    dogNo: this.dogVo.dogNo,
                    skin: this.dogVo.skin,
                    heart: this.dogVo.heart,
                    marking: this.dogVo.marking,
                    mounting: this.dogVo.mounting,
                    bite: this.dogVo.bite,
                    memo: this.dogVo.memo,
                    beauty: this.priceVo.beauty,
                    onePrice: this.priceVo.onePrice,
                    weightDiv: this.priceVo.weightDiv,
                    expectedPrice: this.reserveVo.expectedPrice,
                    usePoint: this.usePoint,
                    bNo: this.reserveVo.bNo,
                    uNo: this.uNo,
                    rtNo: this.reserveVo.rtNo,
                    rtFinish: this.reserveVo.rtFinish,
                    priceNo: this.priceVo.priceNo,
                    rsNum: this.reserveVo.rsNo,
                    priceNoPlus: this.priceVo.priceNo2,
                    title: this.businessVo.title,
                    dogName: this.dogVo.dogName,
                    beauty2: this.priceVo.beauty2,
                    bPhone: this.businessVo.bPhone,
                    bAddress: this.businessVo.bAddress,
                    bdAddress: this.businessVo.bdAddress,
                    saveName: this.businessVo.saveName

                };

                // Vuex 스토어에 데이터 저장
                this.updateReservationData(reservationData);

                axios({
                    method: 'post',
                    url: `${this.$store.state.apiBaseUrl}/api/mypage/reservation`,
                    headers: { "Content-Type": "multipart/form-data" },
                    data: formData,
                    responseType: 'json'
                }).then(response => {
                    console.log(response.data);
                    if (response.data.result == "success") {
                        console.log("예약하기성공!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

                        this.$router.push('/reservationsuccess');




                    } else {
                        alert("알수없는 오류");
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        },


        // 전자서명 Blob
        dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        },

        clearCanvas() {
            const canvas = this.$refs.signatureCanvas;
            if (canvas) {
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        },
        onBegin() {
            if (this.signaturePad) {
                this.signaturePad.onBegin();
            }
        },
        onEnd() {
            if (this.signaturePad) {
                this.signaturePad.onEnd();
            }
        },
        getSignatureImage() {
            // 서명이 입력되지 않았을 때 빈 문자열 반환
            if (this.signaturePad.isEmpty()) {
                return '';
            }

            // 서명을 이미지로 변환하여 반환
            return this.signaturePad.toDataURL();
        }
        ,

        initSignaturePad() {
            this.$nextTick(() => {
                const canvas = this.$refs.signatureCanvas;
                if (canvas) {
                    this.signaturePad = new SignaturePad(canvas);
                } else {
                    console.error('Canvas element not found');
                }
            });
        },



    },

    mounted() {
        if (this.currentStep == 4) {
            this.initSignaturePad();
            const canvas = this.$refs.signatureCanvas;
            this.signaturePad = new SignaturePad(canvas);
        }
    },

    created() {
        this.getBList();
        this.getPetList();
        this.getPoint();
    }
};
</script>

<style>
#reservationForm .selected {
    background-color: #236C3F !important;
    color: #ffffff !important;
}

canvas {
    border: 1px solid #a7a4a4;
    width: 875px;
    height: 250px;
    border-radius: 10px;
}

.sign0 {
    width: 875px;
    /* background-color: red; */
    text-align: end;
}

.sign0 button {
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
}
</style>
