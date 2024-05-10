<template>
  <div id="wrap">
    <AppHeader />
    <div class="potal-main-slide">
      <SlideView />
    </div><!-- potal-main-slide -->
    <div id="potal-main-container" class="clearfix">
      <div class="search-container">
        <div class="search-input-wrapper">
          <input type="text" class="search-input" placeholder="지역을 입력하세요">
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <!-- 검색 버튼 -->
        <button class="search-button">검색</button>
      </div>
      <div class="main-map">
        <img src="../../assets/images/eMap.png">
      </div>

      <h2>동네 랭킹 Best</h2>
      <hr>
      <div class="rank">
        <div class="rank-item">
          <img src="../../assets/images/spy.jpg">
          <label>스파이가게</label>
        </div>
        <div class="rank-item">
          <img src="../../assets/images/spy.jpg">
          <label>다른 가게 이름</label>
        </div>
        <div class="rank-item">
          <img src="../../assets/images/dog2.jpg">
          <label>하이미디어</label>
        </div>
        <div class="rank-item">
          <img src="../../assets/images/dog.jpg">
          <label>김마리마리</label>
        </div>
        <div class="rank-item">
          <img src="../../assets/images/dog.jpg">
          <label>김마리마리</label>
        </div>
      </div><!-- rank -->
      <div class="event-banner">
        <SlideViewBanner />
      </div>
      <h2>인기짱강아지 Best</h2>
      <hr>
      <div class="rank">
        <div class="rank-item">
          <img src="../../assets/images/spy.jpg">
          <label>스파이가게</label>
        </div>
        <div class="rank-item">
          <img src="../../assets/images/spy.jpg">
          <label>다른 가게 이름</label>
        </div>
        <div class="rank-item">
          <img src="../../assets/images/dog2.jpg">
          <label>하이미디어</label>
        </div>
        <div class="rank-item">
          <img src="../../assets/images/dog.jpg">
          <label>김마리마리</label>
        </div>
        <div class="rank-item">
          <img src="../../assets/images/dog.jpg">
          <label>김마리마리</label>
        </div>
        <div class="rank-item">
          <img src="../../assets/images/spy.jpg">
          <label>스파이가게</label>
        </div>
        <div class="rank-item">
          <img src="../../assets/images/spy.jpg">
          <label>다른 가게 이름</label>
        </div>
        <div class="rank-item">
          <img src="../../assets/images/dog2.jpg">
          <label>하이미디어</label>
        </div>
        <div class="rank-item">
          <img src="../../assets/images/dog.jpg">
          <label>김마리마리</label>
        </div>
        <div class="rank-item">
          <img src="../../assets/images/dog.jpg">
          <label>김마리마리</label>
        </div>
      </div><!-- rank -->
    </div><!-- potal-main-container -->
    <AppFooter />           
  </div><!-- wrap --> 
</template>

<script>
import SlideView from '@/components/SlideView.vue';
import SlideViewBanner from '@/components/SlideViewBanner.vue';
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"

export default {
   name: "MainView",
   components: {
       AppFooter,
       AppHeader,
       SlideView,
       SlideViewBanner
   },
   data() {
       return {

       };
   },
   methods: {

   },
};
</script>

<style>
.fa-map-marker-alt {
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
  font-size: 25px;
}

.search-input-wrapper {
  position: relative; /* 자식 요소의 위치를 상대적으로 설정 */
  width: 400px; /* 인풋 너비 지정 */
}

#potal-main-container {
  width: 1400px;
  margin: 0 auto;
  text-align: left;
}

#potal-main-container h2{
  margin-left: 20px;
  margin-top: 60px;
  margin-bottom: 10px;
}

#potal-main-container hr{
  margin-left: 20px;
}

.potal-main-slide, .main-slide {
  width: 100%;
  height: 600px;
}

.search-container {
  margin-left: 20px;
  margin-top: 40px;
  display: flex;
  align-items: left;
  justify-content: left;
}

.search-input {
  width: 100%; /* 인풋 너비 100%로 지정 */
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 15px;
  outline: none;
  font-size: 16px;
  padding-right: 40px; /* 오른쪽 패딩은 아이콘의 너비만큼 */
}

.search-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 15px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 16px;
}

.main-map {
  margin: 30px 20px 10px 20px;
}

.main-map img {
  width: 1360px;
  height: 400px;
}

.rank {
  display: flex;
  justify-content: flex-start;
  margin: 20px 0 20px 25px;
  width: 1400px;
  flex-wrap: wrap;

}

.rank-item {
  margin-right: 20px;
}

.rank-item img {
  width: 250px;
  height: 250px;
  margin-right: 10px;
  object-fit: cover; /* 정사각형으로 자르기 */
}

.rank-item label {
  display: block;
  text-align: center;
  font-weight: bold; /* 글씨를 굵게 설정 */
  margin-top: 5px;
}

.event-banner{
  width: 1370px;
  height: 350px;
  margin: 80px 0 40px 25px;
  background-color: #4CAF50;
}

.AppFooter {
  margin-top: 40px;
}
</style>
