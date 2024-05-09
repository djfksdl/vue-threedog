<template>
    <div class="mheader">
        <div class="mheaderWrap">
            <!-- 로고 -->
            <div class="mlogo">
                <p>로고자리</p>
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
    </div>
</template>

<script>
import "@/assets/css/mheader/mheader.css"
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