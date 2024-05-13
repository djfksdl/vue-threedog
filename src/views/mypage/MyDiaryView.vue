<template>
    <div id="wrap">
        <div class="headerSideBar">
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
                <div class="profileTitle">
                    <p>반려견</p>
                    <button type="button">+</button>
                </div>
                <div class="profilePet">
                    <img src="@/assets/images/dog.jpg">
                    <p>마리(3세)</p>
                </div>
                <div class="profilePet">
                    <img src="@/assets/images/dog.jpg">
                    <p>마리(3세)</p>
                </div>
            </div>
            <div>
                <AppHeader />
                <div id="myDiary">
                    <div class="container">
                        <h1>미용다이어리📖</h1>
                        <div class="myDiary02">
                            <div>
                                <div>
                                    <p>2024년 5월 13일(월)</p>
                                    <p>마리</p>
                                </div>
                                <div class="mypetImgSlider">
                                    <img src="@/assets/images/dog.jpg">
                                    <!-- <img src="@/assets/images/dog2.jpg"> -->
                                    
                                </div>
                            </div>
                            <div class="context">
                                <div><p>몸무게</p>3.2 kg</div>
                                <div><p>미용예절</p>매너있어요</div>
                                <div><p>컨디션</p>아주좋아요</div>
                                <div><p>엉킴(부위)</p>목</div>
                                <div><p>싫어했던 부위</p>얼굴,귀</div>
                                <div><p>추가요금</p>2,0000원</div>
                                <div><p>전달사항</p>집가고싶어요</div>
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

        };
    },
    methods: {

    },
};
</script>