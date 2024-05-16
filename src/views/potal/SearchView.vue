<template>
  <div id="wrap">
    <AppHeader />
    <div id="potal-search-container" class="clearfix">
      <div class="search-search-container">
        <div class="search-search-input">
          <input type="text" class="search-input-search" placeholder="검색어를 입력하세요">
        </div>
        <button class="search-button">검색</button>
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
                    <li @click="toggleCity('서울')" :class="{ 'selected': selectedCities.includes('서울') }">서울 <span
                        v-if="selectedCities.includes('서울')" @click="cancelCity('서울')">X</span></li>
                    <li @click="toggleCity('경기')" :class="{ 'selected': selectedCities.includes('경기') }">경기 <span
                        v-if="selectedCities.includes('경기')" @click="cancelCity('경기')">X</span></li>
                    <li @click="toggleCity('강원')" :class="{ 'selected': selectedCities.includes('강원') }">강원 <span
                        v-if="selectedCities.includes('강원')" @click="cancelCity('강원')">X</span></li>
                    <li @click="toggleCity('충북')" :class="{ 'selected': selectedCities.includes('충북') }">충북 <span
                        v-if="selectedCities.includes('충북')" @click="cancelCity('충북')">X</span></li>
                    <li @click="toggleCity('충남')" :class="{ 'selected': selectedCities.includes('충남') }">충남 <span
                        v-if="selectedCities.includes('충남')" @click="cancelCity('충남')">X</span></li>
                    <li @click="toggleCity('경북')" :class="{ 'selected': selectedCities.includes('경북') }">경북 <span
                        v-if="selectedCities.includes('경북')" @click="cancelCity('경북')">X</span></li>
                    <li @click="toggleCity('경남')" :class="{ 'selected': selectedCities.includes('경남') }">경남 <span
                        v-if="selectedCities.includes('경남')" @click="cancelCity('경남')">X</span></li>
                    <li @click="toggleCity('전북')" :class="{ 'selected': selectedCities.includes('전북') }">전북 <span
                        v-if="selectedCities.includes('전북')" @click="cancelCity('전북')">X</span></li>
                    <li @click="toggleCity('전남')" :class="{ 'selected': selectedCities.includes('전남') }">전남 <span
                        v-if="selectedCities.includes('전남')" @click="cancelCity('전남')">X</span></li>
                    <li @click="toggleCity('제주')" :class="{ 'selected': selectedCities.includes('제주') }">제주 <span
                        v-if="selectedCities.includes('제주')" @click="cancelCity('제주')">X</span></li>
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
                    <li @click="toggleWeight('~2kg')" :class="{ 'selected': selectedWeights.includes('~2kg') }">2kg 이하
                      &nbsp;
                      <span v-if="selectedWeights.includes('~2kg')" @click="cancelWeight('~2kg')"
                        class="cancel-btn">X</span>
                    </li>
                    <li @click="toggleWeight('2~5kg')" :class="{ 'selected': selectedWeights.includes('2~5kg') }">2~5kg
                      &nbsp;
                      <span v-if="selectedWeights.includes('2~5kg')" @click="cancelWeight('2~5kg')"
                        class="cancel-btn">X</span>
                    </li>
                    <li @click="toggleWeight('5~8kg')" :class="{ 'selected': selectedWeights.includes('5~8kg') }">5~8kg
                      &nbsp;
                      <span v-if="selectedWeights.includes('5~8kg')" @click="cancelWeight('5~8kg')"
                        class="cancel-btn">X</span>
                    </li>
                    <li @click="toggleWeight('8~10kg')" :class="{ 'selected': selectedWeights.includes('8~10kg') }">
                      8~10kg &nbsp; <span v-if="selectedWeights.includes('8~10kg')" @click="cancelWeight('8~10kg')"
                        class="cancel-btn">X</span></li>
                    <li @click="toggleWeight('10~12kg')" :class="{ 'selected': selectedWeights.includes('10~12kg') }">
                      10~12kg &nbsp; <span v-if="selectedWeights.includes('10~12kg')" @click="cancelWeight('10~12kg')"
                        class="cancel-btn">X</span></li>
                    <li @click="toggleWeight('12kg~')" :class="{ 'selected': selectedWeights.includes('12kg~') }">12kg~
                      <span v-if="selectedWeights.includes('12kg~')" @click="cancelWeight('12kg~')"
                        class="cancel-btn">X</span>
                    </li>
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
                    <li @click="toggleType('소형견')" :class="{ 'selected': selectedTypes.includes('소형견') }">소형견 &nbsp;
                      <span v-if="selectedTypes.includes('소형견')" class="cancel-btn" @click="cancelType('소형견')">X</span>
                    </li>
                    <li @click="toggleType('중형견')" :class="{ 'selected': selectedTypes.includes('중형견') }">중형견 &nbsp;
                      <span v-if="selectedTypes.includes('중형견')" class="cancel-btn" @click="cancelType('중형견')">X</span>
                    </li>
                    <li @click="toggleType('특수견')" :class="{ 'selected': selectedTypes.includes('특수견') }">특수견 &nbsp;
                      <span v-if="selectedTypes.includes('특수견')" class="cancel-btn" @click="cancelType('특수견')">X</span>
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
                    <li @click="togglePrice('~20,000')" :class="{ 'selected': selectedPrices.includes('~20,000') }">
                      ~20,000 &nbsp; <span v-if="selectedPrices.includes('~20,000')" @click="cancelPrice('~20,000')"
                        class="cancel-btn">X</span></li>
                    <li @click="togglePrice('20,000~40,000')"
                      :class="{ 'selected': selectedPrices.includes('20,000~40,000') }">20,000~40,000 &nbsp; <span
                        v-if="selectedPrices.includes('20,000~40,000')" @click="cancelPrice('20,000~40,000')"
                        class="cancel-btn">X</span></li>
                    <li @click="togglePrice('40,000~60,000')"
                      :class="{ 'selected': selectedPrices.includes('40,000~60,000') }">40,000~60,000 &nbsp; <span
                        v-if="selectedPrices.includes('40,000~60,000')" @click="cancelPrice('40,000~60,000')"
                        class="cancel-btn">X</span></li>
                    <li @click="togglePrice('60,000~')" :class="{ 'selected': selectedPrices.includes('60,000~') }">
                      60,000~ &nbsp; <span v-if="selectedPrices.includes('60,000~')" @click="cancelPrice('60,000~')"
                        class="cancel-btn">X</span></li>
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
          <button @click="cancelSelected(item)" class="lcancel-btn">X</button>
        </div>
      </div>
      <div class="bottom">
        <h2 class="result-h2">검색 결과</h2>
        <hr>
        <div class="bottom-bottom">
          <div class="search-result">
            <div class="search-item">
              <img src="../../assets/images/spy.jpg">
              <label>스파이가게</label>
            </div>
            <div class="search-item">
              <img src="../../assets/images/dog2.jpg">
              <label>하이미디어</label>
            </div>
            <div class="search-item">
              <img src="../../assets/images/spy.jpg">
              <label>스파이가게</label>
            </div>
            <div class="search-item">
              <img src="../../assets/images/dog2.jpg">
              <label>하이미디어</label>
            </div>
            <div class="search-item">
              <img src="../../assets/images/spy.jpg">
              <label>스파이가게</label>
            </div>
            <div class="search-item">
              <img src="../../assets/images/dog2.jpg">
              <label>하이미디어</label>
            </div>
          </div>
          <div class="popular-search" :style="popularStyle">
            <h2>인기 검색어</h2>
            <div class="popular-items">
              <ul>
                <li>1. dddddd</li>
                <li>2. dddddd</li>
                <li>3. dddddd</li>
                <li>4. dddddd</li>
                <li>5. dddddd</li>
                <li>6. dddddd</li>
                <li>7. dddddd</li>
                <li>8. dddddd</li>
                <li>9. dddddd</li>
                <li>10. dddddd</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div><!-- potal-search-container -->
    <TopButton />
    <AppFooter id="AppFooter" />
  </div><!-- wrap -->
