<template>
  <div id="wrap">
    <AppHeader />
    <div class="potal-main-slide">
      <SlideView />
    </div>
    <div id="potal-main-container" class="clearfix">
      <div class="search-container" ref="searchContainer">
        <div class="search-input-wrapper">
          <input type="text" class="search-input" placeholder="지역을 입력하세요" v-model="searchQuery"
            @input="fetchSuggestions">
          <i class="fas fa-map-marker-alt" @click="getCurrentLocation"></i>
          <ul class="search_ul" v-if="suggestions.length">
            <li v-for="(suggestion, index) in suggestions" :key="index" @click="setSearchQuery(suggestion)">
              {{ suggestion }}
            </li>
          </ul>
        </div>
        <router-link to="/searchmap">
          <button class="search-button" @click="searchLocation">검색</button>
        </router-link>
      </div>

      <div id="map-main">

      </div>

      <h2 class="result-h2">동네 랭킹 Best 👍<a class="view-count" href="/searchmap">더보기</a></h2>
      <hr>
      <div class="rank">
        <div class="rank-item" @mouseenter="hoverReview(i)" @mouseleave="leaveReview(i)" v-bind:key="i"
          v-for="(storeVo, i) in storeList">
          <router-link :to="`/edit/${storeVo.bNo}`">
            <img v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${storeVo.logo}`">
            <div class="hover-overlay-store" style="width: 200px;">
              <button>홈페이지 가기</button>
            </div>
            <label>{{ storeVo.title }}</label>
          </router-link>
        </div>
      </div>

      <div class="event-banner">
        <SlideViewBanner />
      </div>
      <h2 class="result-h2">인기짱강아지 Best 👍<span class="view-count">조회수 높은 순</span></h2>
      <hr>
      <div class="rank">
        <div class="rank-item" @mouseenter="hoverReview(i)" @mouseleave="leaveReview(i)" v-bind:key="i"
          v-for="(reviewVo, i) in reviewList">
          <div @click="openModal(reviewVo.rNo)">
            <img v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${reviewVo.saveName}`">
            <div class="hover-overlay-store">
              <button>후기 보기</button>
            </div>
            <label>{{ reviewVo.title }}</label>
          </div>
        </div>
      </div>
      <div class="modal-wrap-search" v-show="modalCheck">
        <div class="modal-container-search">
          <div class="reviewBoardDetailContainer-search">
            <!-- Display review details in the modal -->
            <div class="reviewDetailImg-search">
              <div class="modal-btn-search-close">
                <button class="close-x" @click="modalCheck = false">x</button>
              </div>
              <Swiper :slides-per-view="1" style="width: 350px;">
                <SwiperSlide v-for="(reviewVo, i) in reviewList2" :key="i">
                  <div class="reviewDetailImg">
                    <img :src="`${this.$store.state.apiBaseUrl}/upload/${reviewVo.saveName}`"
                      style="width: 350px; height: 450px;">
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div class="modal-content" style="padding-left: 50px;">
              <div class="userId"><strong>{{ reviewVo2.uId }}</strong>님</div>
              <div style="display: flex;">
                <div class="cutInfor"><strong>{{ reviewVo2.dogName }}</strong> ({{ reviewVo2.weight }}kg) &nbsp; </div>
                <div class="date">{{ formatDate(reviewVo2.rDate) }}</div>
              </div>
              <br>
              <div style="display: flex;">
                <div class="price"><strong>{{ reviewVo2.expectedPrice.toLocaleString() }}</strong>원&nbsp;</div>
                <div class="star" style="margin-top: 3px;">
                  <!-- Full stars -->
                  <span v-for="i in Math.floor(reviewVo2.star)" :key="i"><img src="@/assets/images/star_yellow.jpg"
                      style="width: 15px;"></span>
                  <!-- Empty stars -->
                  <span v-for="i in 5 - Math.ceil(reviewVo2.star)" :key="'empty_' + i"><img
                      src="@/assets/images/star_gray.jpg" style="width: 15px;"></span>
                </div>
              </div>
              <br>
              <div class="modal-context">{{ reviewVo2.rContent }}</div>
            </div>
          </div>
          <div class="modal-btn-search">
            <router-link :to="`/edit/${reviewVo2.bNo}`">
              <button style="width: 200px; margin-right: 10px;">매장 홈페이지 가기</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <TopButton />
    <AppFooter id="AppFooter" />
  </div>
</template>


