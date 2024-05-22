<template>
    <div>
      <Datepicker
        class="a"
        locale="ko"
        v-model="date"
        :inline="true"
        :selectable="isSelectableDate"
        :show-toolbar="false"
        :enable-time-picker="false"
        :show-selected-date="false"
        :show-previous-month="false"
        :min-date="minDate"
        :year-range="[new Date().getFullYear(), new Date().getFullYear()]"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  
  const date = ref();

  const minDate = ref(new Date());
  </script>
  
  <script>
  export default {
    data() {
      return {
        date: new Date() // 현재 날짜를 기본 선택값으로 설정합니다.
      };
    },
    methods: {
      isSelectableDate(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 오늘 날짜의 시간을 00:00:00으로 설정합니다.
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0); // 선택한 날짜의 시간을 00:00:00으로 설정합니다.
        return selectedDate >= today;
      }
    }
  };
  </script>
  
  <style>
  .dp__selection_preview {
    display: none;
  }
  </style>
  