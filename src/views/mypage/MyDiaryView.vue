<template>
    <div id="wrap">
        <AppHeader />
        <div id="myDiary">
            <SideBar />
            <div class="myDiary-container">
                <div class="title">
                    <h1>알림장</h1>
                </div>
                <div class="slider-container">
                    <button class="slider-control left" @click="prevSlide">＜</button>
                    <div class="slider">
                        <div v-for="(entry, index) in diaryEntries" :key="index" class="myDiary02">
                            <div class="petProfile">
                                <div class="store">
                                    <p><strong>◆ 가게명</strong></p>
                                    <p>{{ entry.title }}</p>
                                </div>
                                <div class="date">
                                    <p><strong>◆ 가게번호</strong></p>
                                    <p>{{ entry.bPhone }}</p>
                                </div>
                                <div class="date">
                                    <p><strong>◆ 이용일</strong></p>
                                    <p>{{ getUsageDate(entry.rtDate) }} ({{ entry.rtTime }})</p>
                                </div>
                                <div class="petName">
                                    <p><strong>◆ 애견명</strong></p>
                                    <p>{{ entry.dogName }}</p>
                                </div>
                                <div class="mypetImgSlider">
                                    <p><strong> ◆ 미용 후 이미지</strong></p>
                                    <img :src="entry.afterImgUrl" alt="After Grooming Image">
                                </div>
                            </div>
                            <div class="context">
                                <div class="weight">
                                    <p>☉ 몸무게</p>
                                    <p>{{ entry.curruntWeight }}</p>
                                </div>
                                <div>
                                    <p>☉ 미용예절</p>
                                    <p>{{ entry.attitude }}</p>
                                </div>
                                <div>
                                    <p>☉ 컨디션</p>
                                    <p>{{ entry.rCondition }}</p>
                                </div>
                                <div>
                                    <p>☉ 엉킴(부위)</p>
                                    <p>{{ entry.tangle }}</p>
                                </div>
                                <div>
                                    <p>☉ 싫어했던 부위</p>
                                    <p>{{ entry.disliked }}</p>
                                </div>
                                <div>
                                    <p>☉ 추가요금</p>
                                    <p>{{ entry.surcharge }}</p>
                                </div>
                                <div>
                                    <p>☉ 전달사항</p>
                                    <p>{{ entry.message }}</p>
                                </div>
                                <div class="review" v-if="entry.rNo==0">
                                    <router-link
                                        :to="{ name: 'reviewform', params: { rsNo: entry.rsNo, bNo: entry.bNo } }">
                                        후기작성</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="slider-control right" @click="nextSlide">＞</button>
                </div>
            </div>
        </div>
        <TopButton />
        <AppFooter />
    </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import SideBar from '@/components/SideBar.vue'
import TopButton from "@/components/TopButton.vue"
import '@/assets/css/manager/mydiary.css'
import axios from 'axios';

export default {
    name: "MyDiaryView",
    components: {
        AppHeader,
        AppFooter,
        SideBar,
        TopButton,
    },
    data() {
        return {
            diaryEntries: [], // 알림장 항목을 저장할 배열
            currentIndex: 0, // 현재 슬라이드 인덱스
        };
    },
    created() {
        this.fetchDiaryEntries();
    },
    methods: {
        fetchDiaryEntries() {
            const uNo = this.$store.state.authUser.uNo; // 사용자의 번호를 가져옵니다.
            axios({
                method: 'get',
                url: `${this.$store.state.apiBaseUrl}/api/jw/userDogList/${uNo}`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                responseType: 'json'
            }).then(response => {
                console.log("============================================");
                console.log('다이어리 불러오기 성공:', response.data.apiData);
                this.diaryEntries = response.data.apiData; // 응답 데이터를 diaryEntries에 저장
                this.diaryEntries = response.data.apiData.map(entry => {
                    return {
                        ...entry,
                        afterImgUrl: `${this.$store.state.apiBaseUrl}/upload/${entry.saveName}`
                    };
                });
                console.log("diaryEntries:", this.diaryEntries);

            }).catch(error => {
                console.error('다이어리 불러오기 에러:', error);
            });
        },
        nextSlide() {
            if (this.currentIndex < this.diaryEntries.length - 1) {
                this.currentIndex++;
            }
        },
        prevSlide() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
        },
        // 이용일자만 표시하는 메서드
        getUsageDate(rtDate) {
            // 예시: rtDate가 'YYYY년 MM월 DD일 HH:mm:ss' 형식일 경우
            const parts = rtDate.split(' '); // 공백을 기준으로 분할
            return parts[0]; // YYYY년 MM월 DD일 부분만 반환
        },
    },
    watch: {
        currentIndex(newIndex) {
            const slider = this.$el.querySelector('.slider');
            slider.style.transform = `translateX(-${newIndex * 990}px)`;
        }
    }
};
</script>
