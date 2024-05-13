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
                <div id="petAddForm">
                    <div class="container">
                        <h1>반려견등록</h1>
                        <form>
                            <div class="petPhoto">
                                <input type="file">
                            </div>
                            <div>
                                <div class="detail">
                                    <label>펫 이름</label>
                                    <input type="text" placeholder="펫 이름을 입력해주세요.">
                                </div>
                                <div class="detail">
                                    <label>품종</label>
                                    <input type="text" placeholder="품종을 입력해 주세요.">
                                </div>
                                <div class="detail">
                                    <label class="title">몸무게</label>
                                    <input type="text"> kg
                                </div>
                                <div class="detail" id="petAge">
                                    <label>나이</label>
                                    <input type="text"> 살

                                </div>
                                <div class="detail">
                                    <label for="">성별</label>
                                    <button type="button">남아</button>
                                    <button type="button">여아</button>
                                </div>
                                <div class="detail">
                                    <label>중성화</label>
                                    <button type="button">O</button>
                                    <button type="button">X</button>
                                </div>
                                <div class="detail">
                                    <label>미용경험</label>
                                    <button type="button">O</button>
                                    <button type="button">X</button>
                                </div>
                                <div class="detail" id="feature">
                                    <label>특이사항</label>
                                    <button type="button">피부병</button>
                                    <button type="button">심장질환</button>
                                    <button type="button">마킹</button>
                                    <button type="button">마운팅</button>
                                    <div class="bite">
                                        <label>입질정도</label>
                                        <label for="top">상</label><input type="radio" id="top" value="top" name="bite">
                                        <label for="middle">중</label><input type="radio" id="middle" value="middle"
                                            name="bite">
                                        <label for="under">하</label><input type="radio" id="under" value="under"
                                            name="bite">
                                    </div>
                                    <textarea placeholder="기타 특이사항을 적어주세요."></textarea>
                                </div>
                            </div>
                        </form>
                        <div class="insertBtnBox">
                            <button class="insertBtn" type="">등록</button>
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
import "@/assets/css/mypage/mypage.css"

export default {
    name: "PetAddFormView",
    components: {
        AppHeader,
        AppFooter
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
