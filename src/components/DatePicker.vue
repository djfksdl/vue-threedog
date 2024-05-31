<template>
  <div id="reservationFormDatePicker">
    <Datepicker locale="ko" v-model="date" format="yyyy-MM-dd" :enable-time-picker="false" :inline="true"
      :min-date="minDate" @update:model-value="onDateChange" />
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
    const formattedDate = newDate.toISOString().split('T')[0];
    console.log('선택된 날짜:', formattedDate);

  }
};
</script>
<style>
#reservationFormDatePicker .dp__theme_light {
  /* --dp-menu-border-color: #a7a4a4; */
  --dp-menu-border-color: none;
  --dp-primary-color: #236C3F;

  --dp-cell-border-radius: 50%;
}

#reservationFormDatePicker .dp__instance_calendar {
  width: 500px;
  font-size: 20px;
  padding: 10px;
}

/* select Button */
/* .dp__action_buttons {
    visibility: hidden;
} */

#reservationFormDatePicker .dp__calendar_item {
  padding: 10px;
}

#reservationFormDatePicker .dp__button {
  /* background-color: #236C3F; */
  width: 500px;
  height: 80px;
}

#reservationFormDatePicker .dp__calendar_header_item {
  margin: 20px 0 20px 0;
}

#reservationFormDatePicker :root {
  --dp-cell-size: 46px;
}

#reservationFormDatePicker .dp__action_button.dp__action_select {
  color: #236C3F;
  font-size: 0px;
}

#reservationFormDatePicker .dp__action_button.dp__action_select::after {
  content: "선택";
  font-size: 17px;
  color: white;
  padding: 5px;
}
</style>
