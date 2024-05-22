<template>
  <div>
    <Datepicker
      locale="ko"
      v-model="date"
      format="yyyy-MM-dd"
      :enable-time-picker="false"
      :inline="true"
      :min-date="minDate"
      @update:model-value="onDateChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref(new Date());
const minDate = ref(new Date()); 

const onDateChange = (newDate) => {
  if (newDate) {
    const formattedDate = newDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    console.log('선택된 날짜:', formattedDate);
  }
};
</script>
