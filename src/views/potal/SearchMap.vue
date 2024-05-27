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

      <div id="map-search">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true"
          style="width: 1370px; height: 494pxpx; margin-left: 20px;">
          <!-- addList 배열에 있는 각 가게에 대해 반복하여 마커를 표시합니다 -->
          <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
          <KakaoMapMarker v-for="(store, index) in addList" :key="index" :lat="store.latitude" :lng="store.longitude">
          </KakaoMapMarker>
        </KakaoMap>
        <DatePicker02 @selectedDate="handleDateChange" @customAction="getList" />
      </div>

      <h2 class="result-h2">{{ location }} 근처 가게 검색 결과 ▼・ᴥ・▼<span class="view-count">가까운 순</span></h2>
      <hr>
      <div class="rank">
        <div class="rank-item" v-bind:key="i" v-for="(storeVo, i) in storeList">
          <img src="../../assets/images/dog2.jpg">
          <label>{{ storeVo.title }}</label>
        </div>
      </div>
    </div>
    <TopButton />
    <AppFooter id="AppFooter" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { KakaoMap, KakaoMapMarker, KakaoMapInfoWindow } from 'vue3-kakao-maps';
import DatePicker02 from '@/components/DatePicker02.vue';
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import TopButton from "@/components/TopButton.vue";
import "@/assets/css/potal/main.css";
import "@/assets/css/potal/searchmap.css";

const route = useRoute();
const store = useStore();
const storeList = reactive([]);
const coordinate = ref({
  lat: 37.5535,
  lng: 126.9715
});
const searchQuery = ref('');
const location = ref('');
const rsDate = ref(null);
const addList = ref([]);

const searchLocation = async () => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}`);
    if (response.data.length > 0) {
      const place = response.data[0];
      coordinate.value.lat = parseFloat(place.lat);
      coordinate.value.lng = parseFloat(place.lon);
      location.value = searchQuery.value;
      getList();
    } else {
      alert('위치를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('Error fetching location:', error);
    alert('위치를 찾는 중 오류가 발생했습니다.');
  }
};

const getList = () => {
  console.log("검색 리스트");

  const params = {
    lat: coordinate.value.lat,
    lng: coordinate.value.lng,
    rsDate: rsDate.value ?? ''
  };

  console.log(coordinate.value.lat);
  console.log(coordinate.value.lng);
  console.log(rsDate.value);

  axios({
    method: 'get',
    url: `${store.state.apiBaseUrl}/api/searchmap`,
    headers: { "Content-Type": "application/json" },
    params: params,
    responseType: 'json'
  }).then(response => {
    console.log("-----------------------");
    console.log(response.data.apiData);
    storeList.value = response.data.apiData;
  }).catch(error => {
    console.log(error);
  });
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
      coordinate.value.lat = lat;
      coordinate.value.lng = lng;
      getList();
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

const handleDateChange = (newDate) => {
  rsDate.value = newDate;
  getList();
};

const markList = () => {
  console.log("전체 가게 리스트");

  axios({
    method: 'get',
    url: `${store.state.apiBaseUrl}/api/marker`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    responseType: 'json'
  }).then(response => {
    console.log("=========================");
    console.log(response.data.apiData);
    addList.value = response.data.apiData;
  }).catch(error => {
    console.log(error);
  });
};

onMounted(() => {
  if (addList.value.length > 0) {
    openInfoWindow(addList.value[0]);
  }
  getList();
  markList();
});

const openInfoWindow = (store) => {
  const latLng = new window.kakao.maps.LatLng(store.latitude, store.longitude);

  const infoWindow = new KakaoMapInfoWindow({
    map: window.map,
    position: latLng,
    content: `<div class="info-window"><h3>${store.title}</h3></div>`
  });

  infoWindow.open();
};

</script>