<script>
import axios from 'axios';
import { mapState } from 'vuex';
import SlideView from '@/components/SlideView.vue';
import SlideViewBanner from '@/components/SlideViewBanner.vue';
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
import TopButton from "@/components/TopButton.vue"
import "@/assets/css/potal/main.css"
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  name: "MainView",
  components: {
    AppFooter,
    AppHeader,
    SlideView,
    SlideViewBanner,
    TopButton,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      coordinate: {
        lat: 37.5535,
        lng: 126.9715
      },
      storeList: [],
      addList: [],
      map: null,
      overlays: [],
      searchQuery: "",
      reviewList: [],
      reviewVo: {
        rNo: '',
        star: '',
        title: '',
        saveName: '',
        bNo: ''
      },
      suggestions: [],
      storeVo: {
        bNo: '',
        title: '',
        logo: '',
      },
      modalCheck: false,
      reviewVo2: {
        rNo: 0,
        star: 0,
        rContent: "",
        rDate: "",
        expectedPrice: 0,
        uId: "",
        dogName: "",
        weight: 0,
        saveName: "",
      },
      reviewList2: [],
      hoveredIndex: null,
    };
  },
  computed: {
    ...mapState(['apiBaseUrl'])
  },
  methods: {
    // getCurrentLocation() {
    //   if (navigator.geolocation) {
    //     navigator.permissions.query({ name: 'geolocation' })
    //       .then(permissionStatus => {
    //         if (permissionStatus.state === 'granted') {
    //           navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //               const lat = position.coords.latitude;
    //               const lng = position.coords.longitude;

    //               this.coordinate.lat = lat;
    //               this.coordinate.lng = lng;

    //               this.createMap(); // 현재 위치로 지도 이동
    //             },
    //             (error) => {
    //               this.handleLocationError(error);
    //             }
    //           );
    //         } else if (permissionStatus.state === 'prompt') {
    //           navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //               const lat = position.coords.latitude;
    //               const lng = position.coords.longitude;

    //               this.coordinate.lat = lat;
    //               this.coordinate.lng = lng;

    //               this.createMap(); // 현재 위치로 지도 이동
    //             },
    //             (error) => {
    //               this.handleLocationError(error);
    //             }
    //           );
    //         } else if (permissionStatus.state === 'denied') {
    //           alert("위치 권한이 거부되었습니다. 사용자 위치를 확인할 수 없습니다.");
    //         }
    //       })
    //       .catch(error => {
    //         console.error('Error getting geolocation permission:', error);
    //       });
    //   } else {
    //     alert('Geolocation is not supported by this browser.');
    //   }
    // },
    handleLocationError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("사용자가 Geolocation 요청을 거부했습니다.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("위치 정보를 사용할 수 없습니다.");
          break;
        case error.TIMEOUT:
          alert("위치 정보를 가져오는 요청이 시간 초과되었습니다.");
          break;
        case error.UNKNOWN_ERROR:
          alert("알 수 없는 오류가 발생했습니다.");
          break;
      }
    },
    mainList() {
      const params = {
        lat: this.coordinate.lat,
        lng: this.coordinate.lng,
      };

      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/mainlist`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: params,
        responseType: 'json'
      }).then(response => {
        this.storeList = response.data.apiData;
      }).catch(error => {
        console.log(error);
      });
    },
    markList() {
      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/marker`,
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
        this.map = new window.kakao.maps.Map(document.querySelector("#map-main"), {
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
                <div class="close" onclick="window.closeOverlay()" title="닫기"></div>
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
        this.suggestions = [];
        return;
      }

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
      this.suggestions = [];
    },
    handleClickOutside(event) {
      if (!this.$refs.searchContainer.contains(event.target)) {
        this.suggestions = [];
      }
    },
    openModal(rNo) {
      if (rNo) {
        this.getOneRList(rNo);
        this.modalCheck = true;
      }
    },
    getOneRList(rNo) {
      console.log("후기 1개 가져오기");
      console.log("리뷰", rNo, "선택함");
      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/mypage/getonerlist`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: { rNo: rNo },
        responseType: 'json'
      }).then(response => {
        this.getSaveName(rNo);
        console.log(response.data.apiData);
        this.reviewVo2 = response.data.apiData;
      }).catch(error => {
        console.log(error);
      });
    },
    reviewDetail(rNo) {
      if (rNo) {
        this.reviewVo = this.reviewList.find((review) => review.rNo === rNo);
        this.modalCheck = true;
      }
    },
    updateViewCount(rNo) {
      console.log("조회수 1증가!!!");
      console.log(rNo);
      axios({
        method: 'post',
        url: `${this.$store.state.apiBaseUrl}/api/mypage/updateview`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: { rNo: rNo },
        responseType: 'json'
      }).then(response => {
        console.log("성공");
        this.reviewVo.views = response.data.apiData;
        this.getRList();
      }).catch(error => {
        console.log(error);
      });
    },
    getSaveName(rNo) {
      console.log("후기사진 가져오기...............귀찮아...............");
      console.log(rNo);
      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/mypage/getsavename`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: { rNo: rNo },
        responseType: 'json'
      }).then(response => {
        console.log("후기사진가져오기성공");
        this.reviewList2 = response.data.apiData;
      }).catch(error => {
        console.log(error);
      });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
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
    this.mainList();
    this.markList();
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  created() {
    this.getList();
  }
};
</script>