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
                      <span v-if="selectedWeights.includes('~2kg')" @click="cancelWeight('~2kg')"
                        class="cancel-btn">X</span>
                    </li>
                    <li @click="toggleWeight('2~5kg')" :class="{ 'selected': selectedWeights.includes('2~5kg') }">2~5kg
                      <span v-if="selectedWeights.includes('2~5kg')" @click="cancelWeight('2~5kg')"
                        class="cancel-btn">X</span>
                    </li>
                    <li @click="toggleWeight('5~8kg')" :class="{ 'selected': selectedWeights.includes('5~8kg') }">5~8kg
                      <span v-if="selectedWeights.includes('5~8kg')" @click="cancelWeight('5~8kg')"
                        class="cancel-btn">X</span>
                    </li>
                    <li @click="toggleWeight('8~10kg')" :class="{ 'selected': selectedWeights.includes('8~10kg') }">
                      8~10kg <span v-if="selectedWeights.includes('8~10kg')" @click="cancelWeight('8~10kg')"
                        class="cancel-btn">X</span></li>
                    <li @click="toggleWeight('10~12kg')" :class="{ 'selected': selectedWeights.includes('10~12kg') }">
                      10~12kg <span v-if="selectedWeights.includes('10~12kg')" @click="cancelWeight('10~12kg')"
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
                    <li @click="toggleType('소형견')" :class="{ 'selected': selectedTypes.includes('소형견') }">소형견 <span
                        v-if="selectedTypes.includes('소형견')" class="cancel-btn" @click="cancelType('소형견')">X</span></li>
                    <li @click="toggleType('중형견')" :class="{ 'selected': selectedTypes.includes('중형견') }">중형견 <span
                        v-if="selectedTypes.includes('중형견')" class="cancel-btn" @click="cancelType('중형견')">X</span></li>
                    <li @click="toggleType('특수견')" :class="{ 'selected': selectedTypes.includes('특수견') }">특수견 <span
                        v-if="selectedTypes.includes('특수견')" class="cancel-btn" @click="cancelType('특수견')">X</span></li>
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
                      ~20,000 <span v-if="selectedPrices.includes('~20,000')" @click="cancelPrice('~20,000')"
                        class="cancel-btn">X</span></li>
                    <li @click="togglePrice('20,000~40,000')"
                      :class="{ 'selected': selectedPrices.includes('20,000~40,000') }">20,000~40,000 <span
                        v-if="selectedPrices.includes('20,000~40,000')" @click="cancelPrice('20,000~40,000')"
                        class="cancel-btn">X</span></li>
                    <li @click="togglePrice('40,000~60,000')"
                      :class="{ 'selected': selectedPrices.includes('40,000~60,000') }">40,000~60,000 <span
                        v-if="selectedPrices.includes('40,000~60,000')" @click="cancelPrice('40,000~60,000')"
                        class="cancel-btn">X</span></li>
                    <li @click="togglePrice('60,000~')" :class="{ 'selected': selectedPrices.includes('60,000~') }">
                      60,000~ <span v-if="selectedPrices.includes('60,000~')" @click="cancelPrice('60,000~')"
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
          <button @click="cancelSelected(item)" class="cancel-btn">X</button>
        </div>
      </div>
      <div class="bottom">
        <h2>검색 결과</h2>
        <hr>
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
        </div>
        <div class="popular-search">
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
    </div><!-- potal-search-container -->
    <TopButton />
    <AppFooter id="AppFooter" />
  </div><!-- wrap -->
</template>

<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
import TopButton from "@/components/TopButton.vue"

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
      selectedItems: []
    };
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
    }
  }
}
</script>

<style>
#potal-search-container {
  width: 1400px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
}

.search-search-container {
  margin-left: 20px;
  margin-top: 40px;
  display: flex;
}

.search-input-search {
  width: 400px;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 15px;
  outline: none;
  font-size: 16px;
  padding-right: 40px;
  height: 45px;
}

.search-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 15px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 16px;
  height: 45px;
}

.location-box {
  margin-right: 20px;
}

.search-category {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 20px 20px 40px;
  position: relative;
  background-color: #236C3F;
  text-align: center;
  color: white;
}

.city-list {
  list-style: none;
  padding: 10px;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.city-list li {
  margin-right: 10px;
  cursor: pointer;
  padding: 10px 25px;
  position: relative;
}

.city-list li.selected {
  background-color: #9bd89d;
  border-radius: 20px;
}

.city-list li span {
  cursor: pointer;
  margin-left: 10px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.location-box div {
  font-size: 20px;
  margin-bottom: 5px;
}

.cancel-btn {
  font-size: 12px;
  padding: 5px;
  background-color: #9bd89d;
  border: none;
}

.selected-items {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
  cursor: pointer;
}

.selected-item {
  background-color: #9bd89d;
  border-radius: 20px;
  padding: 8px 12px;
  margin: 5px;
}

.selected-item span {
  margin-left: 5px;
  cursor: pointer;
}

.bottom {
  margin: 20px 20px 20px 20px;
  position: relative;
}

.search-result {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
  margin: 20px 0 15px 15px;
}

.search-item {
  margin-right: 20px;
}

.search-item img {
  width: 470px;
  height: 250px;
  margin-right: 10px;
  object-fit: cover;
}

.search-item label {
  display: block;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px
}

.popular-search {
  width: 300px;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: calc(100% - 160px);
  right: 16%;
  transform: translateY(-50%);
  background-color: white;
}

.popular-search>h2 {
  text-align: center;
  margin-bottom: 7px;
}

.popular-items ul {
  padding: 0;
  margin: 5px;
}

.popular-items li {
  list-style: none;
  margin-bottom: 5px;
  font-size: 14px;
}

.search-category {
  display: flex;
  align-items: center;
  position: relative;
}

.search-table{
  margin:20px 0 0 20px;
  border-collapse: collapse;
  padding-left: 20px;
  border: 1px solid #d6d6d6;
}

/* .search-table td {
  border: 1px solid #d6d6d6;
} */

.search-table .search-location {
  background-color: #9bd89d;
}

</style>
