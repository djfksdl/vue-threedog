<template>
    <div>
        <Datepicker locale="ko" v-model="date" :inline="true" :selectable="true" :showToolbar="false" enable-time-picker="false"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();
</script>

<style>
/* 라이트 테마 설정 */
.dp__theme_light {
    --dp-menu-border-color: var(--dp-primary-color); /* 메뉴 테두리 색상 없음 */
    --dp-primary-color: #236C3F; /* 주 색상 설정 */
    --dp-cell-border-radius: 50%; /* 날짜 셀의 테두리 반지름 설정 */
}

/* 캘린더 인스턴스 스타일 */
.dp__instance_calendar {
    width: 500px; /* 캘린더 너비 */
    font-size: 20px; /* 폰트 크기 */
    padding: 10px; /* 패딩 */
}

/* 동작 버튼 스타일 */
.dp__action_buttons {
    visibility: hidden; /* 버튼 숨김 */
}

/* 캘린더 아이템 스타일 */
.dp__calendar_item {
    padding: 10px; /* 패딩 */
}

/* 버튼 스타일 */
.dp__button {
    width: 500px; /* 버튼 너비 */
    height: 80px; /* 버튼 높이 */
}

/* 캘린더 헤더 아이템 스타일 */
.dp__calendar_header_item {
    margin: 20px 0 20px 0; /* 위아래 여백 */
}

/* 전역 변수 설정 */
:root {
    --dp-cell-size: 46px; /* 셀 크기 설정 */
}
</style>
