<template>
    <div id="wrap">
        <div id="mlogin-container">
            <div class="mlogin-box">
                <router-link to="/">
                    <img class="con-logo" src="../../assets/images/logo.png" alt="Logo">
                </router-link>
                <div class="login-form">
                    <form @submit.prevent="mLogin">
                        <div class="form-group-login">
                            <input type="text" id="id" name="id" placeholder="아이디" v-model="id">
                        </div>
                        <div class="form-group-login">
                            <input type="password" id="password" name="password" placeholder="비밀번호" v-model="password"
                                @keyup="checkCapsLock">
                            <span class="toggle-password" @click="togglePasswordVisibility">
                                <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
                            </span>
                            <div v-if="isCapsLockOn" class="caps-lock-warning">CapsLock이 켜져 있습니다!</div>
                        </div>
                        <button type="submit" class="loginBtn">로그인</button>
                        <router-link to="/msignup">
                            <button class="signinBtn">회원가입</button>
                        </router-link>
                    </form>
                </div>
            </div><!-- login-box -->
            <div class="mlogin-image-container">
                <img src="../../assets/images/banner02.png" alt="Image">
            </div>
            <div class="mlogin-footer">
                <ul class="login-footer-ul">
                    <li>이용약관</li>
                    <li>개인정보처리방침</li>
                    <li>책임의 한계와 법적고지</li>
                    <li>회원정보 고객센터</li>
                </ul>
                <p>© 2024 개개개 주식회사. All Rights Reserved.</p>
            </div>
        </div><!-- login-container -->
    </div><!-- wrap -->
</template>

<script>
import "@/assets/css/potal/mlogin.css"
import axios from 'axios';

export default {
    name: "ManagerLoginView",
    components: {
    },
    data() {
        return {
            id: "", // 아이디를 위한 데이터
            password: "", // 비밀번호를 위한 데이터
            showPassword: false, // 초기에는 비밀번호 감춤
            isCapsLockOn: false
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword; // 비밀번호 보이기/감추기 전환
            const passwordInput = document.getElementById('password');
            if (this.showPassword) {
                passwordInput.type = 'text'; // 비밀번호 보이기
            } else {
                passwordInput.type = 'password'; // 비밀번호 감추기
            }
        },
        checkCapsLock(event) {
            const isCapsLock = event.getModifierState && event.getModifierState('CapsLock');
            this.isCapsLockOn = isCapsLock;
        },
        mLogin() {
            console.log("로그인");

            const formData = new FormData();
            formData.append("bId", this.id);
            formData.append("bPw", this.password);

            // console.log(formData);
            // console.log(this.password);

            axios({
                method: 'post',
                url: `${this.$store.state.apiBaseUrl}/api/mlogin`,
                headers: { "Content-Type": "multipart/form-data" },
                data: formData,
                responseType: 'json' // 수신 형식 지정
            }).then(response => {
                // console.log(response.data.apiData);
                // console.log(response.data.apiData.bNo);
                this.$router.push(`/edit/${response.data.apiData.bId}`);

            }).catch(error => {
                console.log(error);
                // 오류 처리
            });
        }
    },
};
</script>
