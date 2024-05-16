<template>
    <div id="wrap">
        <ManagerHeader />
        <div class="container">
            <!-- 폼 -->
            <div class="editformContainer">
                <!-- 타이틀 -->
                <h1>홈페이지 제작폼</h1>
                <!-- 등록내용 -->
                <div class="efInputBox">
                    <div>
                        <label>메인 타이틀:</label>
                        <input type="text">
                    </div>
                    <div>
                        <label>서브 타이틀:</label>
                        <input type="text">
                    </div>
                    <div>
                        <label>메인 슬라이드 사진 등록</label>
                        <div class="efSlidePhotoBox">
                            <div class="efSlideAddPhoto">+</div>
                        </div>
                    </div>
                    <div>
                        <label>미용사진 등록</label>
                        <div class="efPhotoBox">
                            <div class="efAddPhoto">+</div>
                        </div>
                    </div>
                    <div>
                        <label>디자이너 소개</label>
                        <div class="efDesignerBox">
                            <label>- 프로필 이미지 등록:</label>
                            <input type="file"><br>
                            <label>- 디자이너 소개:</label>
                            <input type="text">
                            <button>경력 추가 +</button>
                        </div>
                    </div>
                    <div>
                        <label>가격</label>
                        <div class="efPrice">
                            표에 입력할 예정
                        </div>
                    </div>
                    <div class="efTime">
                        <label>운영시간</label>
                        <div class="efTimeBox">
                            <label>- 평일:</label>
                            <input type="text">
                            <br>
                            <label>- 토요일:</label>
                            <input type="text">
                            <br>
                            <label>- 점심시간:</label>
                            <input type="text">
                            <br>
                            <label>- 공휴일/일요일:</label>
                            <input type="text">    
                        </div>
                    </div>
                    <div class="efInfo">
                        <label>가게 정보</label>
                        <div class="efInfoBox">
                            <label>- 주소:</label>
                            <input type="text">
                            <br>
                            <label>- 전화번호:</label>
                            <input type="text">
                        </div>
                    </div>
                    <button class="efBtn">등록</button>
                </div> 
            </div>

        </div>
        <TopButton />  
        <ManagerFooter /> 
    </div>
</template>
<script>
   import '@/assets/css/edit/editform.css'
   import ManagerFooter from "@/components/ManagerFooter.vue"
   import ManagerHeader from "@/components/ManagerHeader.vue"
   import TopButton from "@/components/TopButton.vue"
export default {
    name: "EditFormView2",
    components: {
        ManagerFooter,
        ManagerHeader,
        TopButton,
    },
    data() {
        return {};
    },
    methods: {},
    created(){}
};
</script>
<style></style>