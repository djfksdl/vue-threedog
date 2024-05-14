<template>
    <div class="sidebar" :style="sidebarStyle">
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
            isFixed: false,
        };
    },
    computed:{
        //동적으로 적용할 사이드바 스타일
        sidebarStyle(){
            return{
                position: this.isFixed ? 'fixed' : 'fixed',
                top: this.isFixed ? '0': '138px',
                transition: 'top 0.3s ease',
            };
        },
    },
    mounted(){
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll); // 컴포넌트가 소멸되기 전에 리스너 제거
    },
    methods: {
        //스크롤 이벤트 핸들러
        handleScroll(){
            const scrollTop = window.scrollY || window.pageYOffset; // 현재 스크롤 위치
            if (scrollTop > 138) {
                // 스크롤 위치가 138px 이상이면
                this.isFixed = true; // 사이드바를 고정 상태로 변경
            } else {
                this.isFixed = false; // 그렇지 않으면 사이드바를 고정 해제
            }
        },
    },
    created(){
        
    }
};
</script>

<style></style>
