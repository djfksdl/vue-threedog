<template>
    <div id="wrap">
        <div id="msignup-container">
            <div class="msignup-box">
                <router-link to="/">
                    <img class="con-logo" src="../../assets/images/logo.png" alt="Logo">
                </router-link>
                <div class="msignup-form">
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group-man">
                            <div class="input-container">
                                <input type="text" id="id" name="id" placeholder="아이디">
                                <button type="button" @click="checkDuplicate" class="small-btn green-btn">중복확인</button>
                            </div>
                            <small v-if="isDuplicate" class="error-message">중복된 아이디입니다.</small>
                        </div>
                        <div class="form-group-man">
                            <input type="password" id="password" name="password" placeholder="비밀번호" v-model="password">
                        </div>
                        <div class="form-group-man">
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="비밀번호 확인"
                                v-model="confirmPassword" @input="checkPasswordMatch">
                            <br>
                            <small v-if="!isPasswordMatch" class="error-message">비밀번호가 일치하지 않습니다.</small>
                            <small v-if="isPasswordValid && confirmPassword.length > 0"
                                :class="{ 'success-message': isPasswordValid }">
                                {{ isPasswordValid ? '사용 가능한 비밀번호입니다.' : '' }}
                            </small>
                        </div>
                        <div class="form-group-man">
                            <div class="input-container">
                                <input type="text" id="num" name="num" placeholder="사업자등록번호">
                                <button type="button" @click="code_send"
                                    class="small-btn green-btn">확인</button>
                            </div>
                        </div>
                        <div class="form-group-man">
                                <input type="tel" id="storeNumber" name="storeNumber" placeholder="사업장 전화번호">
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
                        <button type="submit" class="msignupBtn">회원가입</button>
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
import "@/assets/css/potal/msignup.css"
export default {
    name: "ManagerSignView",
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
            console.log("회원가입");
        },
        checkDuplicate() {
            console.log("아이디 중복확인");
            // 아이디 중복 여부를 확인하는 비즈니스 로직 수행
            this.isDuplicate = true;
        },
        searchAddress() {
            console.log("주소 검색");
        },
        sendVerificationCode() {
            console.log("인증번호 전송.");
            this.showVerificationInput = true;
        },
        verifyCode() {
            console.log("인증번호 확인");
        },
        checkPasswordMatch() {
            this.isPasswordMatch = this.password === this.confirmPassword;
            this.isPasswordValid = this.isPasswordMatch;
        },
        numCheck() {
            console.log("첨부파일");
            // 파일 입력(input type="file") 클릭
            document.getElementById("numFile").click();
        },
        handleFileChange(event) {
            // 파일 변경 시 실행되는 로직
            console.log("파일 첨부됨:", event.target.files[0]);
        },
        openPostcode() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    this.zonecode = data.zonecode;
                    this.roadAddress = data.roadAddress;
                },
            }).open();
        },
        code_send(){

        }
    }
};
</script>