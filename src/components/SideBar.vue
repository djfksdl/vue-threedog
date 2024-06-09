<template>
    <div class="sidebar" :style="sidebarStyle">
        <!-- 유저 프로필 -->
        <div class="profile">
            <!-- 프로필 사진 -->
            <!-- {{ userVo.uProfile }} -->
            <div class="profileImg">
                <img v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${userVo.uProfile}`">
            </div>
            <!-- 프로필 내용 -->
            <div class="profileId" v-if="userVo">
                <label>{{ userVo.uName }}</label> 님 <br>
                <label>보유 마일리지: {{ userVo.uPoint.toLocaleString() }}</label> P
            </div>
        </div>

        <!-- 동물프로필 -->
        <div class="profilePetBox">

            <!-- 반려견 등록 윗부분 -->
            <div class="profileTitle">
                <p style="width: 50px;">반려견</p>
                <router-link to="/petaddform"><img src="@/assets/images/add_icon_143118.png"
                        style="width: 24px;"></router-link>
            </div>

            <!-- 반려견 프로필 박스 -->
            <div class="petProfileBox" v-bind:key="i" v-for="(dogVo, i) in dogList">
                <!-- 반려견 1 -->
                <div class="profilePet" v-if="dogVo">

                    <img v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${dogVo.dogImg}`">
                    <p>
                        {{ dogVo.dogName }}
                        <!-- dogNo를 동적 세그먼트로 추가 -->
                        <router-link :to="`/petupdateform/${dogVo.dogNo}`">
                            <label style="cursor: pointer;">✏️</label>
                        </router-link>
                    </p>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import '@/assets/css/mypage/sidebar.css'
export default {
    name: "SideBar",
    components: {
    },

    data() {
        return {
            isFixed: false,
            userVo: {
                uProfile: "",
                uNo: this.$store.state.authUser.uNo,
                uId: "",
                uPoint: 0,
                uName: this.$store.state.authUser.uName
            },
            dogVo: {
                dogName: "",
                dogImg: "",
                dogNo: 0,
            },
            dogList: [],

        };
    },
    computed: {
        //동적으로 적용할 사이드바 스타일
        sidebarStyle() {
            return {
                position: this.isFixed ? 'fixed' : 'fixed',
                top: this.isFixed ? '0' : '138px',
                transition: 'top 0.3s ease',
            };
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll); // 컴포넌트가 소멸되기 전에 리스너 제거
    },

    methods: {
        //스크롤 이벤트 핸들러
        handleScroll() {
            const scrollTop = window.scrollY || window.pageYOffset; // 현재 스크롤 위치
            if (scrollTop > 138) {
                // 스크롤 위치가 138px 이상이면
                this.isFixed = true; // 사이드바를 고정 상태로 변경
            } else {
                this.isFixed = false; // 그렇지 않으면 사이드바를 고정 해제
            }
        },

        getUserInfor() {
            console.log("사이드바정보 가져오기");
            console.log(this.userVo.uNo);

            axios({
                method: 'get',
                url: `${this.$store.state.apiBaseUrl}/api/mypage/sidebar`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                params: { uNo: this.$store.state.authUser.uNo },
                responseType: 'json'
            }).then(response => {
                console.log(response.data.apiData);
                this.userVo = response.data.apiData;
                console.log(this.userVo);

                this.getUserInfor2();

            }).catch(error => {
                console.log(error);
            });


        },

        getUserInfor2() {
            console.log("사이드바정보 가져오기");
            console.log(this.userVo.uNo);

            axios({
                method: 'get', // put, post, delete                   
                url: `${this.$store.state.apiBaseUrl}/api/mypage/sidebar2`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { uNo: this.userVo.uNo }, //get방식 파라미터로 값이 전달
                // data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data.apiData); //수신데이타
                this.dogList = response.data.apiData;

                console.log(this.dogList);

            }).catch(error => {
                console.log(error);
            });

        },

    },
    created() {
        this.getUserInfor();
    }
};
</script>

<style></style>
