<template>
    <div class="sidebar">
        <!-- 유저 프로필 -->
        <div class="profile">
            <!-- 프로필 사진 -->
            <div class="profileImg">
                <img src="@/assets/images/dog2.jpg">
            </div>
            <!-- 프로필 내용 -->
            <div class="profileId">
                <label>dddddd</label> 님 <br>
                <label>보유 마일리지: 1500</label> P
            </div>
        </div>

        <!-- 동물프로필 -->
        <div class="profilePetBox">

            <!-- 반려견 등록 윗부분 -->
            <div class="profileTitle">
                <p>반려견</p>
                <router-link to="/petaddform">➕</router-link>
            </div>

            <!-- 반려견 프로필 박스 -->
            <div class="petProfileBox">
                <!-- 반려견 1 -->
                <div class="profilePet">
                    <img src="@/assets/images/dog.jpg">
                    <p>보리(4세)</p>
                </div>
                <!-- 반려견 2 -->
                <div class="profilePet">
                    <img src="@/assets/images/dog.jpg">
                    <p>마리(3세)</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@/assets/css/mypage/sidebar.css'
export default {
    name: "SideBar",
    components: {
    },

    data() {
        return {
        };
    },
    methods: {

    },
};
</script>

<style></style>
