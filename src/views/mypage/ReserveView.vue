<template>
    <div id="wrap">
        <AppHeader />
        <div class="reseerveContainer">

            <!-- 사이드 바 자리 -->
            <SideBar />
            <div class="container">
                <!-- 예약상세 내역 -->
                <div class="reserveCheckForm" v-bind:key="i" v-for="(reserveVo, i) in reserveList">
                    <!-- 예약정보 -->
                    <div class="rcfInfo">
                        <div>
                            <p>매장명</p>
                            <p>{{ reserveVo.title }}</p>
                        </div>
                        <div>
                            <p>펫명</p>
                            <p>{{ reserveVo.dogName }}</p>
                        </div>
                        <div>
                            <p>예약일시</p>
                            <p>{{ formatDate(reserveVo.rtDate) }} {{ formatTime(reserveVo.rtTime) }}</p>


                        </div>
                        <div>
                            <p>매장주소</p>
                            <p>{{ reserveVo.bAddress }} 번지{{ reserveVo.bdAddress }}</p>
                        </div>
                    </div>
                    <!-- 결제금액 -->
                    <div class="rcfSum">
                        <div>
                            <p>결제상품</p>
                            <p>{{ reserveVo.size }} {{ reserveVo.beauty }}</p>

                        </div>
                        <div>
                            <p>예상가격</p>
                            <p>{{ (reserveVo.expectedPrice).toLocaleString() }}</p>
                        </div>
                        <div>
                            <p>마일리지 사용</p>
                            <p>-{{ reserveVo.usePoint.toLocaleString() }}원</p>
                        </div>
                        <div>
                            <p>최종 결제 금액</p>
                            <p>{{ (reserveVo.expectedPrice + reserveVo.surcharge -
                    reserveVo.usePoint).toLocaleString() }}원</p>

                        </div>
                    </div>
                    <!-- {{ reserveVo.rNo }} -->
                    <div>
                        <!-- 취소/변경안내버튼 -->
                        <div class="rcfChange" v-if="!reserveVo.pushNo">
                            <button>
                                예약 변경/취소는 매장<span>({{ reserveVo.bPhone }})</span>으로 전화주세요.
                            </button>
                        </div>
                        <!-- 후기 작성버튼 -->
                        <div class="rrfChange" v-else-if="reserveVo.pushNo && reserveVo.rNo == 0">
                            <router-link :to="`/reviewform/${reserveVo.rsNo}`">후기 작성</router-link>
                        </div>
                        <!-- 후기 확인버튼 -->
                        <div class="rrfConfirm" v-else-if="reserveVo.rNo">
                            <!-- <router-link to="/review">후기 확인</router-link> -->
                            <button @click="getReview(reserveVo.rsNo)">후기 확인</button>
                        </div>
                    </div>

                </div>

                <div class="modal-wrap" v-show="modalCheck">
                    <div class="modal-container">
                        <div class="reviewBoardDetailContainer">
                            <div class="reviewDetailImg">
                                <!-- <img v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${reviewVo.saveName}`"
                                    style="width: 300px; height: 350px;"> -->
                            </div>
                            <div>
                                <div class="userId"><strong>{{ reviewVo.uId }}</strong>님</div>
                                <div style="display: flex;">
                                    <!-- <div class="beauty">zzzzzzzzzzzz</div> -->
                                    <div class="cutInfor">{{ reviewVo.dogName }} ({{ reviewVo.weight }}kg)
                                    </div>
                                    <div class="date">{{ formatDate(reviewVo.rDate) }}</div>
                                </div>
                                <div style="display: flex;">
                                    <div class="price">{{ reviewVo.expectedPrice.toLocaleString() }}원</div>

                                    <div class="star" style="margin-top: 3px;">
                                        <!-- Full stars -->
                                        <span v-for="i in Math.floor(reviewVo.star)" :key="i"><img
                                                src="@/assets/images/star_yellow.jpg" style="width: 15px;"></span>
                                        <!-- Half star -->
                                        <!-- <span v-if="reviewVo2.star - Math.floor(reviewVo2.star) >= 0.5">><img src="@/assets/images/star_ban.png" style="width: 15px;"></span> -->
                                        <!-- Empty stars -->
                                        <span v-for="i in 5 - Math.ceil(reviewVo.star)" :key="'empty_' + i"><img
                                                src="@/assets/images/star_gray.jpg" style="width: 15px;"></span>
                                    </div>
                                </div>

                                <div class="context">
                                    {{ reviewVo.rContent }}
                                </div>
                            </div>
                        </div>
                        <div class="modal-btn">
                            <button @click="modalCheck = false" style="width: 200px;">닫기</button>
                        </div>
                    </div>
                </div>



            </div>
        </div>
        <AppFooter />
    </div>
</template>
<script>
import axios from "axios"
import '@/assets/css/mypage/reserve.css'
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import SideBar from "@/components/SideBar.vue"

// import Swal from "sweetalert2"; // 모달창

export default {
    name: "ReserveView",
    components: {
        AppHeader,
        AppFooter,
        SideBar
    },
    data() {
        return {
            reserveList: [],
            reserveVo: {
                rsNo: 0,
                dogNo: 0,
                rtNo: 0,
                expectedPrice: 0,
                surcharges: 0,
                rtDate: "",
                rtTime: "",
                rtFinish: false,
                bNo: 0,
                bAddress: "",
                bdAddress: "",
                bPhone: "",
                title: "",
                uNo: this.$route.params.uNo,
                dogName: "",
                uPoint: "",
                pNo: 0,
                pDiv: false,
                rsNum: 0, //rsNo
                usePoint: 0,
                size: "",
                rNo: 0,
            },
            pushVo: {
                pushNo: 0,
                rsNo: 0,
                pushTime: "",
            },
            reviewVo: {
                rNo: 0,
                star: 0,
                rContent: "",
                rDate: "",
                views: 0,
                bNo: 1,
                uNo: "",
                uId: "",
                beauty: "",
                rsNo: 0,
                riNo: 0,
                dogName: "",
                dogNo: 0,
                weight: 0.0,
                expectedPrice: 0,
                saveName:""

            },
            modalCheck: false,
            selectedReserve: null,
        };
    },

    computed: {
    },
    methods: {
        getReserveList() {
            console.log("예약내역 가져오기");

            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/reservationlist`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { uNo: this.reserveVo.uNo },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("예약내역 불러오기 성공");
                console.log(response.data.apiData); //수신데이타
                this.reserveList = response.data.apiData;

                console.log(this.reserveList);
            }).catch(error => {
                console.log(error);
            });
        },
        formatDate(date) {
            if (!date) return ''; // date가 없는 경우 빈 문자열 반환
            const formattedDate = new Date(date);
            const year = formattedDate.getFullYear();
            const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
            const day = String(formattedDate.getDate()).padStart(2, '0');
            return `${year}년 ${month}월 ${day}일`;
        },
        formatTime(time) {
            if (!time) return ''; // time이 없는 경우 빈 문자열 반환
            const [hours, minutes] = time.split(':');
            return `${hours}:${minutes}`;
        },
        getReview(rsNo) {
            console.log("후기보기");
            console.log(rsNo);
            this.modalCheck = true;

            // axios({
            //     method: 'get',  //put,post,delete
            //     url: `${this.$store.state.apiBaseUrl}/api/mypage/reservationlist2`,
            //     headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
            //     params: { rsNo: this.reviewVo.rsNo },
            //     responseType: 'json' //수신타입
            // }).then(response => {
            //     console.log("예약내역 불러오기 성공");
            //     console.log(response.data.apiData); //수신데이타
            //     this.reviewVo = response.data.apiData;

            // }).catch(error => {
            //     console.log(error);
            // });
        }


    },


    created() {
        this.getReserveList();

    }
};
</script>
<style>
.reseerveContainer .modal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

/* modal or popup */
.reseerveContainer .modal-container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
}

.reseerveContainer .modal-btn {
    text-align: right;
}

.reseerveContainer .modal-btn button {
    padding: 15px;
    border: none;
    font-size: 18px;
    border-radius: 20px;
    background-color: rgb(29, 29, 175);
    color: white;
}

.reseerveContainer .modal-btn button:hover {
    cursor: pointer;
}
</style>