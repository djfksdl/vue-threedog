<template>
    <div class="header">
        <div class="headerContainer">
            <!-- 로고 -->
            <router-link to="/">
                <img class="logo" src="../assets/images/logo.png">
            </router-link>
            <!-- 메뉴 -->
            <div class="head">
                <!-- 왼쪽 메뉴 -->
                <ul class="categories">
                    <li><router-link to="/searchmap">매장검색</router-link></li>
                    <li><router-link to="/search">후기</router-link></li>
                    <li><router-link to="/announcements">공지사항</router-link></li>
                    <li><router-link to="/reservationform">예약</router-link></li>
                </ul>

                <div class="popRank" v-if="popList.length > 0">
                    <ul id="best_search" @mouseenter="stopCarousel" @mouseleave="startCarousel">
                        <li v-for="(popVo, i) in popList" :key="i">
                            <dl :class="'time' + (i + 1)" v-show="i === viewcount">
                                <dd>
                                    <a class="t" :href="`/edit/${popVo.bNo}`">
                                        <div class="num">{{ i + 1 }}</div>
                                        {{ popVo.title }}
                                    </a>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>

                <!-- 오른쪽 메뉴 -->
                <div class="user-options">
                    <!-- 로그인 안되어있을때 -->
                    <router-link to="/login"
                        v-if="this.$store.state.authUser == null && this.$store.state.auth == null">
                        <img src="@/assets/images/icon_login.svg">
                        <p>로그인</p>
                    </router-link>
                    <router-link to="" v-if="this.$store.state.authUser == null && this.$store.state.auth == null"
                        v-on:click="loginForMypage">
                        <img src="@/assets/images/icon_my.svg">
                        <p>마이페이지</p>
                    </router-link>

                    <!-- 로그인되어있을떄(회원) -->
                    <router-link to="" v-if="this.$store.state.authUser != null" v-on:click="logout">
                        <img src="@/assets/images/icon_login.svg">
                        <p>로그아웃</p>
                    </router-link>

                    <router-link to="" v-if="this.$store.state.authUser != null" v-on:click="loginForMypage">
                        <img src="@/assets/images/icon_my.svg">
                        <p>마이페이지</p>
                    </router-link>

                    <!-- 로그인되어있을떄(원장) -->
                    <router-link to="" v-if="this.$store.state.auth != null" v-on:click="logout">
                        <img src="@/assets/images/icon_login.svg">
                        <p>로그아웃</p>
                    </router-link>

                    <router-link to="" v-if="this.$store.state.auth != null" v-on:click="loginForMypage">
                        <img src="@/assets/images/icon_homepage.png">
                        <p>홈페이지</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 상태 관리
const viewcount = ref(0);
const popList = ref([
  // 예시 데이터, 실제 데이터로 교체하세요
  { bNo: 1, title: 'Title 1' },
  { bNo: 2, title: 'Title 2' },
  { bNo: 3, title: 'Title 3' },
  { bNo: 4, title: 'Title 4' },
  { bNo: 5, title: 'Title 5' },
]);
let rtcarousel = null;

// 보기 전환
function view(arg) {
  viewcount.value = arg;
}

console.log(view);

// Carousel 시작
function startCarousel() {
  rtcarousel = setInterval(() => {
    viewcount.value = (viewcount.value + 1) % popList.value.length;
  }, 2000); // 2000 밀리초로 전환 속도 조절
}

// Carousel 정지
function stopCarousel() {
  clearInterval(rtcarousel);
}

// 마운트 후 이벤트 설정
onMounted(() => {
  startCarousel();
});

// 컴포넌트가 파괴되기 전 정리
onBeforeUnmount(() => {
  stopCarousel();
});
</script>

<script>
import "@/assets/css/headerFooter/aheader.css"
import axios from 'axios';

export default {
    name: "AppHeader",
    components: {},
    data() {
        return {
            popList: [],
            popVo: {
                bNo: '',
                title: ''
            }
        };
    },
    methods: {
        // 로그아웃
        logout() {
            // console.log("로그아웃");
            this.$store.commit("setAuthUser", null);
            this.$store.commit("setAuth", null);
            this.$store.commit("setToken", null);

            this.$router.push("/");
        },
        // 마이페이지, 홈페이지 이동
        loginForMypage() {
            // console.log("마이페이지가려면 로그인ㄱ");
            if (this.$store.state.auth != null) {
                this.$router.push(`/edit/${this.$store.state.auth.bNo}`);
            } else if (this.$store.state.authUser == null) {
                window.alert("로그인 후 이용할 수 있습니다.");
                this.$router.push("/login"); // 로그인 페이지로 이동
            } else if (this.$store.state.authUser != null) {
                this.$router.push(`/mypage/${this.$store.state.authUser.uNo}`); // 이미 로그인되어 있으면 마이페이지로 이동
            }
        },
        getList() {
            console.log("데이터 가져오기");
            axios({
                method: 'get',
                url: `${this.$store.state.apiBaseUrl}/api/poprank`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                responseType: 'json'
            }).then(response => {
                console.log(response.data.apiData);
                this.popList = response.data.apiData;
            }).catch(error => {
                console.log(error);
            });
        }
    },
    created() {
        this.getList();
    }
};
</script>