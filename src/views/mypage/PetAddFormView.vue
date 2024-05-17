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
                <form>
                    <div class="filebox preview-image">
                        <img id="preview-image">
                        <label for="input-file">업로드</label>
                        <input type="file" id="input-file" class="upload-hidden" @change="handleFileUpload">
                    </div>




                    <div class="detailBox">
                        <div class="detail">
                            <label>펫 이름</label>
                            <input type="text" placeholder="펫 이름을 입력해주세요.">
                        </div>
                        <div class="detail">
                            <div class="size">
                                <span>크기선택</span>
                                <label for="small">소형견</label><input id="small" type="radio" name="size" value="small">
                                <label for="middle">중형견</label><input id="middle" type="radio" name="size"
                                    value="middle">
                                <label for="big">대형견</label><input id="big" type="radio" name="size" value="big">
                            </div>
                        </div>
                        <div class="detail">
                            <label>품종</label>
                            <input type="text" placeholder="품종을 입력해 주세요.">
                        </div>
                        <div class="detail">
                            <label class="title">몸무게</label>
                            <input type="text"> kg
                        </div>
                        <div class="detail" id="petAge">
                            <label>생일</label>
                            <input type="date">

                        </div>
                        <div class="detail">
                            <label>성별</label>
                            <button type="button" @click="toggleDetail('gender', 'male', $event)">남아</button>
                            <button type="button" @click="toggleDetail('gender', 'female', $event)">여아</button>
                        </div>
                        <!-- {{ selectedOptions.gender }} -->
                        <div class="detail">
                            <label>중성화</label>
                            <button type="button" @click="toggleDetail('neutered', 'true', $event)">O</button>
                            <button type="button" @click="toggleDetail('neutered', 'false', $event)">X</button>
                        </div>
                        <!-- {{ selectedOptions.neutered }} -->
                        <div class="detail">
                            <label>미용경험</label>
                            <button type="button" @click="toggleDetail('grooming', 'true', $event)">O</button>
                            <button type="button" @click="toggleDetail('grooming', 'false', $event)">X</button>
                        </div>
                        <!-- {{ selectedOptions.grooming }} -->
                        <div class="detail" id="feature">
                            <label>특이사항</label>
                            <button type="button" :class="{ 'selected': selectedOptions.features.skin }"
                                @click="toggleFeature('skin')">피부병</button>
                            <button type="button" :class="{ 'selected': selectedOptions.features.heart }"
                                @click="toggleFeature('heart')">심장질환</button>
                            <button type="button" :class="{ 'selected': selectedOptions.features.marking }"
                                @click="toggleFeature('marking')">마킹</button>
                            <button type="button" :class="{ 'selected': selectedOptions.features.mounting }"
                                @click="toggleFeature('mounting')">마운팅</button>
                            <!-- {{ selectedOptions.features }} -->
                            <div class="bite">
                                <div class="biteRange">
                                    <label>입질정도</label>
                                    <div class="biteRange2">
                                        <input type="range" min="1" max="3" step="1" list="tickmarks" v-model="bite">
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

                                <!-- {{ bite }} -->

                            </div>
                            <textarea placeholder="기타 특이사항을 적어주세요."></textarea>
                        </div>
                    </div>
                </form>
                <div class="insertBtnBox">
                    <button class="insertBtn" type="">등록</button>
                </div>

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

            // 모달이 보이는지 여부를 저장하는 변수
            modalVisible: false,

            // 버튼
            selectedOptions: {
                gender: null,
                neutered: null,
                grooming: null,
                features: {
                    skin: false,
                    heart: false,
                    marking: false,
                    mounting: false
                }
            },
            // 입질정도
            bite: 0,
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
            const button = event.target;
            const buttons = button.parentElement.querySelectorAll('button');

            buttons.forEach(btn => {
                if (btn === button) {
                    btn.classList.toggle('selected', btn !== button || !btn.classList.contains('selected'));
                } else {
                    btn.classList.remove('selected');
                }
            });

            if (this.selectedOptions[type] == value) {
                this.selectedOptions[type] = null;
            } else {
                this.selectedOptions[type] = value;
            }
        },

        // 특이사항 true/false
        toggleFeature(feature) {
            this.selectedOptions.features[feature] = !this.selectedOptions.features[feature];
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

.petAddFormModal .modal-body{
    padding:10px 0 0 20px;
    font-size: 18px;
}

/* 모달 푸터 스타일 */
.petAddFormModal .modal-footer {
    padding: 2px 16px;
    /* background-color: #5cb85c; */
    color: white;
    margin-top: 30px;
}
.petAddFormModal .modal-footer button{
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
