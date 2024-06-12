<template>
    <div id="wrap">
        <div id="signup-container">
            <div class="signup-box">
                <router-link to="/">
                    <img class="con-logo" src="../../assets/images/logo.png" alt="Logo">
                </router-link>
                <!-- 회원가입 -->
                <div class="signup-form">
                    <form @submit.prevent="signup" enctype="multipart/form-data">
                        <!-- 프로필사진 -->
                        <div class="form-group preview-image" > 
                            <!-- 미리보기 이미지 -->
                            <img id="preview-pimage">
                            <!-- 파일 대신 버튼 -->
                            <label for="input-file" class="pImgAddBtn"></label>
                            <!-- 파일버튼 -->
                            <input type="file" id="input-file" class="upload-hidden" @change="handleFileUpload" >
                        </div>

                        <!-- 아이디 중복확인 -->
                        <div class="form-group">
                            <div class="input-container">
                                <input type="text" id="id" name="id" placeholder="아이디" v-model="userVo.uId" >
                                <button type="button" @click="checkDuplicate" class="small-btn green-btn">중복확인</button>
                            </div>
                            <small v-if="isDuplicate === true" class="error-message">중복된 아이디입니다.</small>
                            <small v-if="isDuplicate === false && userVo.uId.length > 0" class="success-message">사용 가능한 아이디입니다.</small>
                        </div>

                        <!-- 비밀번호 확인 -->
                        <div class="form-group">
                            <input type="password" id="password" name="password" placeholder="비밀번호" v-model="userVo.uPw">
                        </div>
                        <div class="form-group">
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="비밀번호 확인"
                                v-model="confirmPassword" @input="checkPasswordMatch">
                            <br>
                            <small v-if="!isPasswordMatch" class="error-message">비밀번호가 일치하지 않습니다.</small>
                            <small v-if="isPasswordValid && confirmPassword.length > 0"
                                :class="{ 'success-message': isPasswordValid }">
                                {{ isPasswordValid ? '비밀번호가 일치합니다.' : '' }}
                            </small>
                        </div>

                        <!-- 이름 -->
                        <div class="form-group">
                            <input type="text" id="name" name="name" placeholder="이름" v-model="userVo.uName">
                        </div>

                        <!-- 전화번호 -->
                        <div class="form-group">
                            <div class="input-container">
                                <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="전화번호" v-model="userVo.uPhone">
                            </div>
                        </div>

                        <!-- 우편번호 -->
                        <div class="form-group" style="margin-bottom: 10px;">
                            <div class="input-container">
                                <input type="text" id="postalCode" placeholder="우편번호" v-model="userVo.uZipCode" readonly>
                                <button id="postcode" type="button" @click="openPostcode" class="small-btn green-btn">검색</button>
                            </div>
                        </div>
                        <!-- 주소 -->
                        <div class="form-group" style="margin-bottom: 10px;">
                            <input type="text" v-model="userVo.uAddress" placeholder="주소" readonly>
                        </div>
                        <div class="form-group" style="margin-bottom: 10px;">
                            <input type="text" v-model="userVo.uDetailAddress" placeholder="상세 주소">
                        </div>

                        <!-- 서버 연결한 뒤에 다시 해 보기 로봇 -->
                        <!-- <div id="google_recaptha">
                            <div class="g-recaptcha" data-sitekey="6LfZqNspAAAAAAze3c3G_KHi67Z2gKiF0WM58CG4"></div>
                        </div> -->
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
import axios from "axios";
import defaultProfileImg from '@/assets/images/default_profile.jpg';

