<template>
  <ManagerHeader /> <!-- 매니저 헤더 컴포넌트 -->
  <div class="total-container">

    <!-- 일 매출통계 -->
<div class="chart-container">
  <div style="display: flex;">
    <div>
      <canvas width="418" height="410" ref="dailyChartCanvas"></canvas> <!-- 일별 매출 그래프 -->
      <div class="total-sales">일별 매출 합계: {{ dailyTotal }}</div>
    </div>
    <!-- 엑셀 표 -->
    <div class="sales-table">
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>가위 컷</th>
            <th>부분 미용</th>
            <th>전체 미용</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sales, index) in dailySales" :key="index">
            <td>{{ index + 1 }}일</td>
            <td>{{ sales.scissor }}</td>
            <td>{{ sales.partial }}</td>
            <td>{{ sales.full }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

    <!-- 주 매출통계 -->
    <div class="chart-container">
      <canvas width="300" height="200" ref="weeklyChartCanvas"></canvas> <!-- 주별 매출 그래프 -->
      <div class="total-sales">주별 매출 합계: {{ weeklyTotal }}</div>
    </div>

    <!-- 월 매출통계 -->
    <div class="chart-container">
      <canvas width="621" height="200" ref="monthlyChartCanvas"></canvas> <!-- 월별 매출 그래프 -->
      <div class="total-sales">월별 매출 합계: {{ monthlyTotal }}</div>
    </div>

    <!-- 년도별 매출통계 -->
    <div class="chart-container">
      <canvas width="300" height="200" ref="yearlyChartCanvas"></canvas> <!-- 년도별 매출 그래프 -->
      <div class="total-sales">년도별 매출 합계: {{ yearlyTotal }}</div>
    </div>

     </div>
  <ManagerFooter /> <!-- 매니저 푸터 컴포넌트 -->
</template>

<script>
import ManagerFooter from "@/components/ManagerFooter.vue";
import ManagerHeader from "@/components/ManagerHeader.vue";
import Chart from "chart.js/auto";
import "@/assets/css/manager/totalsales.css";

export default {
  name: "TotalSalesView", // 컴포넌트 이름
  components: {
    ManagerFooter,
    ManagerHeader,
  },
  data() {
    return {
      dailySales: [ // 일별 매출 데이터 배열
        { scissor: 50, partial: 30, full: 20 },
        { scissor: 60, partial: 40, full: 25 },
        { scissor: 70, partial: 35, full: 30 },
        { scissor: 80, partial: 50, full: 35 },
        { scissor: 90, partial: 45, full: 40 },
        { scissor: 100, partial: 55, full: 50 },
        { scissor: 110, partial: 60, full: 55 }
      ],
      weeklySales: [], // 주별 매출 데이터 배열
      monthlySales: [], // 월별 매출 데이터 배열
      yearlySales: [], // 년도별 매출 데이터 배열
    };
  },
  computed: {
    // 매출 합계 계산
    dailyTotal() {
      return this.dailySales.reduce((total, sales) => total + sales.scissor + sales.partial + sales.full, 0);
    },
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
    // 각 기간별 매출 데이터를 가져오는 메서드
    fetchDailySales() {
      this.dailySales = [100, 200, 300, 400, 500, 600, 700]; //일
    },
    fetchWeeklySales() {
      this.weeklySales = [500, 600, 700, 800]; // 주
    },
    fetchMonthlySales() {
      this.monthlySales = [1500, 1600, 1700, 1800, 1900, 2000]; // 월
    },
    fetchYearlySales() {
      this.yearlySales = [18000, 19000, 20000, 21000, 22000]; // 년
    },
    // 차트를 그리는 메서드
    drawChart(canvasRef, labels, data, backgroundColor, borderColor, label, type) {
      new Chart(canvasRef, {
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
  },
  mounted() {
    // 각 그래프를 그립니다.
    this.drawChart(this.$refs.dailyChartCanvas, ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], this.dailySales, 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)', '일별 매출', 'bar');
    this.drawChart(this.$refs.weeklyChartCanvas, ['1주', '2주', '3주', '4주'], this.weeklySales, 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)', '주별 매출', 'line');
    this.drawChart(this.$refs.monthlyChartCanvas, ['1월', '2월', '3월', '4월', '5월', '6월'], this.monthlySales, 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 1)', '월별 매출', 'doughnut');
    this.drawChart(this.$refs.yearlyChartCanvas, ['2021', '2022', '2023', '2024'], this.yearlySales, 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 1)', '년도별 매출', 'bar');
  },
  created() {
    // 컴포넌트가 생성될 때 각 기간별 매출 데이터를 가져오는 메서드 호출
    this.fetchDailySales();
    this.fetchWeeklySales();
    this.fetchMonthlySales();
    this.fetchYearlySales();
  }
};
</script>