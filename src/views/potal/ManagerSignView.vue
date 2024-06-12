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

                        <!-- <div id="google_recaptha">
                            <div class="g-recaptcha" data-sitekey="6LfZqNspAAAAAAze3c3G_KHi67Z2gKiF0WM58CG4"></div>
                        </div> -->

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

<script setup>
import "@/assets/css/potal/msignup.css"
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';

// State variables
let id = ref('');
let password = ref('');
let confirmPassword = ref('');
let businessNumber = ref('');
let bPhone = ref('');
let zonecode = ref('');
let roadAddress = ref('');
let detailAddress = ref('');
let showModal = ref(false);
let showModal02 = ref(false);
let isDuplicate = ref(null);
let isPasswordMatch = ref(true);
let isPasswordValid = ref(false);
let businessCheckMessage = ref('');
let businessCheckClass = ref('');
let latitude = ref(0);
let longitude = ref(0);

// Store and router instances
const store = useStore();
const router = useRouter();

const handleSubmit = async () => {
    console.log("회원가입");

    if (isDuplicate.value === true || isDuplicate.value === null) {
        showModal.value = true;
    } else {
        if (businessCheckClass.value === "success-message") {
            const formData = new FormData();
            formData.append("bId", id.value);
            formData.append("bPw", password.value);
            formData.append("bNum", businessNumber.value);
            formData.append("bZipCode", zonecode.value);
            formData.append("bAddress", roadAddress.value);
            formData.append("bdAddress", detailAddress.value);
            formData.append("bPhone", bPhone.value);
            formData.append("latitude", latitude.value); // 위도 추가
            formData.append("longitude", longitude.value); // 경도 추가

            console.log("=======================");
            console.log(longitude.value);

            try {
                const response = await axios.post(`${store.state.apiBaseUrl}/api/msignup`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log(response.data);
                // 회원가입 성공 후 어떤 작업을 수행할지 여기에 작성
                router.push('/mlogin');
            } catch (error) {
                console.error(error);
            }
        } else {
            showModal02.value = true;
        }
    }
};

const openPostcode = () => {
    new window.daum.Postcode({
        oncomplete: (data) => {
            zonecode.value = data.zonecode;
            roadAddress.value = data.roadAddress;

            // Call geocoding API to get latitude and longitude
            getLatLng(data.roadAddress);
        },
    }).open();
};

const getLatLng = async (address) => {
    const apiKey = 'AIzaSyATg5pwEAERPpd2GkNHQrtLvK1pKYZlDEk';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            latitude.value = location.lat;
            longitude.value = location.lng;
            console.log(`Latitude: ${latitude.value}, Longitude: ${longitude.value}`);
        } else {
            console.error('Geocoding API error: ', response.data.status);
        }
    } catch (error) {
        console.error('Error fetching geocoding data: ', error);
    }
};

const checkDuplicate = () => {
    axios.get(`${store.state.apiBaseUrl}/api/msignup/id`, {
        params: { id: id.value }
    })
        .then(response => {
            console.log(response.data);
            isDuplicate.value = response.data.apiData === 1;
        })
        .catch(error => {
            console.error(error);
        });
};

const checkPasswordMatch = () => {
    isPasswordMatch.value = password.value === confirmPassword.value;
    isPasswordValid.value = isPasswordMatch.value;
};

const checkBusinessNumber = () => {
    const data = { b_no: [businessNumber.value] };
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
                    businessCheckMessage.value = "사업자등록번호 확인";
                    businessCheckClass.value = "success-message";
                } else {
                    businessCheckMessage.value = "사업자등록번호 확인 불가능";
                    businessCheckClass.value = "error-message";
                    showModal02.value = true;
                }
            } else {
                businessCheckMessage.value = "올바른 번호를 입력해 주세요.";
                businessCheckClass.value = "error-message";
                showModal02.value = true;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            businessCheckMessage.value = "올바른 번호를 입력해 주세요.";
            businessCheckClass.value = "error-message";
            showModal02.value = true;
        });
};

const closeDuplicateModal = () => {
    showModal.value = false;
    showModal02.value = false;
};
</script>

<script>
export default {
    name: "ManagerSignView",
    components: {
    },
    data() {
        return {
        };
    },
    methods: {
    },
    mounted() {
        // const script = document.createElement('script');
        // script.src = 'https://www.google.com/recaptcha/api.js';
        // script.async = true;
        // document.getElementById('google_recaptha').appendChild(script);
    }
};
</script>