<template>
    <div id="wrap">
        <AppHeader />
        <SideBar />
        <div class="pointContainer">
            <div class="container5">
                <!-- 사용가능한 마일리지 -->
                <div class="useablePointContainer">
                    <div class="upcTop">
                        <h2>사용가능한 마일리지</h2>
                        <div>
                            <p>사용 가능한 마일리지 : <span>{{ userVo.uPoint.toLocaleString() }}P</span></p>
                        </div>
                    </div>
                </div>

                <!-- 검색 구간 -->
                <div class="pointSearchContainer">
                    <!-- 왼쪽 기간 -->
                    <div class="pscLeftContainer">
                        <!-- 기간 선택 버튼 -->
                        <div>
                            <button v-for="(button, index) in buttons" :key="button" @click="selectButton(index)"
                                :class="{ 'selected': selectedButton === index }">
                                {{ button }}
                            </button>
                        </div>
                        <!-- 기간 입력창 -->
                        <div class="searchByTermInputs">
                            <input type="date" v-model="startDate" value="startDate">~<input type="date"
                                v-model="endDate" value="endDate">
                            <!-- {{ startDate }} ~ {{ endDate }} -->
                        </div>
                    </div>
                    <!-- 오른쪽 조회버튼 -->
                    <button class="pscRightContainer" @click="getDataByDateRange">
                        조회
                    </button>
                </div>

                <!-- 검색 내용 -->
                <div class="pointContentsContainer">
                    <table border="1">
                        <thead>
                            <tr>
                                <th>일자</th>
                                <th>내용</th>
                                <th>적립/사용</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-bind:key="i" v-for="(userVo, i) in userList">
                                <td>{{ formatDate(userVo.pDate) }}</td>
                                <td v-if="userVo.pDiv"> {{ userVo.usePoint }} P 리뷰 사용</td>
                                <td v-else> {{ userVo.usePoint }} P 리뷰 적립</td>
                                <td v-if="userVo.pDiv">사용</td>
                                <td v-else>적립</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <TopButton />
        <AppFooter />
    </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import TopButton from "@/components/TopButton.vue"
import SideBar from "@/components/SideBar.vue"
import '@/assets/css/mypage/point.css'
import axios from "axios"

export default {
    name: "PointView",
    components: {
        AppHeader,
        AppFooter,
        SideBar,
        TopButton
    },
    data() {
        return {
            userVo: {
                uNo: this.$store.state.authUser.uNo,
                rsNo: 0,
                pDate: "",
                uPoint: 0,
                bNo: 0,
                rtFinish: false,
                usePoint: 0,
            },
            userList: [],
            selectedButton: null, // 활성화된 버튼의 인덱스를 저장
            endDate: "",
            startDate: "",
            buttons: ['1개월', '3개월', '6개월', '12개월'],

        };
    },

    computed: {
        // 날짜 포맷팅 함수
        formatDate() {
            return (dateString) => {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };
        },
    },
    methods: {
        // 개월버튼
        selectButton(index) {
            // Set endDate to today's date
            this.endDate = new Date().toISOString().slice(0, 10);

            // Calculate startDate based on the selected button
            const today = new Date();
            let startDate = new Date();

            switch (index) {
                case 0: // 1개월
                    startDate.setMonth(today.getMonth() - 1);
                    break;
                case 1: // 3개월
                    startDate.setMonth(today.getMonth() - 3);
                    break;
                case 2: // 6개월
                    startDate.setMonth(today.getMonth() - 6);
                    break;
                case 3: // 12개월
                    startDate.setMonth(today.getMonth() - 12);
                    break;
                default:
                    break;
            }

            // Set startDate
            this.startDate = startDate.toISOString().slice(0, 10);

            // Update selectedButton
            this.selectedButton = index;

            console.log(this.endDate);
            console.log(this.startDate);
        },

        // 포인트내역 불러오기
        getPoint() {
            console.log("포인트 내역 가져오기");
            console.log(this.userVo.uNo);
            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/getpoint`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { uNo: this.userVo.uNo },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("포인트 불러오기 성공");
                console.log(response.data.apiData); //수신데이타
                this.userVo = response.data.apiData;
            }).catch(error => {
                console.log(error);
            });
        },

        // 전체내역
        getPointList() {
            console.log("포인트리스트 가져오기");
            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/getpointlist`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { uNo: this.userVo.uNo },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("포인트 불러오기 성공");
                console.log(response.data.apiData); //수신데이타
                this.userList = response.data.apiData;
            }).catch(error => {
                console.log(error);
            });
        },
        //조회
        getDataByDateRange() {
            // 선택된 시작일(startDate)과 종료일(endDate)을 이용하여 데이터를 가져오는 로직을 작성합니다.
            // const startDate = this.startDate;
            // const endDate = this.endDate;
            const uNo = this.$store.state.authUser.uNo;
            console.log("Selected Date Range:", this.startDate, "~", this.endDate);
            console.log(uNo);

            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/getdatabydaterange`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { uNo: uNo, startDate: this.startDate, endDate: this.endDate },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("포인트 불러오기 성공");
                console.log(response.data.apiData); //수신데이타
                this.userList = response.data.apiData;
            }).catch(error => {
                console.log(error);
            });
        },

    },
    created() {
        this.getPoint();
        this.getPointList();
    }
};
</script>

<style>
.pointContainer .container5 .pointSearchContainer .pscLeftContainer button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    margin-right: 10px;
    cursor: pointer;
    margin-bottom: 30px
}

.pointContainer .container5 .pointSearchContainer .pscLeftContainer .selected {
    background-color: #236C3F;
    /* 선택한 색으로 변경할 수 있습니다. */
    color: white;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    /* margin-right: 10px; */
    cursor: pointer;
}
</style>