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

      <div id="map-main">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" style="width: 1370px; height: 400px; margin-left: 20px;">
          <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
        </KakaoMap>
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
    <TopButton />
    <AppFooter id="AppFooter" />
  </div><!-- wrap -->
</template>

<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
const coordinate = {
  lat: 37.498085,
  lng: 127.027978
};
</script>

<script>
import SlideView from '@/components/SlideView.vue';
import SlideViewBanner from '@/components/SlideViewBanner.vue';
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
import TopButton from "@/components/TopButton.vue"
import "@/assets/css/potal/main.css"

export default {
  name: "MainView",
  components: {
    AppFooter,
    AppHeader,
    SlideView,
    SlideViewBanner,
    TopButton
  },
  mounted() {
  },
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>