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
            <!-- 중간내용부분 -->
            <div class="eMidContainer">

                <!-- 미용사진 -->
                <div class="eCutImgContainer">
                    <h1>미용사진</h1>
                    <div class="eCutSlide">
                        <img src="@/assets/images/dog.jpg">
                        <img src="@/assets/images/dog.jpg">
                        <img src="@/assets/images/spy.jpg">
                        <img src="@/assets/images/dog.jpg">
                        <img src="@/assets/images/dog.jpg">
                        <img src="@/assets/images/dog.jpg">
                        <img src="@/assets/images/dog.jpg">
                    </div>
                </div>

                <!-- 디자이너 소개 -->
                <div class="eDesignerSlideContainer">
                    <h1>디자이너 소개</h1>
                    <div class="eDesignerContentsBox">
                        <!-- 디자이너소개 왼쪽 -->
                        <div class="eDLeftBox">
                            <h2>미용고문 이서현 원장</h2>
                            <p>- 2000년 애견미용 입문</p>
                            <p>- 전 애견미용 학원강사</p>
                            <p>- 2000년 애견미용 입문</p>
                            <p>- 2000년 애견미용 입문</p>
                            <p>- 2000년 애견미용 입문</p>
                            <p>- 2000년 애견미용 입문</p>
                        </div>
                        <!-- 디자이너소개 오른쪽 -->
                        <div class="edRightBox">
                            프로필 이미지
                        </div>
                    </div>
                </div>

                <!-- 가격 + 후기 -->
                <div class="ePriceReviewContainer">
                    <div class="ePriceBox">
                        <h1>가격</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        
                    </div>
                    <!-- 후기 -->
                    <div class="eReviewBox">
                        <h1>후기</h1>
                        
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
  