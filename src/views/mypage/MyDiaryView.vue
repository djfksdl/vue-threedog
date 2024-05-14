<template>
    <div id="wrap">
        <div class="headerSideBar">
            <div>
                <AppHeader />
                <div id="myDiary">
                    <div class="container">
                        <h1>알림장📖</h1>
                        <div class="dateBox">
                            <label for="dateChoice">📅날짜선택</label>
                            <!-- <input type="date" id="dateChoice"> -->
                        </div>

                        <div class="myDiary02">
                            <div>
                                <!-- <p>마리</p> -->
                                <div class="mypetImgSlider">
                                    <img src="@/assets/images/dog2.jpg">
                                    <!-- <img src="@/assets/images/dog2.jpg"> -->
                                </div>
                            </div>
                            <div class="relevantDate">05.14(목) <span>마리</span></div>

                            <div class="context">
                                <div>
                                    <p>몸무게</p><p>3.2 kg</p>
                                </div>
                                <div>
                                    <p>미용예절</p><p>매너있어요</p>
                                </div>
                                <div>
                                    <p>컨디션</p><p>아주좋아요</p>
                                </div>
                                <div>
                                    <p>엉킴(부위)</p><p>목</p>
                                </div>
                                <div>
                                    <p>싫어했던 부위</p><p>얼굴,귀</p>
                                </div>
                                <div>
                                    <p>추가요금</p><p>2,0000원</p>
                                </div>
                                <div>
                                    <p>전달사항</p><p>집가고싶어요</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>


        <AppFooter />
    </div><!-- wrap -->
</template>


<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
export default {
    name: "MyDiaryView",
    components: {
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            date: '',
        };
    },
    methods: {

    },
};
</script>