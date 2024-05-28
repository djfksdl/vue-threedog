<template>
    <div id="wrap">
        <AppHeader />
        <div id="reservationForm">
            <SideBar />
            <div class="container">
                <div class="h2Box1">
                    <h2>가게정보</h2>
                </div>
                <div class="managerInfor">
                    <div class="managerInfor2">
                        <div>
                            <img v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${businessVo.logo}`"
                                style="margin-left:30px; width: 220px;height: 220px; border-radius: 5%;">
                        </div>
                        <div class="managerInfor3">
                            <label>매장명</label>
                            <p>{{ businessVo.title }}</p>
                            <label>전화번호</label>
                            <p>{{ businessVo.bPhone }}</p>
                            <label>장소</label>
                            <p>{{ businessVo.bAddress }} {{ businessVo.bdAddress }}</p>
                            <label>평균별점</label>
                            <p>⭐⭐⭐⭐⭐ {{ businessVo.averageStar }}</p>
                        </div>
                    </div>

                </div>
                <form>
                    <h2>📅 날짜와 시간을 선택해주세요</h2>
                    <div class="choiceBox">
                        <div class="calendar">
                            <Datepicker />
                        </div>

                        <div class="time">

                            <!--                             
                            <p>오전</p>
                            <button type="button" :class="{ selected: reserveVo.rsTime === '10:00' }"
                                @click="toggleTime('10:00')">10:00</button>
                            <button type="button" :class="{ selected: reserveVo.rsTime === '10:30' }"
                                @click="toggleTime('10:30')">10:30</button>
                            <button type="button" :class="{ selected: reserveVo.rsTime === '11:00' }"
                                @click="toggleTime('11:00')">11:00</button>
                            <button type="button" :class="{ selected: reserveVo.rsTime === '11:30' }"
                                @click="toggleTime('11:30')">11:30</button>
                            <p>오후</p>
                            <button type="button" :class="{ selected: reserveVo.rsTime === '14:00' }"
                                @click="toggleTime('14:00')">14:00</button>
                            <button type="button" :class="{ selected: reserveVo.rsTime === '14:30' }"
                                @click="toggleTime('14:30')">14:30</button>
                            <button type="button" :class="{ selected: reserveVo.rsTime === '15:00' }"
                                @click="toggleTime('15:00')">15:00</button>
                            <button type="button" :class="{ selected: reserveVo.rsTime === '15:30' }"
                                @click="toggleTime('15:30')">15:30</button>
                            <button type="button" :class="{ selected: reserveVo.rsTime === '16:00' }"
                                @click="toggleTime('16:00')">16:00</button>
                            <button type="button" :class="{ selected: reserveVo.rsTime === '16:30' }"
                                @click="toggleTime('16:30')">16:30</button>
                            <button type="button" :class="{ selected: reserveVo.rsTime === '17:00' }"
                                @click="toggleTime('17:00')">17:00</button> -->
                        </div>
                        <!-- {{ this.reserveVo.rsTime }} -->
                        <!-- v-bind:key="i" v-for="(reserveVo, i) in reserveList" -->
                    </div>
                    <div class="reservationBox">

                        <div class="petChoice">
                            <div class="petChoice" style="font-size: 16px; font-weight: bold">반려견 선택</div>
                            <span v-for="dogVo in dogList" :key="dogVo.dogNo">
                                {{ dogVo.dogNo }}
                                <label :for="'pet-' + dogVo.dogNo">{{ dogVo.dogName }}</label>
                                <input type="radio" name="pet" :id="'pet-' + dogVo.dogNo" :value="dogVo.dogNo"
                                    @change="selectedDogClick" v-model="selectedDog">
                            </span>

                        </div>

                        <div class="character">
                            <label>특이사항</label>
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
                                    <label>입질정도</label>
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




                        <div class="price">

                            <!-- {{ dogVo.size }} -->
                            <!-- <span>크기선택</span>
                            <label for="small">소형견</label><input id="small" type="radio" name="size" value="소형견"
                                v-bind:checked="dogVo.size == '소형견'" v-model="dogVo.size">
                            <label for="middle">중형견</label><input id="middle" type="radio" name="size" value="중형견"
                                v-bind:checked="dogVo.size == '중형견'" v-model="dogVo.size">
                            <label for="big">특수견</label><input id="big" type="radio" name="size" value="특수견"
                                v-bind:checked="dogVo.size == '특수견'" v-model="dogVo.size"> -->

                            {{ dogVo.size }}
                            <div class="tableBox">
                                <!-- 소형견, 중형견 -->
                                <table v-if="dogVo.size === '소형견' || dogVo.size === '중형견'" style="width: 650px;">
                                    <!-- <tr>
                                     <th colspan="7" class="eNonBorder">소형견(말티즈, 요크셔, 시츄, 푸들 등...)</th>
                                    </tr> -->
                                    <!-- v-for="(priceVo, i) in priceList" v-bind:key="i" -->
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
                                            <td>{{ priceVo.onePrice }}</td>
                                            <td>{{ priceList[i + 1]?.onePrice }}</td>
                                            <td>{{ priceList[i + 2]?.onePrice }}</td>
                                            <td>{{ priceList[i + 3]?.onePrice }}</td>
                                            <td>{{ priceList[i + 4]?.onePrice }}</td>
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
                                            <td>{{ priceVo.onePrice }}</td>
                                            <td>{{ priceList[i + 1]?.onePrice }}</td>
                                            <td>{{ priceList[i + 2]?.onePrice }}</td>
                                            <td>{{ priceList[i + 3]?.onePrice }}</td>
                                            <td>{{ priceList[i + 4]?.onePrice }}</td>
                                            <td>{{ priceList[i + 5]?.onePrice }}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                
                            </div>
                            <table style="width: 650px;">
                                    <tr>
                                        <th rowspan="4">추가요금</th>
                                        <th>가위컷</th>
                                        <td>25,000</td>
                                        <th>가위컷</th>
                                        <td>25,000</td>
                                    </tr>
                                    <tr>
                                        <th>썸머</th>
                                        <td>10,000</td>
                                        <th>투톤염색</th>
                                        <td>10,000</td>
                                    </tr>
                                    <tr>
                                        <th>기장</th>
                                        <td>5,000</td>
                                        <th>염색</th>
                                        <td>5,000</td>
                                    </tr>
                                    <tr>
                                        <th>엉킴</th>
                                        <td>5,000</td>
                                        <th>특수견</th>
                                        <td>7,000</td>
                                    </tr>
                                </table>
                        </div>
                        




                        <div class="expectPrice">
                            <p>예상가격 {{ estimatedPrice }}원</p>
                        </div>

                        <div class="point">
                            <label>포인트</label>
                            <input type="text">
                            <button type="button">사용</button>
                            <p>1500P 사용가능</p>
                        </div>

                        <div class="notice">
                            <label for="notice">안내사항 및 미용시 주의사항</label>
                            <div id="notice">
                                <strong>안내사항</strong><br>
                                1. 미용 후 추가 요금이 발생할 수 있습니다. (예약금제외)<br>
                                2. 심장병/당뇨/고혈압 / 발작 등의 지병 기타 사나움 등의 요인으로 미용을 중단할 수 있습니다. 이에 해당하는 반려견 미용 중 또는 미용 후 문제시 책임을
                                지지 않습니다. (이로인해 지불한 미용비는 환불되지 않습니다.)<br>
                                3. 사나운 반려견의 경우 사전에 알려주시기 바라며, 미용사의 물림 사고가 발생시 보호자에게 치료비를 청구할 수 있습니다.<br>
                                4. 이는 만일의 상황에 대한 동의서이니 견주의 충분한 이해와 양해를 부탁드립니다.<br>
                                <br>
                                <strong>[미용 후 주의사항]</strong><br>
                                1. 짧은 기계미용과 많은 털 엉킴이 있을시 미용 후 자극이 와서 긁거나 핥을 수 있습니다.<br>
                                - 우리 아가들의 피부는 사람에 비해 약하기 때문에 미용 후 긁거나 핥으면 상처가 나거나 진물, 심하면 피가 날수있습니다.<br>
                                우리아가가 지속적으로 핥고 긁기 전에 먼저 지켜봐 주시기 바랍니다.<br>
                                2. 일시적으로 미용 스트레스가 올 수 있으나 대부분 2~5일 후 점차 사라지게 됩니다.<br>
                                - 밥을 먹지 않거나 구석에 숨어있는 다거나, 배변을 보지 않는 등 미용 전에는 없었던 행동을 보일 수 있답니다.<br>
                                미용을 반복하다 보면 점차 좋아지기도 합니다. 푹 쉬게 안정을 취해주시고, 좋아하는 간식을 챙겨주시기 바랍니다.<br>
                                3. 항문 주위의 털 정리와 항문낭 제거로 엉덩이를 끌고 다닐 수 있습니다.<br>
                                4. 이중모(포메라니안, 스피츠, 폼피츠, 페키, 웰시 등) 아이들은 클리퍼로 몸을 미용했을 시 알로페이사증후군이 올 수 있으며,
                                그로인해 털이 나지 않을 수 있습니다. 이를 숙지하시고 아이들의 미용스타일을 결정해주시기 바랍니다.<br>
                                - 가급적 가위컷 추천드립니다.<br>
                                5. 평소엔 털에 가려져 보이지 않았던 피부병이 미용 후에 발견될 수 있습니다.<br>
                                6. 귀 질환이나 피부 질환이 있는 경우는 반드시 병원 치료를 받길 바랍니다.<br>
                                7. 생식기 및 귀털 제거에서 자극을 최소화하기 위해 지저분해 보일 수 있는 점 양해 부탁드립니다.<br>
                            </div>
                            <div>
                                <input type="checkbox">안내사항 및 미용시 주의사항에 동의합니다.
                            </div>
                        </div>



                        <div class="signBox">
                            <label>전자서명</label>
                            <div class="sign">
                                <SignaturePad />
                            </div>
                        </div>

                        <div class="cal">
                            <p>노쇼방지를 위해 예약금 20,000원을 받고 있습니다.</p>
                            <button type="button">휴대폰</button>
                            <button type="button">무통장입금</button>
                        </div>
                    </div>
                </form>
                <div class="subBtn">
                    <button type="submit">예약</button>
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

import axios from "axios"

import '@/assets/css/mypage/mypage.css'
import Datepicker from '@/components/DatePicker.vue'
import SideBar from '@/components/SideBar.vue'
import SignaturePad from "@/components/SignaturePad.vue"
import TopButton from "@/components/TopButton.vue"




export default {
    name: "ReservationFormView",
    components: {
        AppHeader,
        AppFooter,
        Datepicker,
        SideBar,
        TopButton,
        SignaturePad,

    },
    data() {
        return {
            reserveList: [],
            // 고객
            reserveVo: {
                rsNo: 0,
                bNo: 0,
                dogNo: 0,
                rsDate: "",
                rsTime: null,
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
            },
            // 사업자
            businessVo: {
                saveName: "",
                bNo: 1,
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
            priceVo: {
                priceNo: 0,
                beautyNo: 0,
                bNo: 1,
                onePrice: 0,
                sizeDiv: "",
                weightDiv: "",
                beauty: "",
            },
        };
    },

    mounted() {

    },


    methods: {

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

        // 가게 시간정보
        getTimeList() {
            console.log("가게 시게정보 가져오기");
        },

        // // 시간선택
        // toggleTime(time) {
        //     console.log(time);
        //     if (this.reserveVo.rsTime == time) {
        //         // 이미 선택된 시간을 클릭한 경우 선택 해제
        //         this.reserveVo.rsTime = null;
        //     } else {
        //         // 클릭한 시간을 선택
        //         this.reserveVo.rsTime = time;
        //     }
        // },

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
                this.getPrice();
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
            console.log("우리강쥐크기 : ", this.dogVo.size);
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




        // 예상가격
        addPrice(price) {
            this.estimatedPrice += price;
        },
    },

    created() {
        this.getBList();
        this.getPetList();
    }
};
</script>

<style>
#reservationForm .selected {
    background-color: #236C3F !important;
    color: #ffffff !important;
}

.dp__theme_light {
    /* --dp-menu-border-color: #a7a4a4; */
    --dp-menu-border-color: none;
    --dp-primary-color: #236C3F;

    --dp-cell-border-radius: 50%;
}

.dp__instance_calendar {
    width: 500px;
    font-size: 20px;
    padding: 10px;
}

/* select Button */
/* .dp__action_buttons {
    visibility: hidden;
} */

.dp__calendar_item {
    padding: 10px;
}

.dp__button {
    /* background-color: #236C3F; */
    width: 500px;
    height: 80px;
}

.dp__calendar_header_item {
    margin: 20px 0 20px 0;
}

:root {
    --dp-cell-size: 46px;
}
</style>
