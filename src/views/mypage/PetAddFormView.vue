<template>
    <!-- 모달창 -->
    <div class="petAddFormModal" v-show="modalVisible">
        <div class="modal-content">
            <!-- 모달 헤더 -->
            <div class="modal-header">
                <h3>경고창</h3>
            </div>
            <!-- 모달 내용 -->
            <div class="modal-body">
                <p>이미지 파일만 업로드할 수 있습니다.</p>
            </div>
            <!-- 모달 푸터 -->
            <div class="modal-footer">
                <button @click="closeModal">닫기</button>
            </div>
        </div>
    </div>
    <div id="wrap">
        <AppHeader />
        <div id="petAddForm">
            <SideBar />
            <div class="container">
                <h1>반려견등록</h1>
                <form v-on:submit.prevent="petInsert"> <!-- enctype="multipart/form-data" -->
                    <div class="petAddFormUnder">
                        <div class="filebox preview-image">
                            <img id="preview-image">
                            <label for="input-file">업로드</label>
                            <input type="file" id="input-file" class="upload-hidden" @change="handleFileUpload">
                        </div>



                        <div class="detailBox">

                            <!-- 펫이름 -->
                            <div class="detail">
                                <label>펫 이름</label>
                                <input type="text" placeholder="펫 이름을 입력해주세요." v-model="dogVo.dogName">
                            </div>

                            <!-- 사이즈선택 -->
                            <div class="detail">
                                <div class="size">
                                    <span>크기선택</span>
                                    <label for="small">소형견</label><input id="small" type="radio" name="size"
                                        value="small" v-model="dogVo.size">
                                    <label for="middle">중형견</label><input id="middle" type="radio" name="size"
                                        value="middle" v-model="dogVo.size">
                                    <label for="big">대형견</label><input id="big" type="radio" name="size" value="big"
                                        v-model="dogVo.size">
                                </div>
                            </div>

                            <!-- 품종 -->
                            <div class="detail">
                                <label>품종</label>
                                <input type="text" placeholder="품종을 입력해 주세요." value="kind" v-model="dogVo.kind">
                            </div>

                            <!-- 몸무게 -->
                            <div class="detail">
                                <label class="title">몸무게</label>
                                <input type="number" value="weight" v-model="dogVo.weight"> kg
                            </div>

                            <!-- 생일 -->
                            <div class="detail" id="petAge">
                                <label>생일</label>
                                <input type="date" value="birth" v-model="dogVo.birth">
                            </div>

                            <!-- 성별 -->
                            <div class="detail">
                                <label>성별</label>
                                <button type="button" @click="toggleDetail('gender', 'male', $event)">남아</button>
                                <button type="button" @click="toggleDetail('gender', 'female', $event)">여아</button>
                            </div>

                            <!-- 중성화유무 -->
                            <div class="detail">
                                <label>중성화</label>
                                <button type="button" @click="toggleDetail('neutering', 'true', $event)">O</button>
                                <button type="button" @click="toggleDetail('neutering', 'false', $event)">X</button>
                            </div>

                            <!-- 미용경험 -->
                            <div class="detail">
                                <label>미용경험</label>
                                <button type="button" @click="toggleDetail('experience', 'true', $event)">O</button>
                                <button type="button" @click="toggleDetail('experience', 'false', $event)">X</button>
                            </div>

                            <!-- 특이사항 -->
                            <div class="detail" id="feature">
                                <label>특이사항</label>
                                <button type="button" :class="{ 'selected': dogVo.skin }"
                                    @click="toggleFeature('skin')">피부병</button>
                                <button type="button" :class="{ 'selected': dogVo.heart }"
                                    @click="toggleFeature('heart')">심장질환</button>
                                <button type="button" :class="{ 'selected': dogVo.marking }"
                                    @click="toggleFeature('marking')">마킹</button>
                                <button type="button" :class="{ 'selected': dogVo.mounting }"
                                    @click="toggleFeature('mounting')">마운팅</button>

                                <div class="bite">
                                    <div class="biteRange">
                                        <label>입질정도</label>
                                        <div class="biteRange2">
                                            <input type="range" min="1" max="3" step="1" list="tickmarks"
                                                v-model="dogVo.bite">
                                            <datalist id="tickmarks">
                                                <option value="1"></option>
                                                <option value="2"></option>
                                                <option value="3"></option>
                                            </datalist>
                                        </div>
                                    </div>
                                    <div class="pbox">
                                        <p>하</p>
                                        <p>중</p>
                                        <p>상</p>
                                    </div>
                                </div>
                                <textarea placeholder="기타 특이사항을 적어주세요." v-model="dogVo.memo"></textarea>
                            </div>
                        </div>
                    </div>
                    <!-- 등록버튼 -->
                    <div>
                        <button class="insertBtn" type="submit">등록</button>
                    </div>
                </form>


            </div>
        </div>
        <TopButton />
        <AppFooter />
    </div><!-- wrap -->
