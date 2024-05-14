<template>
    <div id="wrap">
        <ManagerHeader />
        <div class="container">
            <!-- 폼 -->
            <div>
                <h2>홈페이지 제작폼</h2>
                <!-- 등록내용 -->
                <div>
                    <div>
                        <label>메인타이틀:</label>
                        <input type="text">
                    </div>
                    <div>
                        <label>서브타이틀:</label>
                        <input type="text">
                    </div>
                    <div>
                        <label>메인 이미지 슬라이드 등록:</label>
                        <input type="file">
                    </div>
                    <div>
                        <label>미용사진 등록:</label>
                        <input type="file">
                    </div>
                    <div>
                        <label>디자이너 소개:</label>
                        <input type="file">
                        <input type="text">
                    </div>
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
    name: "EditFormView",
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