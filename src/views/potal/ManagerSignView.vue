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
                                <input type="text" id="id" name="id" placeholder="아이디" v-model="id">
                                <button type="button" @click="checkDuplicate" class="small-btn green-btn">중복확인</button>
                            </div>
                            <small v-if="isDuplicate === true" class="error-message">중복된 아이디입니다.</small>
                            <small v-if="isDuplicate === false" class="success-message">가입 가능한 아이디입니다.</small>
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
                                <input type="text" id="num" name="num" placeholder="사업자등록번호" v-model="businessNumber">
                                <button type="button" @click="checkBusinessNumber"
                                    class="small-btn green-btn">확인</button>
                            </div>
                            <small v-if="businessCheckMessage" :class="businessCheckClass">{{ businessCheckMessage
                                }}</small>
                        </div>
                        <div class="form-group-man">
                            <input type="tel" id="bPhone" name="bPhone" placeholder="사업장 전화번호" v-model="bPhone">
                        </div>
                        <div class="form-group-man" style="margin-bottom: 10px;">
                            <div class="input-container">
                                <input type="text" id="postalCode" placeholder="우편번호" v-model="zonecode" readonly>
                                <button id="postcode" type="button" @click="openPostcode"
                                    class="small-btn green-btn">검색</button>
                            </div>
                        </div>
                        <div class="form-group-man" style="margin-bottom: 10px;">
                            <input type="text" v-model="roadAddress" placeholder="주소" readonly>
                        </div>
                        <div class="form-group-man" style="margin-bottom: 10px;">
                            <input type="text" v-model="detailAddress" placeholder="상세 주소">
                        </div>

                        <div id="google_recaptha">
                            <div class="g-recaptcha" data-sitekey="6LfZqNspAAAAAAze3c3G_KHi67Z2gKiF0WM58CG4"></div>
                        </div>
                        <div class="duplicateModal" v-if="showModal">
                            <div class="msignup-modal-content">
                                <span><strong>아이디</strong> 중복 체크해 주세요</span>
                                <button @click="closeDuplicateModal">확인</button>
                            </div>
                        </div>
                        <div class="duplicateModal" v-if="showModal02">
                            <div class="msignup-modal-content">
                                <span><strong>사업자등록번호</strong> 인증해 주세요</span>
                                <button @click="closeDuplicateModal">확인</button>
                            </div>
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
import "@/assets/css/potal/msignup.css";
import axios from 'axios';

export default {
    name: "ManagerSignView",
    data() {
        return {
            showVerificationInput: false, // 인증번호 입력 상자 보이기 여부
            isDuplicate: null, // 아이디 중복 여부
            password: "", // 비밀번호
            confirmPassword: "", // 비밀번호 확인 값
            isPasswordMatch: true, // 비밀번호 일치 여부
            isPasswordValid: false, // 사용 가능한 비밀번호 여부
            zonecode: "",
            roadAddress: "",
            detailAddress: "",
            businessNumber: "", // 사업자등록번호
            businessCheckMessage: "", // 사업자등록번호 확인 메시지,
            showModal: false,
            showModal02: false,
        };
    },
    methods: {
        handleSubmit() {
            console.log("회원가입");

            if (this.isDuplicate == true || this.isDuplicate == null) {
                this.showModal = true;
            } else {
                if (this.businessCheckClass === "success-message") {
                    const formData = new FormData();
                    formData.append("bId", this.id);
                    formData.append("bPw", this.password);
                    formData.append("bNum", this.businessNumber);
                    formData.append("bZipCode", this.zonecode);
                    formData.append("bAddress", this.roadAddress);
                    formData.append("bdAddress", this.detailAddress);
                    formData.append("bPhone", this.bPhone);

                    axios({
                        method: 'post', // put, post, delete 
                        url: `${this.$store.state.apiBaseUrl}/api/msignup`,
                        headers: { "Content-Type": "multipart/form-data" },
                        data: formData, // put, post, delete 방식 자동으로 JSON으로 변환 전달
                        responseType: 'json' // 수신타입
                    }).then(response => {
                        console.log(response.data);
                        this.$router.push('/mlogin');

                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    this.showModal02 = true;
                }
            }
        },
        async checkDuplicate() {
            axios({
                method: 'get', // put, post, delete 
                url: `${this.$store.state.apiBaseUrl}/api/msignup/id`,
                headers: { "Content-Type": "multipart/form-data" },
                params: {
                    id: this.id
                },
            }).then(response => {
                console.log(response.data);
                if (response.data.apiData == 1) {
                    this.isDuplicate = true;
                } else {
                    this.isDuplicate = false;
                }
            }).catch(error => {
                console.log(error);
            });
        },
        checkPasswordMatch() {
            this.isPasswordMatch = this.password === this.confirmPassword;
            this.isPasswordValid = this.isPasswordMatch;
        },
        openPostcode() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    this.zonecode = data.zonecode;
                    this.roadAddress = data.roadAddress;
                },
            }).open();
        },
        checkBusinessNumber() {
            const data = { b_no: [this.businessNumber] };
            axios.post('https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=kLwu8It5iiIWVEWui%2FFpNx7qI2XcPU6H6lfgnHJ1RGVI0nNAR9yfRk7eWA8m9ncjMV%2FSeJ2g36xCarutBsixGw%3D%3D', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YWFzc2RkMjM2QG5hdmVyLmNvbSAg'
                }
            })
                .then(response => {
                    console.log('Response:', response.data);
                    if (response.data && response.data.data && response.data.data.length > 0) {
                        const valid = response.data.data[0].b_stt_cd;
                        if (valid === '01') {
                            this.businessCheckMessage = "사업자등록번호 확인";
                            this.businessCheckClass = "success-message";
                        } else {
                            this.businessCheckMessage = "사업자등록번호 확인 불가능";
                            this.businessCheckClass = "error-message";
                            this.showBusinessNumberModal = true;
                        }
                    } else {
                        this.businessCheckMessage = "올바른 번호를 입력해 주세요.";
                        this.businessCheckClass = "error-message";
                        this.showBusinessNumberModal = true;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.businessCheckMessage = "올바른 번호를 입력해 주세요.";
                    this.businessCheckClass = "error-message";
                    this.showBusinessNumberModal = true;
                });
        },
        closeDuplicateModal() {
            this.showModal = false;
            this.showModal02 = false;
        },
    },
    mounted() {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        document.getElementById('google_recaptha').appendChild(script);
    }
}
</script>
