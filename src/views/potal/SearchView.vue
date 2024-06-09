<template>
  <div id="wrap">
    <AppHeader />
    <div id="potal-search-container" class="clearfix">
      <div class="search-search-container">
        <div class="search-search-input">
          <input type="text" class="search-input-search" ref="searchInput" placeholder="검색어를 입력하세요"
            @input="debouncedSearch">
        </div>
        <button class="search-button" @click="searchList">검색</button>
      </div>
      <div class="search-select">
        <table class="search-table">
          <tbody>
            <tr>
              <td class="search-category">
                <div class="location-box">
                  <div>위치</div>
                </div>
              </td>
              <td>
                <div class="city-box">
                  <ul class="city-list">
                    <li v-for="city in cities" :key="city" @click="toggleCity(city)"
                      :class="{ 'selected': selectedCities.includes(city) }">{{ city }} <span
                        v-if="selectedCities.includes(city)" @click.stop="cancelCity(city)">x</span></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td class="search-category">
                <div class="location-box">
                  <div>종류</div>
                </div>
              </td>
              <td>
                <div class="city-box">
                  <ul class="city-list">
                    <li v-for="size in types" :key="size" @click="toggleType(size)"
                      :class="{ 'selected': selectedTypes.includes(size) }">{{ size }}<span
                        v-if="selectedTypes.includes(size)" @click.stop="cancelType(size)">x</span></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td class="search-category">
                <div class="location-box">
                  <div>몸무게</div>
                </div>
              </td>
              <td>
                <div class="city-box">
                  <ul class="city-list">
                    <li v-for="(weight, index) in weights" :key="weight" @click="toggleWeight(weight)"
                      :class="{ 'selected': selectedWeights.includes(index) }"
                      :style="{ 'background-color': selectedItems.find(item => item.label === weight && item.isSelected) ? '#9bd89d' : 'white' }">
                      {{ weight }} <span v-if="selectedWeights.includes(index)"
                        @click.stop="cancelWeight(index)">x</span>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td class="search-category">
                <div class="location-box">
                  <div>가격</div>
                </div>
              </td>
              <td>
                <div class="city-box">
                  <ul class="city-list">
                    <li v-for="(price, index) in prices" :key="price" @click="togglePrice(price)"
                      :class="{ 'selected': selectedPrices.includes(index) }"
                      :style="{ 'background-color': selectedItems.find(item => item.label === price && item.isSelected) ? '#9bd89d' : 'white' }">
                      {{ price }} <span v-if="selectedPrices.includes(index)" @click.stop="cancelPrice(index)">x</span>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="selected-items">
        <div v-for="(item, index) in selectedItems" :key="index" class="selected-item" @click="cancelSelected(item)">
          {{ item.label }}
          <button @click="cancelSelected(item)" class="lcancel-btn">x</button>
        </div>
      </div>
      <div class="bottom">
        <h2 class="result-h2">{{ selectedItems.length > 0 ? '관련 미용 후기 😍' : '강아지 미용 후기 😍' }}<span
            class="view-count">조회수 높은
            순</span></h2>
        <hr>
        <div class="search-result">
          <div v-if="reviewList.length > 0" class="rank-search">
            <div class="search-item" @mouseenter="hoverReview(i)" @mouseleave="leaveReview(i)"
              @click="reviewDetail(reviewVo.rNo)" v-bind:key="i" v-for="(reviewVo, i) in reviewList">
              <div class="review-img-container">
                <img class="list_img" src="../../assets/images/bori.jpg">
                <div class="hover-overlay" v-if="hoveredIndex === i">
                  <button @click.stop="reviewDetail(reviewVo.rNo)">후기 보기</button>
                </div>
              </div>
              <div class="star-container">
                <div class="star_list" v-for="index in 5" :key="index">
                  <span v-if="index <= reviewVo.star" class="yellowStar">
                    <img class="yellowStar_list" src="@/assets/images/star_yellow.jpg">
                  </span>
                  <span v-else class="grayStar">
                    <img class="grayStar_list" src="@/assets/images/star_gray.jpg">
                  </span>
                </div>
              </div>
              <label><strong>{{ reviewVo.title }}</strong></label>
              <div class="context" style="margin-bottom: 10px;">
                {{ truncateContent(reviewVo.rContent) }} <!-- 여기서 rContent를 바인딩 -->
              </div>
            </div>
          </div>
          <div v-else class="no-results">
            관련된 후기가 없습니다
          </div>
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
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import TopButton from "@/components/TopButton.vue";
import "@/assets/css/potal/search.css";
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  name: "SearchView",
  components: {
    AppFooter,
    AppHeader,
    TopButton,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      selectedCities: [],
      selectedWeights: [],
      selectedTypes: [],
      selectedPrices: [],
      selectedItems: [],
      isFixed: false,
      reviewList: [],
      reviewVo: {
        rNo: '',
        star: '',
        title: '',
        saveName: '',
        bNo: '',
        rContent: ''
      },
      cities: ['서울', '경기', '강원', '충북', '충남', '경북', '경남', '전북', '전남', '제주'],
      types: ['소형견', '중형견', '특수견'],
      weights: ['~2kg', '2~5kg', '5~8kg', '8~10kg', '10~12kg', '12kg~'],
      prices: ['~20,000', '~40,000', '~60,000', '60,000~'],
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
  watch: {
    selectedItems: {
      handler: 'searchList', // selectedItems가 변할 때마다 searchList 메소드 호출
      deep: true, // 중첩된 객체도 감시
    },
  },
  computed: {
    popularStyle() {
      return {
        position: this.isFixed ? 'fixed' : 'fixed',
        top: this.isFixed ? '200px' : '710px',
        right: this.isFixed ? '300px' : '300px',
        transition: 'top 0.3s ease',
      };
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.getList(); // 이 부분에서 getList 메소드 호출
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll); // 컴포넌트가 소멸되기 전에 리스너 제거
  },
  methods: {
    toggleCity(city) {
      const index = this.selectedCities.indexOf(city);
      if (index === -1) {
        this.selectedCities.push(city);
        this.selectedItems.push({ type: 'city', label: city });
      } else {
        this.selectedCities.splice(index, 1);
        this.selectedItems = this.selectedItems.filter(item => item.label !== city);
      }
    },
    toggleType(type) {
      if (!this.selectedTypes.includes(type)) {
        this.selectedTypes.push(type);
        this.selectedItems.push({ type: 'type', label: type });
      } else {
        this.selectedTypes = this.selectedTypes.filter(item => item !== type);
        this.selectedItems = this.selectedItems.filter(item => item.label !== type);
      }
    },
    toggleWeight(weight) {
      const weightIndex = this.weights.indexOf(weight);
      if (!this.selectedWeights.includes(weightIndex)) {
        this.selectedWeights.push(weightIndex);
        this.selectedItems.push({ type: 'weight', label: weight, isSelected: true }); // isSelected 변수 추가
      } else {
        this.selectedWeights = this.selectedWeights.filter(item => item !== weightIndex);
        this.selectedItems = this.selectedItems.filter(item => item.label !== weight);
      }
    },
    togglePrice(price) {
      const priceIndex = this.prices.indexOf(price);
      if (!this.selectedPrices.includes(priceIndex)) {
        this.selectedPrices.push(priceIndex);
        this.selectedItems.push({ type: 'price', label: price, isSelected: true }); // isSelected 변수 추가
      } else {
        this.selectedPrices = this.selectedPrices.filter(item => item !== priceIndex);
        this.selectedItems = this.selectedItems.filter(item => item.label !== price);
      }
    },

    cancelCity(city) {
      this.selectedCities = this.selectedCities.filter(item => item !== city);
      this.selectedItems = this.selectedItems.filter(item => item.label !== city);
    },
    cancelWeight(weight) {
      const weightIndex = this.weights.indexOf(weight);
      this.selectedWeights = this.selectedWeights.filter(item => item !== weightIndex);
      this.selectedItems = this.selectedItems.filter(item => item.label !== weight);
    },
    cancelType(type) {
      this.selectedTypes = this.selectedTypes.filter(item => item !== type);
      this.selectedItems = this.selectedItems.filter(item => item.label !== type);
    },
    cancelPrice(price) {
      const priceIndex = this.prices.indexOf(price);
      this.selectedPrices = this.selectedPrices.filter(item => item !== priceIndex);
      this.selectedItems = this.selectedItems.filter(item => item.label !== price);
    },
    cancelSelected(item) {
      if (item.type === 'city') {
        this.cancelCity(item.label);
      } else if (item.type === 'weight') {
        this.cancelWeight(item.label);
      } else if (item.type === 'type') {
        this.cancelType(item.label);
      } else if (item.type === 'price') {
        this.cancelPrice(item.label);
      }
    },
    handleScroll() {
      const scrollTop = window.scrollY || window.pageYOffset; // 현재 스크롤 위치
      if (scrollTop > 350) {
        this.isFixed = true; // 사이드바를 고정 상태로 변경
      } else {
        this.isFixed = false; // 그렇지 않으면 사이드바를 고정 해제
      }
    },
    getList() {
      console.log("데이터 가져오기");
      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/searchlist`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        responseType: 'json',
      })
        .then((response) => {
          console.log(response.data.apiData);
          this.reviewList = response.data.apiData;
          console.log("=================");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchResultText() {
      return this.selectedItems.length > 0 ? '관련 검색 결과' : '검색 결과';
    },
    searchList() {
      console.log("데이터 가져오기");
      const searchKeyword = this.$refs.searchInput.value;

      const selectedCitiesString = this.selectedCities.join(';');
      const selectedWeightsString = this.selectedWeights.join(';');
      const selectedTypesString = this.selectedTypes.join(';');
      const selectedPricesString = this.selectedPrices.join(';');

      const params = {
        searchKeyword: searchKeyword,
        selectedCities: selectedCitiesString,
        selectedWeights: selectedWeightsString,
        selectedTypes: selectedTypesString,
        selectedPrices: selectedPricesString,
      };

      console.log("==================");
      console.log(params);
      console.log("==================");

      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/keyword`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: params, // 쿼리 매개변수로 데이터를 전송
        responseType: 'json',
      })
        .then((response) => {
          console.log(response.data.apiData);
          this.reviewList = response.data.apiData;
        })
        .catch((error) => {
          console.log(error);
        });
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
        this.getSaveName(rNo);
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
      this.getOneRList(rNo);
      // this.getSaveName(rNo);
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
        params: { rNo: rNo },
        responseType: 'json' //수신타입
      }).then(response => {
        console.log("후기사진가져오기성공");
        console.log(response.data.apiData); //수신데이타
        this.reviewList2 = response.data.apiData;
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
    hoverReview(index) {
      this.hoveredIndex = index;
    },
    leaveReview() {
      this.hoveredIndex = null;
    },
    truncateContent(rContent) {
      if (!rContent) {
        return '';
      }
      if (rContent.length > 80) {
        return rContent.substring(0, 80) + '...';
      } else {
        return rContent;
      }
    }

  },
  created() {
    this.getList(); // 이 부분에서 getList 메소드 호출
  },
};
</script>