</template>

<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
import TopButton from "@/components/TopButton.vue"
import "@/assets/css/potal/search.css"

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
    };
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
    toggleWeight(weight) {
      const index = this.selectedWeights.indexOf(weight);
      if (index === -1) {
        this.selectedWeights.push(weight);
        this.selectedItems.push({ type: 'weight', label: weight });
      } else {
        this.selectedWeights.splice(index, 1);
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
    togglePrice(price) {
      const index = this.selectedPrices.indexOf(price);
      if (index === -1) {
        this.selectedPrices.push(price);
        this.selectedItems.push({ type: 'price', label: price });
      } else {
        this.selectedPrices.splice(index, 1);
        this.selectedItems = this.selectedItems.filter(item => item.label !== price);
      }
    },
    cancelCity(city) {
      this.selectedCities = this.selectedCities.filter(item => item !== city);
      this.selectedItems = this.selectedItems.filter(item => item.label !== city);
    },
    cancelWeight(weight) {
      this.selectedWeights = this.selectedWeights.filter(item => item !== weight);
      this.selectedItems = this.selectedItems.filter(item => item.label !== weight);
    },
    cancelType(type) {
      this.selectedTypes = this.selectedTypes.filter(item => item !== type);
      this.selectedItems = this.selectedItems.filter(item => item.label !== type);
    },
    cancelPrice(price) {
      this.selectedPrices = this.selectedPrices.filter(item => item !== price);
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
  }
}
</script>
