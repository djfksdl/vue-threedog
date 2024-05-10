<template>
    <header class="mheader">
        <div class="mheaderWrap">
            <!-- 헤더 왼쪽(로고+메뉴) -->
            <div class="mheaderLeft">
                <!-- 로고 -->
                <div class="mlogo">
                    <router-link to="/"><img src="@/assets/images/logo.png" alt=""></router-link>
                </div>
                <!-- 메뉴 -->
                <ul class="mMenu">
                    <!-- 회원+원장 -->
                    <router-link to=""><li>후기게시판</li></router-link>
                    <!-- 원장 로그인했을때 보이는것 -->
                    <router-link to=""><li>알림창</li></router-link>
                    <router-link to=""><li>예약스케쥴</li></router-link>
                    <router-link to=""><li>매출/통계</li></router-link>
                </ul>
            </div>
            <!-- 헤더 오른쪽 로그인 -->
            <div class="mheaderRight">
                <p><router-link to=""><strong>보리최고</strong>님</router-link></p>
            </div>
        </div>
    </header>
</template>

<script>
import "@/assets/css/mHeaderFooter/mheader.css"
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