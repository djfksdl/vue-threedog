<template>
  <div class="cal02">
    <Datepicker
      class="a"
      locale="ko"
      v-model="date"
      format="yyyy-MM-dd"
      :inline="true"
      :selectable="isSelectableDate"
      :show-toolbar="false"
      :enable-time-picker="false"
      :show-selected-date="false"
      :show-previous-month="false"
      :min-date="minDate"
      @update:modelValue="handleDateUpdate"
    >
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
}

.cal02 .dp__selection_preview {
  display: none;
}

.cal02 .dp__action_button {
  display: none;
}

.cal02 .dp__action_button {
  width: 100px;
  height: 40px;
  font-size: 16px;
  display: block;
  margin-right: 200px;
}
</style>
