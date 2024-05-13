<template>
    <div class="header">
        <router-link to="/">
            <img class="logo" src="../assets/images/logo.png">
        </router-link>
        <div class="head">
            <ul class="categories">
                <li>
                    <button class="category-btn"><router-link to="/search">검색</router-link></button>
                </li>
                <li>
                    <button class="category-btn"><router-link to="/announcements">공지사항</router-link></button>
                </li>
            </ul>
            <ul class="user-options">
                <li><router-link to="/login">로그인</router-link></li>
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

<style>
.header {
    width: 100%;
    height: 138px;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
    width: 400px;
    height: auto;
    margin: 20px 10px 10px 200px;
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
}

.head ul>li {
    float: left;
    margin-right: 30px;
}

.head ul {
    list-style-type: none;
}

.categories {
    margin-right: 950px; /* 수정: 이동 거리 변경 */
}

.category-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
}

.category-btn:hover {
    color: #666;
}

.user-options {
    margin-right: 20px;
}
</style>