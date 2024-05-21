<template>
  <div id="wrap">
    <AppHeader />
    <div class="potal-main-slide">
      <SlideView />
    </div><!-- potal-main-slide -->
    <div id="potal-main-container" class="clearfix">
      <div class="search-container" ref="searchContainer">
        <div class="search-input-wrapper">
          <input type="text" class="search-input" placeholder="지역을 입력하세요" v-model="searchQuery"
            @input="fetchSuggestions">
          <i class="fas fa-map-marker-alt" @click="getCurrentLocation"></i>
          <ul class="search_ul" v-if="suggestions.length">
            <!-- <li v-for="suggestion in suggestions" :key="suggestion" @click="setSearchQuery(suggestion)">{{ suggestion }} -->
            <li v-for="(suggestion, index) in suggestions" :key="index" @click="setSearchQuery(suggestion)">{{ suggestion }}</li>
          </ul>
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
      <h2 class="result-h2">동네 랭킹 Best <span class="view-count">가까운 순</span></h2>
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
      <h2 class="result-h2">인기짱강아지 Best<span class="view-count">조회수 높은 순</span></h2>
      <hr>
      <div class="rank">
        <div class="rank-item" v-bind:key="i" v-for="(reviewVo, i) in reviewList">
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
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
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
      },
      suggestions: []
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
        this.reviewList = response.data.apiData;
      }).catch(error => {
        console.log(error);
      });
    },
    async fetchSuggestions() {
      if (!this.searchQuery.trim()) {
        this.suggestions = []; // 빈 문자열인 경우 suggestions를 초기화합니다.
        return; // 빈 문자열일 경우 함수를 종료합니다.
      }

      // 검색어가 비어 있지 않으면 API를 호출하여 검색 자동완성을 가져옵니다.
      try {
        const response = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${this.searchQuery}`, {
          headers: {
            'Authorization': 'KakaoAK 71cf0304d0220da3bff50ab64c5dd1ea'
          }
        });
        const data = await response.json();
        this.suggestions = data.documents.map(doc => doc.place_name);
      } catch (error) {
        console.error('검색 자동완성을 가져오는 중 오류가 발생했습니다:', error);
      }
    },
    setSearchQuery(query) {
      this.searchQuery = query;
      this.suggestions = []; // 리스트 아이템 클릭시 자동완성 목록 숨기기
    },
    handleClickOutside(event) {
      if (!this.$refs.searchContainer.contains(event.target)) {
        this.suggestions = [];
      }
    },
  },
  created() {
    this.getList();
  }
};
</script>
