<template>
    <div id="wrap">
        <AppHeader />
        <div class="reviewContainer">
            <SideBar />
            <div class="container">

                <div class="myreviewContainer">


                    <!-- <div class="reviewDetailImg" v-bind:key="i" v-for="(reviewVo, i) in reviewList">
                    <img v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${reviewVo.saveName}`"
                        style="width: 300px; height: 350px;">
                     </div> -->
                    <div style="display: flex;">
                        <div>
                            <img src="@/assets/images/dog.jpg" alt="">
                        </div>
                        <div>

                            <div class="reviewInfor">

                                <div class="title3"><label>가게명</label>개개개</div>
                                <div class="address3"><label>가게주소</label>경기도 성남시 중원구 상대원2동 2993-3번지 404호</div>
                                <div class="date3"> <label> 예약날짜 </label>2021-06-04 14:00</div>
                                <div class="writeDate3"><label>작성날짜</label> 2021-06-04</div>
                                <div class="cutInfor3"><label>반려견</label> 마리(3.5kg)</div>
                                <div class="price3"><label>가격</label>20,000원</div>
                                <div><label>별점</label></div>

                                <!-- <div style="display: flex;"> -->
                                <!-- <div class="star" style="margin-top: 3px;">
                                <span v-for="i in Math.floor(reviewVo.star)" :key="i"><img
                                        src="@/assets/images/star_yellow.jpg" style="width: 15px;"></span>
                                <span v-for="i in 5 - Math.ceil(reviewVo.star)" :key="'empty_' + i"><img
                                        src="@/assets/images/star_gray.jpg" style="width: 15px;"></span>
                            </div> -->
                                <!-- </div> -->

                                <!-- <div>
                                <img src="@/assets/images/dog.jpg" alt="">
                                <img src="@/assets/images/dog2.jpg" alt="">
                                <img src="@/assets/images/dog.jpg" alt="">
                            </div> -->

                            </div>

                        </div>
                    </div>



                    <div class="context3">
                        ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                    </div>

                </div>

            </div>
        </div>
        <AppFooter />
    </div>
</template>
<script>
import 'swiper/swiper-bundle.css';
// import axios from "axios"
import '@/assets/css/mypage/reserve.css'
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import SideBar from "@/components/SideBar.vue"

// import { Swiper, SwiperSlide } from 'swiper/vue';


export default {
    name: "MyReview",
    components: {
        AppHeader,
        AppFooter,
        SideBar,
        // Swiper,
        // SwiperSlide
    },
    setup() {
        return {

        };
    },
    data() {
        return {


        };
    },

    computed: {
    },
    methods: {


    },


};
</script>
<style></style>