<template>
    <header class="mheader">
        <div class="mheaderWrap">
            <!-- 헤더 왼쪽(로고+메뉴) -->
            <div class="mheaderLeft">
                <!-- 로고 -->
                <div class="mlogo">
                    <router-link v-bind:to="`/edit/${this.bNo}`"><img src="@/assets/images/logo2.png" alt=""></router-link>
                </div>
                <!-- 메뉴(회원+원장) -->
                <ul class="mMenu" v-if="this.$store.state.auth == null ">
                    <li><router-link to="/review">후기게시판</router-link></li>
                </ul>
                <!-- 메뉴(원장) -->
                <ul class="mMenu" v-if="this.$store.state.auth != null">
                    <li><router-link to="/review">후기게시판</router-link></li>
                    <li><router-link to="/diary">알림창</router-link></li>
                    <li><router-link to="/schedule">예약스케쥴</router-link></li>
                    <li><router-link to="/totalsales">매출/통계</router-link></li>
                </ul>
            </div>
            <!-- 헤더 오른쪽 로그인- 로그인 했을때(회원) -->
            <div class="mheaderRight" v-if="this.$store.state.authUser != null">
                <p><router-link to="/"><small>메인화면돌아가기</small></router-link></p>
                <p><strong>{{this.$store.state.authUser.uName}}</strong>님</p>
                <p><router-link to="" v-on:click="logout">로그아웃</router-link></p>
                <router-link to="" v-on:click="loginForMypage"><img src="@/assets/images/icon_mypage.png"></router-link>
                <!-- <router-link to="/editform"><img src="@/assets/images/icon_setting.png"></router-link> -->
            </div>
            <!-- 헤더 오른쪽 로그인- 로그인 했을때(원장) -->
            <div class="mheaderRight" v-if="this.$store.state.auth != null">
                <p><router-link to="/"><small>메인화면돌아가기</small></router-link></p>
                <p><strong>관리자</strong>님</p>
                <p><router-link to="" v-on:click="logout">로그아웃</router-link></p>
                <!-- <router-link to="" v-on:click="loginForMypage"><img src="@/assets/images/icon_mypage.png"></router-link> -->
                <router-link v-bind:to="`/editform/${this.$store.state.auth.bNo}`"><img src="@/assets/images/icon_setting.png"></router-link>
            </div>
            <!-- 헤더 오른쪽 로그인- 로그인 안했을때 -->
            <div class="mheaderRight" v-if="this.$store.state.authUser == null && this.$store.state.auth == null ">
                <p><router-link to="/"><small>메인화면돌아가기</small></router-link></p>
                <p><router-link to="/login" >로그인</router-link></p>
                <router-link to="" v-on:click="loginForMypage"><img src="@/assets/images/icon_mypage.png"></router-link>
            </div>
        </div>
    </header>
</template>

<script>
import "@/assets/css/headerFooter/mheader.css"
export default {
    name: "ManagerHeader",
    components: {},
    data() {
        return {
            bNo: this.$route.params.bNo
        };
    },
    methods: {
        // 로그아웃
        logout(){
            console.log("여기확인");
            console.log(this.bNo);

            this.$store.commit("setAuthUser",null);
            this.$store.commit("setAuth",null);
            this.$store.commit("setToken",null);

            this.$router.push(`/edit/${this.bNo}`);
        },
        // 마이페이지
        loginForMypage(){
            // console.log("로그인하러 ㄱ");
            if(this.$store.state.authUser == null){
                window.alert("로그인 후 이용할 수 있습니다.");
                this.$router.push("/login");

            }else{
                this.$router.push(`/mypage/${this.$store.state.authUser.uNo}`);
            }

        }
    },
    created() { }
};
</script>

<style>

</style>