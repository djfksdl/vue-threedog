<template>
  <div id="reservationFormDatePicker">
    <div class="dateBox">
      <Datepicker locale="ko" v-model="date" format="yyyy-MM-dd" :enable-time-picker="false" :inline="true"
        :min-date="minDate" @update:model-value="onDateChange" />
    </div>

    
    <div class="time">
      <!-- <div>선택한 날짜 {{ reserveTime.rtDate }}</div> -->
      <div v-if="amTimes.length > 0">
        <p>오전</p>
        <div v-for="time in amTimes" :key="time.rtNo" style="display: inline-block;">
          <button type="button" :class="{ selected: isSelected(time.rtTime), disabled: time.rtFinish }"
            @click="toggleTime(time)" :disabled="time.rtFinish">
            {{ formatTime(time.rtTime) }}
          </button>
        </div>
      </div>
      <div v-if="pmTimes.length > 0">
        <p>오후</p>
        <div v-for="time in pmTimes" :key="time.rtNo" style="display: inline-block;">
          <button type="button" :class="{ selected: isSelected(time.rtTime), disabled: time.rtFinish }"
            @click="toggleTime(time)" :disabled="time.rtFinish">
            {{ formatTime(time.rtTime) }}
          </button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useRoute } from 'vue-router';



const store = useStore();
const date = ref(new Date());
const minDate = ref(new Date());

const reserveTime = ref({
  rtNo: 0,
  bNo: 0,
  rtDate: "",
  rtTime: "",
  rtFinish: false,
});

const route = useRoute(); // 현재 라우트 정보 가져오기

// 라우트 파라미터를 사용해 bNo 설정
reserveTime.value.bNo = route.params.bNo;


const reserveList = ref([]);
const amTimes = ref([]);
const pmTimes = ref([]);

const emit = defineEmits(['selectedDateTime']);


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
        amTimes.value = reserveList.value.filter(time => getTimePeriod(time.rtTime) === 'AM');
        pmTimes.value = reserveList.value.filter(time => getTimePeriod(time.rtTime) === 'PM');
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

// 시간대 (AM/PM) 판별 함수
const getTimePeriod = (timeString) => {
  const hour = parseInt(extractHourAndMinute(timeString).hour, 10);
  return hour < 12 ? 'AM' : 'PM';
};

// 시간 선택 함수
const toggleTime = (time) => {
  if (reserveTime.value.rtTime == time.rtTime) {
    reserveTime.value.rtTime = '';  // 선택 해제 (빈 문자열 할당)
    reserveTime.value.rtNo = 0;


  } else {
    reserveTime.value.rtTime = time.rtTime;  // 시간 선택
    reserveTime.value.rtNo = time.rtNo;      // rtNo 설정
    reserveTime.value.rtFinish = time.rtFinish;
    console.log(reserveTime.value.rtDate);
    console.log(time);
    console.log(reserveTime.value.rtNo);
    console.log(reserveTime.value.rtFinish);

    //부모한테 데이터전달
    emit('selectedDateTime', {
      newDate: reserveTime.value.rtDate, time: time.rtTime, rtNo: reserveTime.value.rtNo,
      rtFinish: reserveTime.value.rtFinish
    });
  }
};

const isSelected = (time) => {
  return reserveTime.value.rtTime == time;
};
</script>

<style>
#reservationFormDatePicker {
  display: flex;
  width: 1300px;
  margin: 0 auto;
}

#reservationFormDatePicker .disabled {
  color: gray;
  pointer-events: none;
}

#reservationFormDatePicker .dp__theme_light {
  --dp-menu-border-color: none;
  --dp-primary-color: #236C3F;
  --dp-cell-size: 46px;
  --dp-cell-border-radius: 50%;
}

#reservationFormDatePicker .dp__instance_calendar {
  width: 500px;
  font-size: 20px;
  padding: 10px;
  border-bottom: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-left: 11px;
}

#reservationFormDatePicker .dp__calendar_item {
  padding: 10px;
}

#reservationFormDatePicker .dp__calendar_header_item {
  margin: 20px 0 20px 0;
}

#reservationFormDatePicker .dp__action_button.dp__action_select {
  color: #236C3F;
  font-size: 0px;
  width: 420px;
  height: 40px;
  margin-right: 30px;
  margin-top: -13px;
  margin-bottom: 70px;
}

#reservationFormDatePicker .dp__action_button.dp__action_select::after {
  content: "날짜 선택";
  color: white;
  font-size: 18px;
  padding-left: 170px;
}

#reservationFormDatePicker .dp__selection_preview {
  color: white;
  font-size: 0px;
}

#reservationFormDatePicker .time {
  width: 800px;
  /* background-color: red; */
  margin: 100px 0 0 150px;
  height: 400px;
  /* margin: 70px 150px 0 300px; */
}

#reservationFormDatePicker .time p {
  margin: 23px;
}

#reservationFormDatePicker .time button {
  padding: 12px;
  margin: 8px;
  width: 110px;
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

#reservationFormDatePicker .time button.selected {
  background-color: #236C3F;
  color: white;
}
</style>
