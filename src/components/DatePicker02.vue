<template>
    <div>
        <Datepicker locale="ko" v-model="date" :inline="true" :selectable="true" :showToolbar="false"
            enable-time-picker="false"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();
</script>

<style>
.dp__theme_light {
    --dp-menu-border-color:none;
    --dp-primary-color: #236C3F;
    
    --dp-cell-border-radius: 50%;
}

.dp__instance_calendar {
    width: 500px;
    font-size: 20px;
    padding: 10px;
}

.dp__action_buttons {
    visibility: hidden;
}

.dp__calendar_item {
    padding: 10px;
}
.dp__button{
    width: 500px;
    height: 80px;
}
.dp__calendar_header_item{
    margin: 20px 0 20px 0;
}
:root{
    --dp-cell-size: 46px;
}
</style>