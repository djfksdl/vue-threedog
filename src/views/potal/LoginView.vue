<template>
    <div id="wrap">
        <div id="login-container">
            <div class="login-box">
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
                        <router-link to="/signup">
                            <button class="signinBtn">회원가입</button>
                        </router-link>

                        <p class="signup-link">직원 간편 로그인은 <a href="/mlogin" class="manager-signup">여기</a>를 클릭!</p>
                        <div class="sns01">
                            <a id="" @click="kakaoLogin()">
                                <img class="kakao" src="../../assets/images/kakao.png">
                            </a>
                            <div id="naver_id_login">
                                <a id="">
                                    <img class="naver" src="../../assets/images/naver.png">
                                </a>
                            </div>


                        </div>
                        <div class="sns02">
                            <a id="">
                                <img class="google" src="../../assets/images/google.png">
                            </a>
                            <a id="">
                                <img class="facebook" src="../../assets/images/facebook.png">
                            </a>
                        </div>
                    </form>
                </div>
            </div><!-- login-box -->
            <div class="login-image-container">
                <img src="../../assets/images/banner02.png" alt="Image">
            </div>
            <div class="login-footer">
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
import "@/assets/css/potal/login.css"

const clientId = "dc1j0BkcYhtjZfREkzlH";

export default {
    name: "LoginView",
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
        },
        kakaoLogin() {
            window.Kakao.Auth.login({
                scope: "profile_image, account_email, name, phone_number",
                success: this.getKakaoAccount,
            });
        },
        getKakaoAccount() {
            window.Kakao.API.request({
                url: "/v2/user/me",
                success: (res) => {
                    const kakao_account = res.kakao_account;
                    const email = kakao_account.email;
                    const name = kakao_account.name;
                    const phone_number = kakao_account.phone_number;

                    alert("로그인 성공!");
                    console.log(kakao_account);
                    console.log(email);
                    console.log(name);
                    console.log(phone_number);
                },
                fail: (error) => {
                    console.log(error);
                },
            });
        },
    },
    mounted() {
        this.naverLogin = new window.naver_id_login(
            clientId,
            "http://localhost:8080/login"  // 개발자센터에서 등록한 Callback URL
        );
        var state = this.naverLogin.getUniqState();
        this.naverLogin.setButton("green", 2, 40); // 버튼설정
        this.naverLogin.setDomain("http://localhost:8080");
        this.naverLogin.setState(state);
        this.naverLogin.init_naver_id_login();
    },
};
</script>
