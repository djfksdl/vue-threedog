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
                        <div class="searchByTermBtns">
                            <button>1개월</button>
                            <button>3개월</button>
                            <button>6개월</button>
                            <button>12개월</button>
                        </div>
                        <!-- 기간 입력창 -->
                        <div class="searchByTermInputs">
                            <input type="date">~<input type="date">
                        </div>
                    </div>
                    <!-- 오른쪽 조회버튼 -->
                    <button class="pscRightContainer">
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
                                <td>{{userVo.pDate}}</td>
                                <td v-if="userVo.pDiv==true">{{userVo.title}} {{ userVo.usePoint }} P 리뷰 사용</td>
                                <td v-if="userVo.pDiv==false">{{userVo.title}} {{ userVo.usePoint }} p 리뷰 적립</td>
                                <td v-if="userVo.pDiv==true">사용</td>
                                <td v-if="userVo.pDiv==false">적립</td>
                            </tr>
                            <!-- <tr>
                                <td>2024-06-09</td>
                                <td>깔끔하개 예약금</td>
                                <td>사용</td>
                            </tr> -->
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
                usePoint:0,
            },
            userList:[],
        };
    },
    methods: {
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
        getPointList(){
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
        }

        // 조회 버튼 눌렀을때


    },
    created() {
        this.getPoint();
        this.getPointList();
    }
};
</script>
<style></style>