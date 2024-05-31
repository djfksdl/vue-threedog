<template>
  <div id="reservationFormDatePicker">
    <div>
      <Datepicker locale="ko" v-model="date" format="yyyy-MM-dd" :enable-time-picker="false" :inline="true"
        :min-date="minDate" @update:model-value="onDateChange" />
    </div>
    <div class="time">
      <!-- {{ currentDate }} -->
      <!-- <p>오전</p>
      <p>오후</p> -->
      <p>시간선택~~~~</p>
      <div v-if="reserveList.length > 0">
        <div v-for="time in reserveList" :key="time" style="display: inline-block;">
          <button type="button" :class="{ selected: isSelected(time.rtTime), disabled: time.rtFinish }"
            @click="toggleTime(time.rtTime)">
            {{ formatTime(time.rtTime) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const store = useStore();
const date = ref(new Date());
const minDate = ref(new Date());

const reserveTime = ref({
  rtNo: 0,
  bNo: 1,
  rtDate: "",
  rtTime: "",
  rtFinish: false,
});

const reserveList = ref([]);

// // 현재 날짜를 업데이트하는 함수
// const getCurrentDate = () => {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, '0');
//   const day = String(now.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// // 초기에 현재 날짜 설정
// let currentDate = getCurrentDate();

// // 현재 날짜를 실시간으로 업데이트하기 위해 1일마다 getCurrentDate 함수를 호출하여 currentDate 변수 업데이트
// setInterval(() => {
//   currentDate = getCurrentDate();
// }, 86400000); // 1일은 86400000밀리초입니다.

// Datepicker에서 날짜가 변경될 때 실행되는 함수
const onDateChange = (newDate) => {
  if (newDate) {
    const formattedDate = newDate.toISOString().split('T')[0];
    reserveTime.value.rtDate = formattedDate;
    console.log('선택된 날짜:', reserveTime.value.rtDate);
    axios({
      method: 'get',
      url: `${store.state.apiBaseUrl}/api/mypage/gettimelist`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      params: { bNo: reserveTime.value.bNo, rtDate: reserveTime.value.rtDate },
      responseType: 'json'
    })
      .then(response => {
        console.log("성공");
        console.log(response.data.apiData);
        reserveList.value = response.data.apiData;
        console.log(reserveList.value);
      })
      .catch(error => {
        console.log(error);
      });
  }
  reserveTime.value.rtTime = '';

};

// 시간 형식을 시와 분으로 추출하는 함수
const extractHourAndMinute = (timeString) => {
  const [hour, minute] = timeString.split(':');
  return { hour, minute };
};

// 시간을 시:분 형식으로 포맷하는 함수
const formatTime = (timeString) => {
  const { hour, minute } = extractHourAndMinute(timeString);
  return `${hour}:${minute}`;
};

// 시간 선택 함수
const toggleTime = (time) => {
  console.log(time);
  if (reserveTime.value.rtTime === time) {
    reserveTime.value.rtTime = '';  // 선택 해제 (빈 문자열 할당)
  } else {
    reserveTime.value.rtTime = time;  // 시간 선택
  }
};

const isSelected = (time) => {
  return reserveTime.value.rtTime === time;
};


</script>


<style>
#reservationFormDatePicker {
  display: flex;
}

#reservationFormDatePicker .disabled {
  background-color: gray;
  color: gray;
  pointer-events: none;
}

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
  color: white;
  font-size: 16px;
  padding: 20px;
}

#reservationFormDatePicker .dp__selection_preview {
  color: white;
}






#reservationFormDatePicker .time {
  width: 500px;
  height: 400px;
  /* background-color: red; */
  margin: 70px 150px 0 120px;

}

#reservationFormDatePicker .time p {
  margin: 23px;
}

#reservationFormDatePicker .time button {
  padding: 12px;
  margin: 8px;
  width: 100px;
  background-color: white;
  border: 1px solid #236C3F;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

#reservationFormDatePicker .time button:hover {
  background-color: #236C3F;
  color: white;
}
</style>
