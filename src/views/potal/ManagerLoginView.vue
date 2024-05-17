<template>
    <div id="wrap">
        <div id="mlogin-container">
            <div class="mlogin-box">
                <router-link to="/">
                    <img class="con-logo" src="../../assets/images/logo.png" alt="Logo">
                </router-link>
                <div class="login-form">
                    <form>
                        <div class="form-group-login">
                            <input type="text" id="id" name="id" placeholder="아이디">
                        </div>
                        <div class="form-group-login">
                            <input type="password" id="password" name="password" placeholder="비밀번호">
                            <span class="toggle-password" @click="togglePasswordVisibility">
                                <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
                            </span>
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
export default {
    name: "ManagerLoginView",
    components: {
    },
    data() {
        return {
            showPassword: false // 초기에는 비밀번호 감춤
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
        }
    },
};
</script>