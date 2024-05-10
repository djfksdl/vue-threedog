<template>
    <div id="wrap">
        <AppHeader />
        <div id="login-container">
            <div class="login-box">
                <img class="con-logo" src="../../assets/images/logo.png" alt="Logo">
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
                        <div class="sns">
                            <router-link to="">
                                <img class="kakao" src="../../assets/images/kakao.png">
                            </router-link>
                            <router-link to="">
                                <img class="naver" src="../../assets/images/naver.png">
                            </router-link>
                        </div>
                        <div class="sns">
                            
                        </div>
                    </form>
                </div>
            </div><!-- login-box -->
        </div><!-- login-container -->
        <AppFooter />
    </div><!-- wrap -->
</template>

<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"

export default {
    name: "LoginView",
    components: {
        AppFooter,
        AppHeader
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

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

#login-container {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-box {
    margin: 70px 0 100px 0;
    width: 450px;
    padding: 60px;
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
    margin-bottom: 10px;
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
    color: #999; /* 회색 계열 */
}

.loginBtn  {
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

.manager-signup{
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

.sns {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.sns img {
    height: 40px;
    width: 140px;
}

.kakao,
.naver {
    width: 120px;
    margin: 0 5px;
}

.kakao {
    margin-right: 5px;
}

</style>