</template>

<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
import TopButton from "@/components/TopButton.vue";
import SideBar from "@/components/SideBar.vue";

import "@/assets/css/mypage/mypage.css"

import axios from 'axios';

export default {
    name: "PetAddFormView",
    components: {
        TopButton,
        AppHeader,
        AppFooter,
        SideBar,
    },

    data() {
        return {
            modalVisible: false,     // 모달이 보이는지 여부를 저장하는 변수
            dogVo: {
                dogNo: 0,
                dogName: "",
                kind: "",
                weight: 0,
                birth: "",
                gender: null,
                neutering: null,
                experience: null,
                memo: "",
                dogImg: "",
                size: "",
                skin: false,
                heart: false,
                marking: false,
                mounting: false,
                bite: 0,
            },

        };
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            if (!file.type.match(/image\//)) {
                this.modalVisible = true;
                return;
            }

            reader.onload = () => {
                const imgSrc = reader.result;
                // 이미지 미리보기를 처리하는 로직을 이곳에 작성
                // 이미지를 화면에 표시하는 예제
                const imgElement = document.getElementById('preview-image'); // 이미지를 표시할 <img> 요소 선택
                imgElement.src = imgSrc; // 이미지 소스를 설정하여 이미지 표시
            };

            reader.readAsDataURL(file);
        },

        // 모달을 보여주는 메소드
        showModal() {
            this.modalVisible = true;
        },
        // 모달을 닫는 메소드
        closeModal() {
            this.modalVisible = false;
        },


        // 버튼클릭시 색상변경
        toggleDetail(type, value, event) {
            const buttons = event.target.parentElement.querySelectorAll('button');
            buttons.forEach(btn => {
                btn.classList.toggle('selected', btn === event.target);
            });
            this.dogVo[type] = (this.dogVo[type] === value) ? null : value;
        },

        // 특이사항 true/false
        toggleFeature(feature) {
            this.dogVo[feature] = !this.dogVo[feature];
        },


        // 반려견 등록
        petInsert() {
            console.log("반려견 등록");
            console.log(this.dogVo);
            console.log(this.dogVo.dogName);   
            axios({
                method: 'post', // put, post, delete 
                url: `${this.$store.state.apiBaseUrl}/api/mypage/doginsert`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                data: this.dogVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data.apiData);

            }).catch(error => {
                console.log(error);
            });

        }


    },
};
</script>




<style>
/* 버튼색 */
#petAddForm .selected {
    background-color: #236C3F !important;
    color: #ffffff !important;
}

/* 모달 콘텐츠 스타일 */
.petAddFormModal .modal-content {
    position: absolute;
    left: 40%;
    top: 30%;
    z-index: 999;
    width: 400px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: white;
    height: 150px;

}


/* 모달 헤더 스타일 */
.petAddFormModal .modal-header {
    background-color: #236C3F;
    color: white;
    width: 400px;
    text-align: center;
    padding: 8px 0 8px 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

}

.petAddFormModal .modal-body {
    padding: 10px 0 0 20px;
    font-size: 18px;
}

/* 모달 푸터 스타일 */
.petAddFormModal .modal-footer {
    padding: 2px 16px;
    /* background-color: #5cb85c; */
    color: white;
    margin-top: 30px;
}

.petAddFormModal .modal-footer button {
    float: right;
    padding: 5px;
    border: none;
    margin-bottom: 10px;
    width: 100px;
    border-radius: 10px;


}

.petAddFormModal .close:hover,
.petAddFormModal .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
</style>
