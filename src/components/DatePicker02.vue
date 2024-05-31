<template>
  <div class="cal02">
    <Datepicker class="a" locale="ko" v-model="date" format="yyyy-MM-dd" :inline="true" :selectable="isSelectableDate"
      :show-toolbar="false" :enable-time-picker="false" :show-selected-date="false" :show-previous-month="false"
      :min-date="minDate" @update:modelValue="handleDateUpdate">
      <button class="dp__action_button" @click="handleButtonClick">조회</button>
    </Datepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref(new Date());
const minDate = ref(new Date());

const emit = defineEmits(['selectedDate', 'customAction']);

const handleDateUpdate = (newDate) => {
  if (newDate) {
    const formattedDate = newDate.toISOString().split('T')[0];
    // const formattedDate = newDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    console.log('선택한 날짜:', formattedDate);
    emit('selectedDate', formattedDate);
  }
};

const isSelectableDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};

const handleButtonClick = () => {
  console.log('사용자 정의 액션 버튼 클릭됨');
  emit('customAction');
};
</script>

<style>
.cal02 {
  transform: scale(0.9);
  margin-top: -40px;
  height: 494px;
  position: relative; 
}

.cal02 .dp__selection_preview {
  display: none;
}

.cal02 .dp__action_button {
  display: none;
}

.cal02 .dp__action_button {
  width: 100px;
  height: 45px;
  font-size: 16px;
  display: block;
  margin-right: 200px;
}

.cal02 .dp__action_button.dp__action_select {
  color: #236C3F;
  font-size: 0px;
}

.cal02 .dp__action_button.dp__action_select::after {
  content: "선택";
  font-size: 17px;
  color: white;
  padding: 5px;
}

.cal02 .dp__theme_light {
  /* --dp-menu-border-color: #a7a4a4; */
  --dp-menu-border-color: none;
  --dp-primary-color: #236C3F;

  --dp-cell-border-radius: 50%;
}

.cal02 .dp__instance_calendar {
  width: 500px;
  font-size: 18px;
  padding: 10px;
}

.cal02 .dp__calendar_item {
  padding: 10px;
}

.cal02 .dp__calendar_header_item {
  margin: 30px 0 20px 0;
}
</style>
