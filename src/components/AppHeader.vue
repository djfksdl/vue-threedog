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

                <!-- 오른쪽 메뉴 -->
                <div class="user-options">
                    <!-- 로그인 안되어있을때 -->
                    <router-link to="/login" v-if="this.$store.state.authUser == null && this.$store.state.auth == null">
                        <img src="@/assets/images/icon_login.svg">
                        <p >로그인</p>
                    </router-link>

                    <!-- 로그인되어있을떄 -->
                    <router-link to="" v-if="this.$store.state.authUser != null || this.$store.state.auth != null" v-on:click="logout">
                        <img src="@/assets/images/icon_login.svg">
                        <p >로그아웃</p>
                    </router-link>

                    <router-link to="" v-on:click="loginForMypage">
                        <img src="@/assets/images/icon_my.svg">
                        <p>마이페이지</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "@/assets/css/headerFooter/aheader.css"
export default {
    name: "AppHeader",
    components: {},
    data() {
        return {};
    },
    methods: {
        logout(){
            // console.log("로그아웃");
            this.$store.commit("setAuthUser",null);
            this.$store.commit("setAuth",null);
            this.$store.commit("setToken",null);

            this.$router.push("/");
        },
        loginForMypage(){
            // console.log("마이페이지가려면 로그인ㄱ");
            if (this.$store.state.auth != null) {
                this.$router.push(`/edit/${this.$store.state.auth.bNo}`);
            } else if (this.$store.state.authUser == null) {
                window.alert("로그인 후 이용할 수 있습니다.");
                this.$router.push("/login"); // 로그인 페이지로 이동
            } else if (this.$store.state.authUser != null) {
                this.$router.push(`/mypage/${this.$store.state.authUser.uNo}`); // 이미 로그인되어 있으면 마이페이지로 이동
            }
        }
        
    },
    created() { }
};
</script>
<style>

</style>