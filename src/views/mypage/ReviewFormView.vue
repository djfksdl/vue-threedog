<template>
    <div id="wrap">
        <AppHeader />
        <div id="reviewAddForm">
            <SideBar />
            <div class="container">
                <h1>후기등록</h1>
                <form>
                    <h2>평점을 선택해주세요</h2>
                    <div class="star-rating">
                        <div class="star" v-for="index in 5" :key="index" @click="check(index)">
                            <span v-if="index < score" class="yellowStar"><img
                                    src="@/assets/images/star_yellow.jpg"></span>
                            <span v-if="index >= score" class="grayStar"><img
                                    src="@/assets/images/star_gray.jpg"></span>
                        </div>
                        <div class="reviewScore">
                            <p v-if="score > 0"> {{ score - 1 }}.0 </p>
                            <p v-else>{{ score }}.0 </p>
                        </div>
                    </div>
                    <div class="reviewWrite">
                        <h2>후기작성</h2>
                        <textarea v-model="reviewText" placeholder="남겨신 후기는 다른 고객들에게 큰 도움이 됩니다."
                            @input="checkByte"></textarea>
                        <div class="add_area">
                            <p class="txt_count">
                                <span id="chk_byte">{{ byteCount }}</span>/<span class="maximum">500자</span>
                            </p>
                        </div>
                    </div>
                    <div class="reviewPhoto">
                        <div class="reviewPhoto2">
                            <h2>사진등록</h2>
                            <div class="pull">포토후기 작성하면 <p> 1000P </p>지급!</div>
                        </div>
           
                        <!-- https://velog.io/@sagesrkim/next.js-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%8B%A4%EC%A4%91-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%AF%B8%EB%A6%AC%EB%B3%B4%EA%B8%B0%EC%82%AD%EC%A0%9C-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84 -->
                        <div class="photoBox">
                            <label for="photo"><img src="@/assets/images/plus.png" style="width: 230px; border: 1px solid #a7a4a4;"></label>
                            <input type="file" id="photo">
                          
                            <div id="photoBox2">

                            </div>
                            <div id="photoBox2">

                            </div>
                            <div id="photoBox2">

                            </div>
                        </div>
                                     <p class="pBox1">* 사진은 최대 3장까지 첨부할수있습니다.</p>
                        <p class="pBox2">º 포토 후기 이벤트로 지급되는 포인트는 매달 1회만 지급됩니다.</p>
                    </div>

                </form>
                <div class="submitBtn">
                    <button type="submit">저장하기</button>
                </div>
            </div>
        </div>
        <TopButton />
        <AppFooter />
    </div><!-- wrap -->
</template>


<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
import TopButton from "@/components/TopButton.vue";
import SideBar from "@/components/SideBar.vue";

import "@/assets/css/mypage/mypage.css"


export default {
    name: "ReviewFormView",
    components: {
        TopButton,
        AppHeader,
        AppFooter,
        SideBar,
    },
    data() {
        return {
            score: 0,  //별점
            reviewText: "", //후기내용
            byteCount: 0,   // 후기내용의 바이트수
            images: [], // 이미지배열
        };
    },
    methods: {

        // 별점점수
        check(index) {
            this.score = index + 1;
        },

        // 후기작성 바이트수
        checkByte() {
            this.byteCount = this.reviewText.length;
        },

    },

};
</script>

<style></style>