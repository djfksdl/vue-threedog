<template>
    <div class="header">
        <img class="logo" src="../assets/images/logo.png">

        <div class="head">
            <ul>
                <li><a href="">로그인</a></li>
            </ul>

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
</template>

<script>
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
.header {
    width: 100%;
    height: 138px;
    position: relative; /* 부모 요소로부터의 상대적 위치 지정 */
    /* background-color: #d6d6d6; */
}

.logo {
    width: 400px;
    height: auto;
    margin: 20px 10px 10px 300px;
    object-fit: contain;
    float: left;
}

.head {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    /* font-family: 'Noto Sans KR', sans-serif; 왜 안 먹지 */
}

.head ul>li{
    float: left;
    margin-right: 15px;
}

.head ul {
    list-style-type: none;
    margin-right: 315px;
}

/* a:link {
    text-decoration: none;
    color: #000000;
}

a:visited {
    text-decoration: none;
    color: #000000;
}

a:active {
    text-decoration: none;
    color: #000000;
}

a:hover {
    text-decoration: none;
    color: #000000;
} */

</style>