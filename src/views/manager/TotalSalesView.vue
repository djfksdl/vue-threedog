<template>
    <div>
      <ManagerHeader /> <!-- 매니저 헤더 컴포넌트 -->
  
      <!-- 일 매출통계 -->
      <div class="chart-container">
        <h2 class="chart-title">일 매출통계</h2> <!-- 그래프 제목 -->
        <canvas ref="dailyChartCanvas"></canvas> <!-- 일별 매출 그래프 -->
      </div>
  
      <!-- 주 매출통계 -->
      <div class="chart-container">
        <h2 class="chart-title">주 매출통계</h2> <!-- 그래프 제목 -->
        <canvas ref="weeklyChartCanvas"></canvas> <!-- 주별 매출 그래프 -->
      </div>
  
      <!-- 월 매출통계 -->
      <div class="chart-container">
        <h2 class="chart-title">월 매출통계</h2> <!-- 그래프 제목 -->
        <canvas ref="monthlyChartCanvas"></canvas> <!-- 월별 매출 그래프 -->
      </div>
  
      <!-- 년도별 매출통계 -->
      <div class="chart-container">
        <h2 class="chart-title">년도별 매출통계</h2> <!-- 그래프 제목 -->
        <canvas ref="yearlyChartCanvas"></canvas> <!-- 년도별 매출 그래프 -->
      </div>
  
      <ManagerFooter /> <!-- 매니저 푸터 컴포넌트 -->
    </div>
  </template>
  
  <script>
  import ManagerFooter from "@/components/ManagerFooter.vue";
  import ManagerHeader from "@/components/ManagerHeader.vue";
  import Chart from "chart.js/auto";
  
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
      };
    },
    methods: {
      // 각 기간별 매출 데이터를 가져오는 메서드
      fetchDailySales() {
        this.dailySales = [100, 200, 300, 400, 500, 600, 700]; // 예시 데이터
      },
      fetchWeeklySales() {
        this.weeklySales = [500, 600, 700, 800]; // 예시 데이터
      },
      fetchMonthlySales() {
        this.monthlySales = [1500, 1600, 1700, 1800, 1900, 2000]; // 예시 데이터
      },
      fetchYearlySales() {
        this.yearlySales = [18000, 19000, 20000, 21000, 22000]; // 예시 데이터
      },
      // 차트를 그리는 메서드
      drawChart(canvasRef, labels, data, backgroundColor, borderColor, label) {
        new Chart(canvasRef, {
          type: 'doughnut',
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
            }
          }
        });
      },
    },
    mounted() {
      // 각 그래프를 그립니다.
      this.drawChart(this.$refs.dailyChartCanvas, ['1일', '2일', '3일', '4일', '5일', '6일', '7일'], this.dailySales, 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)', '일별 매출');
      this.drawChart(this.$refs.weeklyChartCanvas, ['1주', '2주', '3주', '4주'], this.weeklySales, 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)', '주별 매출');
      this.drawChart(this.$refs.monthlyChartCanvas, ['1월', '2월', '3월', '4월', '5월', '6월'], this.monthlySales, 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 1)', '월별 매출');
      this.drawChart(this.$refs.yearlyChartCanvas, ['2021', '2022', '2023', '2024', '2025'], this.yearlySales, 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 1)', '년도별 매출');
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
  
  <style scoped>
  /* 그래프 컨테이너 스타일 */
  .chart-container {
      margin-top: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      display: flex; /* Flex 컨테이너로 설정 */
      justify-content: center; /* 가로 방향으로 가운데 정렬 */
      align-items: center; /* 세로 방향으로 가운데 정렬 */
      width: 100%; /* 부모 요소에 맞게 가로 너비를 100%로 설정 */
  }
  
  /* 그래프 제목 스타일 */
  .chart-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
  }
  
  </style>
  