<template>
    <div>
      <Datepicker
        locale="ko"
        v-model="date"
        format="yyyy-MM-dd"
        :enable-time-picker="false"
        :inline="true"
        :min-date="minDate"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  
  const date = ref(null);
  const minDate = ref(new Date()); 
  
  // watch를 사용하여 date가 업데이트될 때마다 동작 수행
  watch(date, (newDate) => {
    if (newDate) {
      const formattedDate = newDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
      console.log('선택된 날짜:', formattedDate);
    }
  });
  </script>
  