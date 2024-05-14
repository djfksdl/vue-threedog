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
                    <li><router-link to="/search">검색</router-link></li>
                    <li><router-link to="/announcements">공지사항</router-link></li>
                </ul>

                <!-- 오른쪽 메뉴 -->
                <div class="user-options">
                    <router-link to="/login">로그인</router-link>
                    <router-link to="/signup">회원가입</router-link>
                    <router-link to="/signup">마이페이지</router-link>
                </div>
                
                <!-- <ul>
                    <li><a href="">ㅇㅇㅇ 님</a></li>
                    <li><a href="">내 정보</a></li>
                    <li><a href="">로그아웃</a></li>
                </ul> -->
                
                <!-- <ul v-if="this.$store.state.token === null">
                    <li><router-link to="/login">로그인</router-link></li>
                </ul>
                <ul v-else-if="this.$store.state.token != null && this.$store.state.authUser != null">
                    <li>{{ this.$store.state.authUser.name }} 님</li>
                    <li><router-link to="/mypage"> 내 정보 </router-link></li>
                    <li><a v-on:click="logOut">로그아웃</a></li>
                </ul> -->
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
        
    },
    created() { }
};
</script>
<style>

</style>