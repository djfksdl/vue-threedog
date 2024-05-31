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
            <!-- 도시 선택 -->
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
                        v-if="selectedCities.includes(city)" @click.stop="cancelCity(city)">X</span></li>
                  </ul>
                </div>
              </td>
            </tr>
            <!-- 종류 선택 -->
            <tr>
              <td class="search-category">
                <div class="location-box">
                  <div>종류</div>
                </div>
              </td>
              <td>
                <div class="city-box">
                  <ul class="city-list">
                    <li v-for="type in types" :key="type" @click="toggleType(type)"
                      :class="{ 'selected': selectedTypes.includes(type) }">{{ type }} <span
                        v-if="selectedTypes.includes(type)" @click.stop="cancelType(type)">X</span></li>
                  </ul>
                </div>
              </td>
            </tr>
            <!-- 무게 선택 -->
            <tr>
              <td class="search-category">
                <div class="location-box">
                  <div>몸무게</div>
                </div>
              </td>
              <td>
                <div class="city-box">
                  <ul class="city-list">
                    <li v-for="(weight, index) in weights" :key="index" @click="toggleWeight(index)"
                      :class="{ 'selected': selectedWeights.includes(index) }">{{ weight }} <span
                        v-if="selectedWeights.includes(index)" @click.stop="cancelWeight(index)">X</span></li>
                  </ul>
                </div>
              </td>
            </tr>
            <!-- 가격 선택 -->
            <tr>
              <td class="search-category">
                <div class="location-box">
                  <div>가격</div>
                </div>
              </td>
              <td>
                <div class="city-box">
                  <ul class="city-list">
                    <li v-for="(price, index) in prices" :key="index" @click="togglePrice(index)"
                      :class="{ 'selected': selectedPrices.includes(index) }">{{ price }} <span
                        v-if="selectedPrices.includes(index)" @click.stop="cancelPrice(index)">X</span></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 선택된 항목 표시 -->
      <div class="selected-items">
        <div v-for="(item, index) in selectedItems" :key="index" class="selected-item" @click="cancelSelected(item)">
          {{ item.label }}
          <button @click="cancelSelected(item)" class="lcancel-btn">X</button>
        </div>
      </div>
      <div class="bottom">
        <h2 class="result-h2">{{ selectedItems.length > 0 ? '관련 검색 결과' : '검색 결과' }}<span class="view-count">조회수 높은
            순</span></h2>
        <hr>
        <div class="search-result">
          <div class="rank-search">
            <div class="search-item" v-bind:key="i" v-for="(reviewVo, i) in reviewList">
              <img class="list_img" src="../../assets/images/bori.jpg">
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
              <label>{{ reviewVo.title }}</label>
            </div>

          </div>
        </div>
      </div>

    </div>
    <TopButton />
    <AppFooter id="AppFooter" />
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
import TopButton from "@/components/TopButton.vue"
import "@/assets/css/potal/search.css"
import axios from 'axios';

export default {
  name: "SearchView",
  components: {
    AppFooter,
    AppHeader,
    TopButton
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
        bNo: ''
      },
      cities: ['서울', '경기', '강원', '충북', '충남', '경북', '경남', '전북', '전남', '제주'],
      types: ['소형견', '중형견', '특수견'],
      weights: ['~2kg', '2~5kg', '5~8kg', '8~10kg', '10~12kg', '12kg~'],
      prices: ['~20,000', '~40,000', '~60,000', '60,000~']
    };
  },
  watch: {
    selectedItems: {
      handler: 'searchList', // selectedItems가 변할 때마다 searchList 메소드 호출
      deep: true // 중첩된 객체도 감시
    }
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
    toggleWeight(index) {
      const weight = this.weights[index];
      if (!this.selectedWeights.includes(index)) {
        this.selectedWeights.push(index);
        this.selectedItems.push({ type: 'weight', label: weight });
      } else {
        this.selectedWeights = this.selectedWeights.filter(item => item !== index);
        this.selectedItems = this.selectedItems.filter(item => item.label !== weight);
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
    togglePrice(index) {
      const price = this.prices[index];
      if (!this.selectedPrices.includes(index)) {
        this.selectedPrices.push(index);
        this.selectedItems.push({ type: 'price', label: price });
      } else {
        this.selectedPrices = this.selectedPrices.filter(item => item !== index);
        this.selectedItems = this.selectedItems.filter(item => item.label !== price);
      }
    },
    cancelCity(city) {
      this.selectedCities = this.selectedCities.filter(item => item !== city);
      this.selectedItems = this.selectedItems.filter(item => item.label !== city);
    },
    cancelWeight(weightIndex) {
      const weight = this.weights[weightIndex];
      this.selectedWeights = this.selectedWeights.filter(item => item !== weightIndex);
      this.selectedItems = this.selectedItems.filter(item => item.label !== weight);
    },
    cancelType(type) {
      this.selectedTypes = this.selectedTypes.filter(item => item !== type);
      this.selectedItems = this.selectedItems.filter(item => item.label !== type);
    },
    cancelPrice(priceIndex) {
      const price = this.prices[priceIndex];
      this.selectedPrices = this.selectedPrices.filter(item => item !== priceIndex);
      this.selectedItems = this.selectedItems.filter(item => item.label !== price);
    },
    cancelSelected(item) {
      if (item.type === 'city') {
        this.cancelCity(item.label);
      } else if (item.type === 'weight') {
        this.cancelWeight(this.weights.indexOf(item.label));
      } else if (item.type === 'type') {
        this.cancelType(item.label);
      } else if (item.type === 'price') {
        this.cancelPrice(this.prices.indexOf(item.label));
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
        responseType: 'json'
      }).then(response => {
        console.log(response.data.apiData);
        this.reviewList = response.data.apiData;
      }).catch(error => {
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
        selectedPrices: selectedPricesString
      };

      console.log("==================");
      console.log(params);
      console.log("==================");

      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/keyword`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: params, // 쿼리 매개변수로 데이터를 전송
        responseType: 'json'
      }).then(response => {
        console.log(response.data.apiData);
        this.reviewList = response.data.apiData;
      }).catch(error => {
        console.log(error);
      });
    }
  },
  created() {
    this.getList();
  }
}
</script>
