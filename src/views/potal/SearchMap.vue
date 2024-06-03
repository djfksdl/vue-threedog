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

      <div class="map-cal">
        <div id="map-search">
          <!-- <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true"
            style="width: 1300px; height: 494px; margin-left: 20px;">
            <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
            <KakaoMapMarker v-for="(store, index) in addList" :key="index" :lat="store.latitude" :lng="store.longitude" @click="openInfoWindow(store)">
            </KakaoMapMarker>
          </KakaoMap> -->
        </div>
        <DatePicker02 @selectedDate="handleDateChange" @customAction="getList" />
      </div>

      <h2 class="result-h2">{{ location }} 근처 가게 검색 결과 ▼・ᴥ・▼<span class="view-count">가까운 순</span></h2>
      <hr>
      <div class="rank">
        <div class="rank-item" v-bind:key="i" v-for="(storeVo, i) in storeList">
          <router-link :to="`/${storeVo.bNo}`">
            <img src="../../assets/images/dog2.jpg">
            <label>{{ storeVo.title }}</label>
          </router-link>
        </div>
      </div>
    </div>
    <TopButton />
    <AppFooter id="AppFooter" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import DatePicker02 from '@/components/DatePicker02.vue';
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import TopButton from "@/components/TopButton.vue";
import "@/assets/css/potal/main.css";
import "@/assets/css/potal/searchmap.css";

const route = useRoute();
const store = useStore();
const storeList = ref([]);
const coordinate = ref({
  lat: 37.5535,
  lng: 126.9715
});
const searchQuery = ref('');
const location = ref('');
const rsDate = ref(null);
const addList = ref([]);
const map = ref(null);
const overlays = ref([]);


window.closeOverlay = () => {
  overlays.value.forEach(o => o.overlay.setMap(null));
};


// 사용자가 입력한 위치를 검색하여 지도에 표시하는 함수
const searchLocation = async () => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}`);
    if (response.data.length > 0) {
      const place = response.data[0];
      coordinate.value.lat = parseFloat(place.lat);
      coordinate.value.lng = parseFloat(place.lon);
      location.value = searchQuery.value;
      createMap();
    } else {
      alert('위치를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('Error fetching location:', error);
    alert('위치를 찾는 중 오류가 발생했습니다.');
  }
};

// 현재 지도 위치에 따른 가게 리스트를 가져오는 함수
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
    createMap();
  }).catch(error => {
    console.log(error);
  });
};

// route.query.location 값이 변경되면 실행되는 watch 함수
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

// 사용자의 현재 위치를 가져오는 함수
const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      coordinate.value.lat = lat;
      coordinate.value.lng = lng;
      createMap();
    }, (error) => {
      handleLocationError(error);
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
};

// 위치 정보 가져오기 오류 처리 함수
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

// 예약 날짜 변경 시 실행되는 함수
const handleDateChange = (newDate) => {
  rsDate.value = newDate;
  getList();
};

// 서버에서 가져온 가게 리스트를 지도에 마커로 표시하는 함수
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
    createMap(); // 마커를 지도에 추가하는 함수를 여기서 호출합니다.
  }).catch(error => {
    console.log(error);
  });
};

// 지도를 생성하고 가게 마커를 추가하는 함수
const createMap = () => {
  if (!window.kakao) {
    console.error("Kakao map library not loaded.");
    return;
  }

  if (!map.value) {
    map.value = new window.kakao.maps.Map(document.querySelector("#map-search"), {
      center: new window.kakao.maps.LatLng(coordinate.value.lat, coordinate.value.lng),
      level: 3
    });
  } else {
    const newCenter = new window.kakao.maps.LatLng(coordinate.value.lat, coordinate.value.lng);
    map.value.setCenter(newCenter);
  }

  addList.value.forEach(store => {
    const markerPosition = new window.kakao.maps.LatLng(store.latitude, store.longitude);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition
    });

    marker.setMap(map.value);

    const content = `
      <div class="map-wrap">
        <div class="info">
          <div class="title">${store.title}
            <div class="close" onclick="closeOverlay()" title="닫기"></div>
          </div>
          <div class="body">
            <div class="img">
              <img src="${store.logo}" width="73" height="70">
            </div>
            <div class="desc">
              <div class="ellipsis">${store.bAddress}</div>
              <div class="jibun ellipsis">${store.bdAddress}</div>
              <div><a href="" target="_blank" class="link">홈페이지</a></div>
            </div>
          </div>
        </div>
      </div>`;
    //로고 이미지가 없어서 콘솔에 오류가 뜸

    const overlay = new window.kakao.maps.CustomOverlay({
      content: content,
      map: null,
      position: marker.getPosition()
    });

    overlays.value.push({ id: store.id, overlay });

    window.kakao.maps.event.addListener(marker, 'click', () => {
      overlays.value.forEach(o => o.overlay.setMap(null));
      overlay.setMap(map.value);
    });


  });
};

// 컴포넌트가 마운트될 때 실행되는 함수
onMounted(() => {
  getList();
  markList();
});

</script>
