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
                                <input type="file" id="numFile" name="numFile" style="display: none;" @change="handleFileChange">
                                <label for="numFile" class="btn00">첨부하기</label>
                            </div>
                        </div>
                        <div class="form-group-man">
                            <div class="input-container">
                                <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="전화번호">
                                <button type="button" @click="sendVerificationCode"
                                    class="small-btn green-btn">전송</button>
                            </div>
                        </div>
                        <div v-if="showVerificationInput" class="form-group-man">
                            <div class="input-container">
                                <input type="text" id="verificationCode" name="verificationCode" placeholder="인증번호 입력">
                                <button type="button" @click="verifyCode" class="small-btn green-btn"
                                    style="margin-left: 10px;">확인</button>
                            </div>
                        </div>
                        <div class="form-group-man">
                            <div class="input-container">
                                <input type="text" id="address" name="address" placeholder="주소">
                                <button type="button" @click="searchAddress" class="small-btn green-btn">검색</button>
                            </div>
                        </div>
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
            isPasswordValid: false // 사용 가능한 비밀번호 여부
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
        }
    }
};
</script>

<style>
#msignup-container {
    width: 100%;
    margin: 0 auto;
    text-align: left;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.msignup-box {
    margin: 70px 0 20px 0;
    width: 450px;
    padding: 60px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    flex-direction: column;
}

.msignup-form {
    margin-top: 20px;
    width: 100%;
}

.form-group-man {
    margin-bottom: 20px;
    width: 270px;
    position: relative;
}

.form-group-man:nth-child(2),
.form-group-man:nth-child(5) {
    margin-bottom: 10px;
}

.form-group-man input {
    width: calc(100% - 40px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: inline-block;
}

.input-container {
    display: flex;
    width: 320px;
    align-items: center;
}

.input-container input {
    flex: 1;
}

.small-btn {
    width: 80px;
    padding: 10px;
    border: none;
    background-color: #236C3F;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
}


.btn00{
    background-color: #4CAF50;
    width: 80px;
    padding: 10px;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    margin-left: 10px;
    text-align: center;
}

.green-btn {
    background-color: #4CAF50;
}

.signupBtn {
    width: 320px;
    padding: 15px;
    background-color: #236C3F;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 15px;
    margin-top: 30px;
}

.error-message {
    color: red;
    font-size: 12px;
}

.success-message {
    color: blue;
    font-size: 12px;
}
</style>