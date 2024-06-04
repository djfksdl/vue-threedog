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
        <!-- <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true"
          style="width: 1370px; height: 400px; margin-left: 20px;">
          <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
          <KakaoMapMarker v-for="(store, index) in addList" :key="index" :lat="store.latitude" :lng="store.longitude">
          </KakaoMapMarker>
        </KakaoMap> -->
      </div>

      <h2 class="result-h2">동네 랭킹 Best 👍<a class="view-count" href="/searchmap">더보기</a></h2>
      <hr>
      <div class="rank">
        <div class="rank-item" v-bind:key="i" v-for="(storeVo, i) in storeList">
          <router-link :to="`/edit/${storeVo.bNo}`">
            <img src="../../assets/images/dog2.jpg">
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
        <div class="rank-item" v-bind:key="i" v-for="(reviewVo, i) in reviewList">
          <div @click="openModal(reviewVo.rNo)">
            <img src="../../assets/images/dog.jpg">
            <label>{{ reviewVo.title }}</label>
          </div>
        </div>
      </div>
      <div class="modal-wrap-search" v-show="modalCheck">
        <div class="modal-container-search">
          <div class="reviewBoardDetailContainer-search">
            <!-- Display review details in the modal -->
            <div class="reviewDetailImg-search">
              <Swiper :slides-per-view="1" style="width: 350px;">
                <SwiperSlide v-for="(reviewVo, i) in reviewList2" :key="i">
                  <div class="reviewDetailImg">
                    <img :src="`${this.$store.state.apiBaseUrl}/upload/${reviewVo.saveName}`"
                      style="width: 350px; height: 350px;">
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div class="modal-content">
              <div class="userId"><strong>{{ reviewVo2.uId }}</strong>님</div>
              <div style="display: flex;">
                <div class="cutInfor">{{ reviewVo2.dogName }} ({{ reviewVo2.weight }}kg) &nbsp; </div>
                <div class="date">{{ formatDate(reviewVo2.rDate) }}</div>
              </div>
              <br>
              <div style="display: flex;">
                <div class="price">{{ reviewVo2.expectedPrice.toLocaleString() }}원&nbsp;</div>
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
            <button @click="modalCheck = false" style="width: 200px;">닫기</button>
          </div>
        </div>
      </div>
    </div>
    <TopButton />
    <AppFooter id="AppFooter" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

const store = useStore();

const coordinate = ref({
  lat: 37.5535,
  lng: 126.9715
});

const storeList = ref([]);
const addList = ref([]);
const map = ref(null);
const overlays = ref([]);

window.closeOverlay = () => {
  overlays.value.forEach(o => o.overlay.setMap(null));
};

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      coordinate.value.lat = lat;
      coordinate.value.lng = lng;

      createMap(); // 현재 위치로 지도 이동
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

const mainList = () => {
  const params = {
    lat: coordinate.value.lat,
    lng: coordinate.value.lng,
  };

  axios({
    method: 'get',
    url: `${store.state.apiBaseUrl}/api/mainlist`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    params: params,
    responseType: 'json'
  }).then(response => {
    storeList.value = response.data.apiData;
  }).catch(error => {
    console.log(error);
  });
};

const markList = () => {
  axios({
    method: 'get',
    url: `${store.state.apiBaseUrl}/api/marker`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    responseType: 'json'
  }).then(response => {
    addList.value = response.data.apiData;
    createMap();
  }).catch(error => {
    console.log(error);
  });
};

const createMap = () => {
  if (!window.kakao) {
    console.error("Kakao map library not loaded.");
    return;
  }

  if (!map.value) {
    map.value = new window.kakao.maps.Map(document.querySelector("#map-main"), {
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

    const overlay = new window.kakao.maps.CustomOverlay({
      content: content,
      map: null,
      position: marker.getPosition()
    });

    overlays.value.push({ id: store.id, overlay });

    window.kakao.maps.event.addListener(marker, 'click', () => {
      overlays.value.forEach(o => o.overlay.setMap(null)); // 모든 오버레이를 지도에서 숨깁니다.
      overlay.setMap(map.value); // 클릭한 마커에 해당하는 오버레이를 지도에 표시합니다.
    });
  });

  // 오버레이 순회 및 숨기는 부분 추가
  overlays.value.forEach(o => o.overlay.setMap(null));
};


onMounted(() => {
  mainList();
  markList();
});

</script>


<script>
import SlideView from '@/components/SlideView.vue';
import SlideViewBanner from '@/components/SlideViewBanner.vue';
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
import TopButton from "@/components/TopButton.vue"
import "@/assets/css/potal/main.css"
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
// import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

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
      suggestions: [],
      storeList: [],
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
    openModal(rNo) {
      if (rNo) {
        this.getOneRList(rNo); // Fetch review details
        this.modalCheck = true; // Open modal
      }
    },
    getOneRList(rNo) {
      console.log("후기 1개 가져오기");
      console.log("리뷰", rNo, "선택함");
      axios({
        method: 'get', // put, post, delete                   
        url: `${this.$store.state.apiBaseUrl}/api/mypage/getonerlist`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        params: { rNo: rNo }, //get방식 파라미터로 값이 전달
        responseType: 'json' //수신타입

      }).then(response => {
        console.log(response.data.apiData); //수신데이타
        this.reviewVo2 = response.data.apiData;
        console.log(this.reviewVo);
        console.log(this.reviewVo.bNo);
      }).catch(error => {
        console.log(error);
      });
    },
    reviewDetail(rNo) {
      if (rNo) {
        this.selectedReview = this.reviewList.find((review) => review.rNo === rNo);
        if (this.selectedReview) {
          this.updateViewCount(rNo);
        }
        this.modalCheck = true;
      }
      console.log("선택한 리뷰번호", rNo);
      this.getOneRList(rNo);
      this.getSaveName(rNo);
    },
    // 조회수 업데이트
    updateViewCount(rNo) {
      console.log("조회수 1증가!!!");
      console.log(rNo);
      axios({
        method: 'post',  //put,post,delete
        url: `${this.$store.state.apiBaseUrl}/api/mypage/updateview`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        params: { rNo: rNo },
        responseType: 'json' //수신타입
      }).then(response => {
        console.log("성공");
        console.log(response.data.apiData); //수신데이타
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
        method: 'get',  //put,post,delete
        url: `${this.$store.state.apiBaseUrl}/api/mypage/getsavename`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        params: { bNo: this.reviewVo.bNo },
        responseType: 'json' //수신타입
      }).then(response => {
        console.log("성공");
        console.log(response.data.apiData); //수신데이타
        this.reviewList2 = response.data.apiData;

        console.log(this.businessList);
      }).catch(error => {
        console.log(error);
      });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },
  created() {
    this.getList();
  }
};
</script>
