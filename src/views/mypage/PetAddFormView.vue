<template>
    <div id="wrap">
        <AppHeader />
        <div id="petAddForm">
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
                            <label>품종</label>
                            <input type="text" placeholder="품종을 입력해 주세요.">
                        </div>
                        <div class="detail">
                            <label class="title">몸무게</label>
                            <input type="text"> kg
                        </div>
                        <div class="detail" id="petAge">
                            <label>나이</label>
                            <input type="text"> 살

                        </div>
                        <div class="detail">
                            <label for="">성별</label>
                            <button type="button">남아</button>
                            <button type="button">여아</button>
                        </div>
                        <div class="detail">
                            <label>중성화</label>
                            <button type="button">O</button>
                            <button type="button">X</button>
                        </div>
                        <div class="detail">
                            <label>미용경험</label>
                            <button type="button">O</button>
                            <button type="button">X</button>
                        </div>
                        <div class="detail" id="feature">
                            <label>특이사항</label>
                            <button type="button">피부병</button>
                            <button type="button">심장질환</button>
                            <button type="button">마킹</button>
                            <button type="button">마운팅</button>
                            <div class="bite">
                                <div class="biteRange">
                                    <label>입질정도</label>
                                    <div class="biteRange2">
                                        <input type="range" min="1" max="3" step="1" list="tickmarks">
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
import "@/assets/css/mypage/mypage.css"

export default {
    name: "PetAddFormView",
    components: {
        TopButton,
        AppHeader,
        AppFooter
    },

    data() {
        return {
        };
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            if (!file.type.match(/image\//)) {
                alert("이미지 파일만 업로드할 수 있습니다.");
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
        }


    },
};
</script>

<style></style>
