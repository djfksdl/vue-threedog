<template>
  <div id="wrap">
    <AppHeader />
    <div class="potal-main-slide">
      <SlideView />
    </div><!-- potal-main-slide -->
    <div id="potal-main-container" class="clearfix">
      <div class="search-container">
        <div class="search-input-wrapper">
          <input type="text" class="search-input" placeholder="지역을 입력하세요" v-model="searchQuery">
          <i class="fas fa-map-marker-alt" @click="getCurrentLocation"></i>
        </div>
        <!-- 검색 버튼 -->
        <router-link to="/searchmap">
          <button class="search-button" @click="searchLocation">검색</button>
        </router-link>

      </div>

      <div id="map-main">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true"
          style="width: 1370px; height: 400px; margin-left: 20px;">
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
        <div  class="rank-item" v-bind:key="i" v-for="(reviewVo, i) in reviewList">
              <!-- <img  v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${reviewVo.saveName}`"
               alt="Review Image"> -->
               <img src="../../assets/images/dog.jpg">
              <label>{{ reviewVo.title }}</label>
            </div>
      </div><!-- rank -->
    </div><!-- potal-main-container -->
    <TopButton />
    <AppFooter id="AppFooter" />
  </div><!-- wrap -->
</template>

<script setup>
import { ref } from 'vue';
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

const coordinate = ref({
  lat: 37.5535,
  lng: 126.9715
});

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // 좌표 업데이트
      coordinate.value.lat = lat;
      coordinate.value.lng = lng;
    }, (error) => {
      handleLocationError(error);
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
};

const handleLocationError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
};
</script>

<script>
import SlideView from '@/components/SlideView.vue';
import SlideViewBanner from '@/components/SlideViewBanner.vue';
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
import TopButton from "@/components/TopButton.vue"
import "@/assets/css/potal/main.css"
import axios from 'axios';

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
      searchQuery: "",
      reviewList: [],
      reviewVo: {
        rNo: '',
        star: '',
        title: '',
        saveName: '',
        bNo: ''
      }
    };
  },
  methods: {
    searchLocation() {
      if (!this.searchQuery) {
        alert('지역을 입력하세요.');
        return;
      }
      this.$router.push({ path: '/searchmap', query: { location: this.searchQuery } });
    },
    getList() {
      console.log("데이터 가져오기");
      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/searchlist`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        responseType: 'json'
      }).then(response => {
        console.log(response.data.apiData);
        this.reviewList  = response.data.apiData;
      }).catch(error => {
        console.log(error);
      });
    },
  },
  created() {
    this.getList();
  }
};
</script>