export default {
    name: "SignView",
    components: {
    },
    data() {
        return {
            showVerificationInput: false, // 인증번호 입력 상자 보이기 여부
            isDuplicate: null, // 아이디 중복 여부 -> ""로 하면 빈칸인데 사용가능한 아이디라고 나옴. 
            confirmPassword: "", // 비밀번호 확인 값
            isPasswordMatch: true, // 비밀번호 일치 여부
            isPasswordValid: false, // 사용 가능한 비밀번호 여부
            zonecode: "",
            roadAddress: "",
            detailAddress: "",
            userVo:{
                uId: "",
                uPw: "",
                uName:"",
                uPhone:"",
                uZipCode:"",
                uAddress:"",
                uDetailAddress:"",
                file: null
            },
        };
    },
    methods: {
        // 프로필 이미지 미리보기
        handleFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            if (!file.type.match(/image\//)) {
                this.modalVisible = true;
                return;
            }

            reader.onload = () => {
                const imgSrc = reader.result;
                const imgElement = document.getElementById('preview-pimage'); // 이미지를 표시할 <img> 요소 선택
                imgElement.src = imgSrc; // 이미지 소스를 설정하여 이미지 표시
            };

            reader.readAsDataURL(file);

            // FormData에 파일 추가
            this.userVo.file = file;
        },

        // 아이디 중복확인 버튼 눌렀을때
        checkDuplicate() {
            // console.log("아이디 중복확인 버튼이 클릭되었습니다.");

            axios({
                method: 'post', // put, post, delete 
                url: `${this.$store.state.apiBaseUrl}/api/su/idcheck`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: {uId: this.userVo.uId}, //get방식 파라미터로 값이 전달
                // data: formData, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data.apiData); //수신데이타

                if (response.data.apiData == 1) {
                    this.isDuplicate = true;
                } else {
                    this.isDuplicate = false;
                }
            }).catch(error => {
                console.log(error);
            });

        },

        // 회원가입 버튼눌렀을때
        async signup() {
            console.log(this.userVo);

            if(this.userVo.uId == ""){
                window.alert("아이디를 입력해주세요");
            }else if(this.isDuplicate== null){
                window.alert("아이디 중복확인해주세요");
            }else if(this.userVo.uPw == ""){
                window.alert("비밀번호를 입력해주세요");
            }else if(this.confirmPassword == ""){
                window.alert("비밀번호를 확인해주세요");
            }else if(this.userVo.uName == ""){
                window.alert("이름을 입력해주세요");
            }else if(this.userVo.uPhone == ""){
                window.alert("전화번호를 입력해주세요");
            }else if(this.userVo.uZipCode == ""){
                window.alert("주소를 입력해주세요");
            }else if(this.userVo.uDetailAddress == ""){
                window.alert("상세주소를 입력해주세요");
            }else{
                let formData = new FormData();
                
                for (let key in this.userVo) {
                    if(key == "file" &&  this.userVo["file"] == null) {
                        // 기본 이미지를 Blob으로 변환하여 추가
                        const response = await fetch(defaultProfileImg);
                        const blob = await response.blob();
                        formData.append("file", blob, 'default_profile.jpg');
                    }else{
                        formData.append(key, this.userVo[key]);
                    }
                }
    
                axios({
                    method: 'post', // put, post, delete 
                    url: `${this.$store.state.apiBaseUrl}/api/su/signup`,
                    headers: { "Content-Type": "multipart/form-data" }, //전송타입
                    //params: usersVo, //get방식 파라미터로 값이 전달
                    data: formData, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                    responseType: 'json' //수신타입
                }).then(response => {
                    console.log(response.data.apiData); //수신데이타
    
                    if (response.data.apiData == 1) {
                        alert("환영합니다. 회원가입에 성공하셨습니다.");
                        this.$router.push({ path: '/login', query: { name: this.userVo.uName } });
                    } else {
                        alert("회원가입에 실패하였습니다.");
                    }
                }).catch(error => {
                    console.log(error);
                });
            }

        },
        
        openPostcode() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    this.userVo.uZipCode = data.zonecode;
                    this.userVo.uAddress = data.roadAddress;
                },
            }).open();
        },
        
        // 인증번호 보내기
        sendVerificationCode() {
            // console.log("인증번호 전송 버튼이 클릭되었습니다.");
            if(this.userVo.uPhone ==""){
                window.alert("전화번호를 입력해주세요.")
            }else{
                window.alert("인증번호를 발송했습니다.")
                this.showVerificationInput = true;
            }
        },
        verifyCode() {
            console.log("인증번호 확인 버튼이 클릭되었습니다.");
        },
        checkPasswordMatch() {
            this.isPasswordMatch = this.userVo.uPw === this.confirmPassword;
            this.isPasswordValid = this.isPasswordMatch;
        },
        
    },
    mounted(){
        // const script = document.createElement('script');
        // script.src = 'https://www.google.com/recaptcha/api.js';
        // script.async = true;
        // document.getElementById('google_recaptha').appendChild(script);
    }
};
</script>