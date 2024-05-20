<template>
  <div id="wrap">
    <AppHeader />
    <div id="potal-main-container" class="clearfix">
      <div class="search-container">
        <div class="search-input-wrapper">
          <input type="text" class="search-input" placeholder="지역을 입력하세요" v-model="searchQuery">
          <i class="fas fa-map-marker-alt" @click="getCurrentLocation"></i>
        </div>
        <!-- 검색 버튼 -->
        <button class="search-button" @click="searchLocation">검색</button>
      </div>

      <div id="map-main">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true"
          style="width: 1370px; height: 400px; margin-left: 20px;">
          <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
        </KakaoMap>
      </div>

      <h2>{{ location }} 근처 가게 검색 결과 ▼・ᴥ・▼</h2>
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
    </div><!-- potal-main-container -->
    <TopButton />
    <AppFooter id="AppFooter" />
  </div><!-- wrap -->
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

const route = useRoute();

const coordinate = ref({
  lat: 37.498085,
  lng: 127.027978
});

const searchQuery = ref('');
const location = ref('');

const searchLocation = async () => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}`);
    if (response.data.length > 0) {
      const place = response.data[0];
      coordinate.value.lat = parseFloat(place.lat);
      coordinate.value.lng = parseFloat(place.lon);
      location.value = searchQuery.value;
    } else {
      alert('위치를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('Error fetching location:', error);
    alert('위치를 찾는 중 오류가 발생했습니다.');
  }
};

watch(
  () => route.query.location,
  (newLocation) => {
    if (newLocation) {
      searchQuery.value = newLocation;
      searchLocation();
    }
  },
  { immediate: true }
);

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
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import TopButton from "@/components/TopButton.vue";
import "@/assets/css/potal/main.css";

export default {
  name: "SearchMap",
  components: {
    AppFooter,
    AppHeader,
    TopButton
  },
};
</script>
