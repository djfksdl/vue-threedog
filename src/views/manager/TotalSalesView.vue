<template>
  <ManagerHeader /> <!-- 매니저 헤더 컴포넌트 -->
  <div class="total-container">
    <!-- 카테고리 네비게이션 -->
    <div class="category-nav">
      <button @click="changeCategory('전체')" :class="{ active: selectedCategory === '전체' }">전체</button>
      <button @click="changeCategory('일일')" :class="{ active: selectedCategory === '일일' }">일일 매출</button>
      <button @click="changeCategory('주별')" :class="{ active: selectedCategory === '주별' }">주별 매출</button>
      <button @click="changeCategory('월별')" :class="{ active: selectedCategory === '월별' }">월별 매출</button>
      <button @click="changeCategory('년도별')" :class="{ active: selectedCategory === '년도별' }">년도별 매출</button>
    </div>

    <!-- 전체 (4개) -->
    <div class="charts-grid">
      <div v-if="selectedCategory === '전체' || selectedCategory === '일일'" class="chart-container small-chart">
        <div style="display: flex;">
          <div class="sales-table">
            <table style="text-align: center; margin-top: 20px;">
              <thead>
                <tr>
                  <th style="width: 100px;">요일</th>
                  <th style="width: 150px;">소형견</th>
                  <th style="width: 150px;">중형견</th>
                  <th style="width: 150px;">특수견</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(dayStats, index) in dayStatsBySize" :key="index">
                  <td>{{ getDayOfWeek(dayStats.dayOfWeek) }}요일</td>
                  <td>{{ getSalesBySize(dayStats, '소형견') }}</td>
                  <td>{{ getSalesBySize(dayStats, '중형견') }}</td>
                  <td>{{ getSalesBySize(dayStats, '특수견') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="total-sales">[이번 주 매출 현황]</div>
      </div>

      <!-- 주 매출통계 -->
      <div v-if="selectedCategory === '전체' || selectedCategory === '주별'" class="chart-container small-chart">
        <canvas class="week" width="300" height="200" ref="weeklyChartCanvas"></canvas>
        <div class="total-sales">이번 달 매출 합계: {{ weeklyTotal }}</div>
      </div>

      <!-- 월 매출통계 -->
      <div v-if="selectedCategory === '전체' || selectedCategory === '월별'" class="chart-container small-chart">
        <canvas class="month" width="300" height="200" ref="monthlyChartCanvas"></canvas>
        <div class="total-sales">올해 월별 매출 합계: {{ monthlyTotal }}</div>
      </div>

      <!-- 년도별 매출통계 -->
      <div v-if="selectedCategory === '전체' || selectedCategory === '년도별'" class="chart-container small-chart">
        <canvas class="year" width="300" height="200" ref="yearlyChartCanvas"></canvas>
        <div class="total-sales">년도별 매출 합계: {{ yearlyTotal }}</div>
      </div>
    </div>
  </div>
  <ManagerFooter /> <!-- 매니저 푸터 컴포넌트 -->
</template>

<script>
import ManagerFooter from "@/components/ManagerFooter.vue";
import ManagerHeader from "@/components/ManagerHeader.vue";
import Chart from "chart.js/auto";
import "@/assets/css/manager/totalsales.css";
import axios from 'axios';

export default {
  name: "TotalSalesView", // 컴포넌트 이름
  components: {
    ManagerFooter,
    ManagerHeader,
  },
  data() {
    return {
      dailySales: [], // 일별 매출 데이터 배열
      weeklySales: [], // 주별 매출 데이터 배열
      monthlySales: [], // 월별 매출 데이터 배열
      yearlySales: [], // 년도별 매출 데이터 배열
      dayStatsBySize: [],
      selectedCategory: '전체', // 선택된 카테고리
      charts: {} // 차트를 저장할 객체
    };
  },
  computed: {
    weeklyTotal() {
      return this.weeklySales.reduce((total, sale) => total + sale, 0);
    },
    monthlyTotal() {
      return this.monthlySales.reduce((total, sale) => total + sale, 0);
    },
    yearlyTotal() {
      return this.yearlySales.reduce((total, sale) => total + sale, 0);
    },
  },
  methods: {
    // 차트를 그리는 메서드
    drawChart(canvasRef, labels, data, backgroundColor, borderColor, label, type) {
      if (this.charts[canvasRef]) {
        this.charts[canvasRef].destroy();
      }
      const ctx = this.$refs[canvasRef].getContext('2d');
      this.charts[canvasRef] = new Chart(ctx, {
        type: type,
        data: {
          labels: labels,
          datasets: [{
            label: label,
            data: data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'right', // 그래프 오른쪽에 범례 표시
            },
          },
        }
      });
    },
    getWeekList(bNo) {
      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/weekstats`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: { bNo: bNo },
        responseType: 'json'
      }).then(response => {
        let weeklySalesData = response.data.apiData;

        // 데이터를 월과 주 기준으로 정렬
        weeklySalesData.sort((a, b) => {
          if (a.month === b.month) {
            return a.week - b.week;
          }
          return a.month - b.month;
        });

        this.weeklySales = weeklySalesData.map(sale => sale.totalPrice);
        const labels = weeklySalesData.map(sale => `${sale.month}월 ${sale.week}주`);

        console.log('Weekly Sales:', this.weeklySales);
        this.drawChart(
          'weeklyChartCanvas',
          labels,
          this.weeklySales,
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 1)',
          '주별 매출',
          'line'
        );
      }).catch(error => {
        console.log(error);
      });
    },
    getMonthList(bNo) {
      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/monthstats`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: { bNo: bNo },
        responseType: 'json'
      }).then(response => {
        this.monthlySales = response.data.apiData.map(sale => sale.totalPrice);
        const labels = response.data.apiData.map(sale => `${sale.month}월`);
        console.log('Monthly Sales:', this.monthlySales);
        this.drawChart(
          'monthlyChartCanvas',
          labels,
          this.monthlySales,
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 1)',
          '월별 매출',
          'doughnut'
        );
      }).catch(error => {
        console.log(error);
      });
    },
    getYearList(bNo) {
      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/yearstats`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: { bNo: bNo },
        responseType: 'json'
      }).then(response => {
        this.yearlySales = response.data.apiData.map(sale => sale.totalPrice);
        const labels = response.data.apiData.map(sale => `${sale.year}`);
        console.log('Yearly Sales:', this.yearlySales);
        this.drawChart(
          'yearlyChartCanvas',
          labels,
          this.yearlySales,
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 1)',
          '년도별 매출',
          'bar'
        );
      }).catch(error => {
        console.log(error);
      });
    },
    async getDayList(bNo) {
      axios({
        method: 'get',
        url: `${this.$store.state.apiBaseUrl}/api/daystats`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: { bNo: bNo },
        responseType: 'json'
      }).then(response => {
        console.log(response.data.apiData);
        this.dailySales = response.data.apiData;
        this.fillEmptyDays();
        this.groupDayStatsBySize();
      }).catch(error => {
        console.log(error);
      });
    },
    fillEmptyDays() {
      // dailySales 배열에 빈 매출 데이터가 있는지 확인
      const existingDays = this.dailySales.map(dayStats => dayStats.dayOfWeek);
      const allDays = [0, 1, 2, 3, 4, 5, 6]; // 모든 요일
      const missingDays = allDays.filter(day => !existingDays.includes(day));

      // 빈 매출 데이터가 있는 경우 해당 요일의 데이터 추가
      missingDays.forEach(day => {
        this.dailySales.push({
          dayOfWeek: day,
          size: '',
          totalPrice: 0,
        });
      });

      // 요일 순서대로 정렬
      this.dailySales.sort((a, b) => a.dayOfWeek - b.dayOfWeek);
    },
    groupDayStatsBySize() {
      const groupedDayStats = {};
      this.dailySales.forEach(dayStats => {
        const key = `${dayStats.dayOfWeek}_${dayStats.size}`;
        if (!groupedDayStats[key]) {
          groupedDayStats[key] = {
            dayOfWeek: dayStats.dayOfWeek,
            size: dayStats.size,
            소형견: 0,
            중형견: 0,
            특수견: 0,
          };
        }
        groupedDayStats[key][dayStats.size] += dayStats.totalPrice;
      });
      this.dayStatsBySize = Object.values(groupedDayStats);
    },
    getSalesBySize(dayStats, size) {
      return dayStats[size] || 0;
    },
    getDayOfWeek(dayNumber) {
      const days = ['일', '월', '화', '수', '목', '금', '토'];
      if (dayNumber >= 0 && dayNumber < 7) {
        return days[dayNumber];
      } else {
        return ''; // 요일이 없는 경우, 빈 문자열 반환
      }
    },
    changeCategory(category) {
      this.selectedCategory = category;
      this.updateCharts();
    },
    updateCharts() {
      const bNo = 1; // 예를 들어 bNo가 1인 경우
      if (this.selectedCategory === '전체' || this.selectedCategory === '주별') {
        this.getWeekList(bNo);
      }
      if (this.selectedCategory === '전체' || this.selectedCategory === '월별') {
        this.getMonthList(bNo);
      }
      if (this.selectedCategory === '전체' || this.selectedCategory === '년도별') {
        this.getYearList(bNo);
      }
      if (this.selectedCategory === '전체' || this.selectedCategory === '일일') {
        this.getDayList(bNo);
      }
    }
  },
  mounted() {
    const bNo = 1; // 예를 들어 bNo가 1인 경우
    this.getWeekList(bNo);
    this.getMonthList(bNo);
    this.getYearList(bNo);
    this.getDayList(bNo);
  },
  created() {
    this.groupDayStatsBySize();
  }
};
</script>
