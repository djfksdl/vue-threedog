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
        <div id="map-search"></div>
        <DatePicker02 @selectedDate="handleDateChange" @customAction="getList" />
      </div>

      <h2 class="result-h2">
        <template v-if="location">
          {{ location }} 근처 가게<span class="view-count">가까운 순</span>
        </template>
        <template v-else>
          근처 가게 검색 결과 ▼・ᴥ・▼<span class="view-count">가까운 순</span>
        </template>
      </h2>

      <hr>
      <div class="rank">
        <template v-if="storeList.length > 0">
          <div class="rank-item" v-bind:key="i" v-for="(storeVo, i) in storeList" @mouseenter="hoverReview(i)"
            @mouseleave="leaveReview(i)">
            <router-link :to="`/edit/${storeVo.bNo}`">
              <img v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${storeVo.logo}`">
              <div class="hover-overlay-store" style="width: 200px;">
                <button>홈페이지 가기</button>
              </div>
              <label>{{ storeVo.title }}</label>
            </router-link>
          </div>
        </template>
        <template v-else>
          <div class="no-results">예약 가능한 가게가 없습니다.</div>
        </template>
      </div>
    </div>
    <TopButton />
    <AppFooter id="AppFooter" />
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import DatePicker02 from '@/components/DatePicker02.vue';
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import TopButton from "@/components/TopButton.vue";
import "@/assets/css/potal/main.css";
import "@/assets/css/potal/searchmap.css";

export default {
  name: "MainView",
  components: {
    AppFooter,
    AppHeader,
    TopButton,
    DatePicker02
  },
  data() {
    return {
      storeList: [],
      coordinate: {
        lat: 37.5535,
        lng: 126.9715
      },
      searchQuery: '',
      location: '',
      rsDate: null,
      addList: [],
      map: null,
      overlays: []
    };
  },
  computed: {
    ...mapState(['apiBaseUrl'])
  },
  methods: {
    searchLocation() {
      axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${this.searchQuery}`)
        .then(response => {
          if (response.data.length > 0) {
            const place = response.data[0];
            this.coordinate.lat = parseFloat(place.lat);
            this.coordinate.lng = parseFloat(place.lon);
            this.location = this.searchQuery;
            this.createMap();
            this.getList();
          } else {
            alert('위치를 찾을 수 없습니다.');
          }
        })
        .catch(error => {
          console.error('Error fetching location:', error);
          alert('위치를 찾는 중 오류가 발생했습니다.');
        });
    },
    mainList() {
      const params = {
        lat: this.coordinate.lat,
        lng: this.coordinate.lng,
      };

      axios({
        method: 'get',
        url: `${this.apiBaseUrl}/api/mainlist`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: params,
        responseType: 'json'
      }).then(response => {
        this.storeList = response.data.apiData;
      }).catch(error => {
        console.log(error);
      });
    },
    getList(){
      console.log("검색 리스트");

      const params = {
        lat: this.coordinate.lat,
        lng: this.coordinate.lng,
        rsDate: this.rsDate ?? ''
      };

      axios({
        method: 'get',
        url: `${this.apiBaseUrl}/api/searchmap`,
        headers: { "Content-Type": "application/json" },
        params: params,
        responseType: 'json'
      }).then(response => {
        console.log("-----------------------");
        console.log(response.data.apiData);
        this.storeList= response.data.apiData;
        this.createMap();
      }).catch(error => {
        console.log(error);
      });
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.coordinate.lat = lat;
          this.coordinate.lng = lng;
          this.createMap();
          this.getList();
        }, (error) => {
          this.handleLocationError(error);
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    },
    handleLocationError(error) {
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
    },
    handleDateChange(newDate) {
      this.rsDate = newDate;
      this.getList();
    },
    markList() {
      axios({
        method: 'get',
        url: `${this.apiBaseUrl}/api/marker`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        responseType: 'json'
      }).then(response => {
        this.addList = response.data.apiData;
        this.createMap();
      }).catch(error => {
        console.log(error);
      });
    },
    createMap() {
      if (!window.kakao) {
        console.error("Kakao map library not loaded.");
        return;
      }

      if (!this.map) {
        this.map = new window.kakao.maps.Map(document.querySelector("#map-search"), {
          center: new window.kakao.maps.LatLng(this.coordinate.lat, this.coordinate.lng),
          level: 3
        });
      } else {
        const newCenter = new window.kakao.maps.LatLng(this.coordinate.lat, this.coordinate.lng);
        this.map.setCenter(newCenter);
      }

      this.addList.forEach(store => {
        const markerPosition = new window.kakao.maps.LatLng(store.latitude, store.longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });

        marker.setMap(this.map);

        const content = `
          <div class="map-wrap">
            <div class="info">
              <div class="title">${store.title}
                <div class="close" onclick="closeOverlay()" title="닫기"></div>
              </div>
              <div class="body">
                <div class="img">
                  <img src="${this.apiBaseUrl}/upload/${store.logo}" width="73" height="70">
                </div>
                <div class="desc">
                  <div class="ellipsis">${store.bAddress}</div>
                  <div class="jibun ellipsis">${store.bdAddress}</div>
                  <div><a href="" target="_blank" class="link">홈페이지</a></div>
                </div>
              </div>
            </div>
          </div>`;

        const overlay = new window.kakao.maps.CustomOverlay({
          content: content,
          map: null,
          position: marker.getPosition()
        });

        this.overlays.push({ id: store.bNo, overlay: overlay });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          this.overlays.forEach(o => o.overlay.setMap(null));
          overlay.setMap(this.map);
        });
      });
    },
    hoverReview(index) {
      this.hoveredIndex = index;
    },
    leaveReview() {
      this.hoveredIndex = null;
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    this.markList();
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  created() {
    this.mainList();
  }
};
</script>
