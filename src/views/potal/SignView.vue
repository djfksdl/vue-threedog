<template>
    <div id="wrap">
        <div id="signup-container">
            <div class="signup-box">
                <router-link to="/">
                    <img class="con-logo" src="../../assets/images/logo.png" alt="Logo">
                </router-link>
                <div class="signup-form">
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <div class="input-container">
                                <input type="text" id="id" name="id" placeholder="아이디">
                                <button type="button" @click="checkDuplicate" class="small-btn green-btn">중복확인</button>
                            </div>
                            <small v-if="isDuplicate" class="error-message">중복된 아이디입니다.</small>
                        </div>
                        <div class="form-group">
                            <input type="password" id="password" name="password" placeholder="비밀번호" v-model="password">
                        </div>
                        <div class="form-group">
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="비밀번호 확인"
                                v-model="confirmPassword" @input="checkPasswordMatch">
                            <br>
                            <small v-if="!isPasswordMatch" class="error-message">비밀번호가 일치하지 않습니다.</small>
                            <small v-if="isPasswordValid && confirmPassword.length > 0"
                                :class="{ 'success-message': isPasswordValid }">
                                {{ isPasswordValid ? '사용 가능한 비밀번호입니다.' : '' }}
                            </small>
                        </div>
                        <div class="form-group">
                            <input type="text" id="name" name="name" placeholder="이름">
                        </div>
                        <div class="form-group">
                            <div class="input-container">
                                <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="전화번호">
                                <button type="button" @click="sendVerificationCode"
                                    class="small-btn green-btn">전송</button>
                            </div>
                        </div>
                        <div v-if="showVerificationInput" class="form-group">
                            <div class="input-container">
                                <input type="text" id="verificationCode" name="verificationCode" placeholder="인증번호 입력">
                                <button type="button" @click="verifyCode" class="small-btn green-btn"
                                    style="margin-left: 10px;">확인</button>
                            </div>
                        </div>
                        <div class="form-group" style="margin-bottom: 10px;">
                            <div class="input-container">
                                <input type="text" id="postalCode" placeholder="우편번호" v-model="zonecode" readonly>
                                <button id="postcode" type="button" @click="openPostcode"
                                    class="small-btn green-btn">검색</button>
                            </div>
                        </div>
                        <div class="form-group" style="margin-bottom: 10px;">
                            <input type="text" v-model="roadAddress" placeholder="주소" readonly>
                        </div>
                        <div class="form-group" style="margin-bottom: 10px;">
                            <input type="text" v-model="detailAddress" placeholder="상세 주소">
                        </div>

                        <!-- 서버 연결한 뒤에 다시 해 보기 로봇 -->
                        <div id="google_recaptha">
                            <div class="g-recaptcha" data-sitekey="6LfZqNspAAAAAAze3c3G_KHi67Z2gKiF0WM58CG4"></div>
                        </div>
                        <!-- 서버 연결한 뒤에 다시 해 보기 로봇 -->

                        <button type="submit" class="signupBtn">회원가입</button>
                    </form>
                </div>
            </div><!-- signup-box -->
            <div class="signup-footer">
                <ul class="signup-footer-ul">
                    <li>이용약관</li>
                    <li>개인정보처리방침</li>
                    <li>책임의 한계와 법적고지</li>
                    <li>회원정보 고객센터</li>
                </ul>
                <p>© 2024 개개개 주식회사. All Rights Reserved.</p>
            </div>
        </div><!-- signup-container -->
    </div><!-- wrap -->
</template>

<script>
import "@/assets/css/potal/signup.css"
export default {
    name: "SignView",
    components: {
    },
    data() {
        return {
            showVerificationInput: false, // 인증번호 입력 상자 보이기 여부
            isDuplicate: false, // 아이디 중복 여부
            confirmPassword: "", // 비밀번호 확인 값
            isPasswordMatch: true, // 비밀번호 일치 여부
            isPasswordValid: false, // 사용 가능한 비밀번호 여부
            zonecode: "",
            roadAddress: "",
            detailAddress: "",
        };
    },
    methods: {
        handleSubmit() {
            console.log("회원가입 버튼이 클릭되었습니다.");
        },
        checkDuplicate() {
            console.log("아이디 중복확인 버튼이 클릭되었습니다.");
            // 아이디 중복 여부를 확인하는 비즈니스 로직 수행
            this.isDuplicate = true;
        },
        openPostcode() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    this.zonecode = data.zonecode;
                    this.roadAddress = data.roadAddress;
                },
            }).open();
        },
        sendVerificationCode() {
            console.log("인증번호 전송 버튼이 클릭되었습니다.");
            this.showVerificationInput = true;
        },
        verifyCode() {
            console.log("인증번호 확인 버튼이 클릭되었습니다.");
        },
        checkPasswordMatch() {
            this.isPasswordMatch = this.password === this.confirmPassword;
            this.isPasswordValid = this.isPasswordMatch;
        }
    },
    mounted(){
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        document.getElementById('google_recaptha').appendChild(script);
    }
};
</script>