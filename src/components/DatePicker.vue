<template>
    <div>
        <Datepicker locale="ko" v-model="date" :inline="true" :selectable="true" :showToolbar="false"
            :displayMode="'mdy'" />
        <!-- 옵션 시간 안보이게하기
            :enable-time-picker="false"
            -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();
</script>

<style>
/* 캘린더 */

.dp__theme_light {
    /* --dp-menu-border-color: #a7a4a4; */
    --dp-menu-border-color:none;
    --dp-primary-color: #236C3F;
    
    --dp-cell-border-radius: 50%;
}

.dp__instance_calendar {
    width: 500px;
    font-size: 20px;
    padding: 10px;
}

/* select Button */
.dp__action_buttons {
    visibility: hidden;
}

.dp__calendar_item {
    padding: 10px;
}
.dp__button{
    /* background-color: #236C3F; */
    width: 500px;
    height: 80px;
}
.dp__calendar_header_item{
    margin: 20px 0 20px 0;
}
</style>