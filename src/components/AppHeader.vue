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
                    <li><router-link to="/search">후기검색</router-link></li>
                    <li><router-link to="/searchmap">예약검색</router-link></li>
                    <li><router-link to="/announcements">공지사항</router-link></li>
                    <li><router-link to="/reservationform">예약하기</router-link></li>
                </ul>


                <div class="popRank">
                    <ul id="best_search">
                        <li>
                            <dl class="time1" style="display:">
                                <dd><a class="t" href="#">
                                        <div class="num">1</div>김아영바보바보
                                    </a></dd>
                            </dl>
                            <dl class="time2" style="display:none;">
                                <dd><a class="t" href="#">
                                        <div class="num">2</div>오지원바보바보
                                    </a></dd>
                            </dl>
                            <dl class="time3" style="display:none;">
                                <dd><a class="t" href="#">
                                        <div class="num">3</div>마라탕탕후루후루
                                    </a></dd>
                            </dl>
                            <dl class="time4" style="display:none;">
                                <dd><a class="t" href="#">
                                        <div class="num">4</div>집에가고싶어용
                                    </a></dd>
                            </dl>
                            <dl class="time5" style="display:none;">
                                <dd><a class="t" href="#">
                                        <div class="num">5</div>헷
                                    </a></dd>
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
import $ from 'jquery';

// 상태 관리
const viewcount = ref(0);
let rtcarousel = null;

// jQuery를 사용한 보기 전환
function view(arg) {
  $(".time1, .time2, .time3, .time4, .time5").css("display", "none");
  if (arg === 0) {
    $(".time1").css("display", "block");
  } else if (arg === 1) {
    $(".time2").css("display", "block");
  } else if (arg === 2) {
    $(".time3").css("display", "block");
  } else if (arg === 3) {
    $(".time4").css("display", "block");
  }else if (arg === 4) {
    $(".time5").css("display", "block");
  }
}

// Carousel 시작
function startCarousel() {
  rtcarousel = setInterval(() => {
    viewcount.value = (viewcount.value + 1) % 5;
    view(viewcount.value);
  }, 2000); // 여기서 3000 밀리초로 변경하여 전환 속도를 조절
}

// Carousel 정지
function stopCarousel() {
  clearInterval(rtcarousel);
}

// 마운트 후 이벤트 설정
onMounted(() => {
  startCarousel();
  $("#best_search").mouseenter(stopCarousel);
  $("#best_search").mouseleave(startCarousel);
});

// 컴포넌트가 파괴되기 전 정리
onBeforeUnmount(() => {
  stopCarousel();
});
</script>

<script>
import "@/assets/css/headerFooter/aheader.css"
export default {
    name: "AppHeader",
    components: {},
    data() {
        return {};
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
    },
    created() { }
};
</script>