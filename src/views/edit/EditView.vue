<template>
    <div id="wrap">
        <ManagerHeader />
          <div class="container2">
            <!-- 타이틀 -->
            <div class="eTitle">
                <h1>타이틀</h1>
                <p>부제목이 들어갈 자리</p>
            </div>
            <!-- 이미지 슬라이드 -->
            <div class="eImgSlide">
                <img src="@/assets/images/main-slide.png">
            </div>
            <!-- 내용부분 -->
            <div>
                <!-- 미용사진 -->
                <div class="cutImgBox">
                    <h1>미용사진</h1>
                    <div class="cutSlide">
                        <img src="@/assets/images/dog.jpg">
                        <img src="@/assets/images/dog.jpg">
                        <img src="@/assets/images/dog.jpg">
                    </div>
                </div>
            </div>
          </div>
           
        <ManagerFooter />  
       </div><!-- wrap --> 

  </template>
  
  
  <script>
   import '@/assets/css/edit/edit.css'
   import ManagerFooter from "@/components/ManagerFooter.vue"
   import ManagerHeader from "@/components/ManagerHeader.vue"
  
   export default {
       name: "EditView",
       components: {
            ManagerFooter,
            ManagerHeader
       },
       data() {
           return {
  
           };
       },
       methods: {
  
       },
   };
  </script>
  