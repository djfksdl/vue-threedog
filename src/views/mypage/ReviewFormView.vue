<template>
    <div id="wrap">

        <AppHeader />

        <div id="reviewAddForm">
            <div class="sidebar">
                <div class="profile">
                    <div class="profileImg">
                        <img src="@/assets/images/dog2.jpg">
                    </div>
                    <div class="profileId">
                        <label>dddddd</label> 님 <br>
                        <label>1500</label> P
                    </div>
                </div>
                <div class="profilePetBox">
                    <div class="profileTitle">
                        <p>반려견</p>
                        <router-link to="/petaddform">➕</router-link>
                    </div>
                    <div class="profilePet">
                        <img src="@/assets/images/dog.jpg">
                        <p>dddd(3세)</p>
                    </div>
                    <div class="profilePet">
                        <img src="@/assets/images/dog.jpg">
                        <p>마리(3세)</p>
                    </div>
                </div>
            </div>
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
                        <textarea v-model="reviewText"
                            placeholder="남겨신 후기는 다른 고객들에게 큰 도움이 됩니다."
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
                        <div class="reviewPhotoInput">
                            <label className="input-file-button" for="input-file">+</label>
                            <input type="file" id="input-file">
                        </div>
                    </div>
                    <p>포토 후기 이벤트로 지급되는 포인트는 매달 1회만 지급됩니다.</p>
                </form>
                <button type="submit">저장하기</button>
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
import "@/assets/css/mypage/mypage.css"


export default {
    name: "ReviewFormView",
    components: {
        TopButton,
        AppHeader,
        AppFooter
    },
    data() {
        return {
            score: 0,  //별점
            reviewText: "", //후기내용
            byteCount: 0,   // 후기내용의 바이트수
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