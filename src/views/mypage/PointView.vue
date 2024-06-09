<template>
    <div id="wrap">
        <AppHeader />
        <SideBar />
        <div class="pointContainer">
            <div class="container5">

                <!-- 사용가능한 마일리지 -->
                <div class="useablePointContainer">
                    <div class="upcTop" >
                        <h2>사용가능한 마일리지</h2>
                        <div>
                            <p>사용 가능한 마일리지 : <span>500p</span></p>
                        </div>
                    </div>
                </div>

                <!-- 검색 구간 -->
                <div class="pointSearchContainer">
                    <!-- 왼쪽 기간 -->
                    <div class="pscLeftContainer" >
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
                    <button class="pscRightContainer" >
                        조회
                    </button>
                </div>

                <!-- 검색 내용 -->
                <div class="pointContentsContainer" >
                    <table border="1">
                        <thead>
                            <tr>
                                <th>일자</th>
                                <th>내용</th>
                                <th>적립/사용</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2024-06-09</td>
                                <td>깔끔하개</td>
                                <td>사용</td>
                            </tr>
                            <tr>
                                <td>2024-06-09</td>
                                <td>깔끔하개</td>
                                <td>사용</td>
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
export default {
    name: "PointView",
    components: {
        AppHeader,
        AppFooter,
        SideBar,
        TopButton
    },
    data() {
        return {};
    },
    methods: {},
    created(){}
};
</script>
<style></style>