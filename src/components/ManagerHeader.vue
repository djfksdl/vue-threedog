<template>
    <header class="mheader">
        <div class="mheaderWrap">
            <!-- 헤더 왼쪽(로고+메뉴) -->
            <div class="mheaderLeft">
                <!-- 로고 -->
                <div class="mlogo">
                    <router-link to="/edit"><img src="@/assets/images/logo2.png" alt=""></router-link>
                </div>
                <!-- 메뉴 -->
                <ul class="mMenu">
                    <!-- 회원+원장 -->
                    <li><router-link to="/review">후기게시판</router-link></li>
                    <!-- 원장 로그인했을때 보이는것 -->
                    <li><router-link to="/diary">알림창</router-link></li>
                    <li><router-link to="/schedule">예약스케쥴</router-link></li>
                    <li><router-link to="/totalsales">매출/통계</router-link></li>
                    <!-- <li><router-link to="/editform">홈페이지 설정</router-link></li> -->
                </ul>
            </div>
            <!-- 헤더 오른쪽 로그인 -->
            <div class="mheaderRight">
                <p><router-link to="/"><small>메인화면돌아가기</small></router-link></p>
                <p><strong>보리최고</strong>님</p>
                <p><router-link to="">로그아웃</router-link></p>
                <router-link to="/mypage"><img src="@/assets/images/icon_mypage.png"></router-link>
                <router-link to="/editform"><img src="@/assets/images/icon_setting.png"></router-link>
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
        return {};
    },
    methods: {
        
    },
    created() { }
};
</script>

<style>

</style>