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
                            <a id="">
                                <img class="naver" src="../../assets/images/naver.png">
                            </a>
                            
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
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

#login-container {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login-box {
    margin: 70px 0 20px 0;
    width: 450px;
    padding: 40px 60px 30px 60px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    flex-direction: column;
}

.con-logo {
    /* width: 300px; */
    height: 90px;
    object-fit: contain;
    margin-bottom: 20px;
}

.login-form {
    margin-top: 20px;
    width: 100%;
}

.form-group-login {
    margin-bottom: 5px;
    width: 100%;
    text-align: center;
    position: relative;

}

.form-group-login input {
    width: calc(100% - 40px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: inline-block;
}

.password-input input {
    width: 100%;
    padding-right: 30px;
}

.toggle-password {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}


.toggle-password i {
    color: #999;
    /* 회색 계열 */
}

.loginBtn {
    width: calc(100% - 40px);
    padding: 10px;
    background-color: #236C3F;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 7px;
    margin-top: 15px;
}

.signup-link {
    font-size: 14px;
    color: #666;
}

.manager-signup {
    color: #236C3F;
    font-weight: bold;
}

.signinBtn {
    width: calc(100% - 40px);
    padding: 10px;
    background-color: white;
    color: #236C3F;
    border: 1px solid #236C3F;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 7px;
}

.sns01 {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.sns02 {
    display: flex;
    justify-content: center;
    object-fit: contain;
}

.sns01 img, .sns02 img {
    height: 40px;
    width: 140px;
    border-radius: 5px;
}

.kakao,
.naver,
.google {
    cursor: pointer;
}

.google{
    border: 1px solid;
    border-color: #999;
    margin-right: 10px;
}
.kakao {
    margin-right: 10px;
}

.login-image-container {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 이미지 스타일 */
.login-image-container img {
    width: 100%;
    max-width: 450px;
    height: 100px;
}

.login-footer-ul {
    list-style: none;
    padding: 0;
    margin: 20px 0 10px 0;
    font-size: 14px;
}

.login-footer-ul li {
    display: inline;
    margin-right: 10px;
    color: #666;
}

.login-footer-ul li::after {
    content: "|";
    margin-left: 10px;
}

.login-footer p {
    font-size: 14px;
    color: #666;
}
</style>