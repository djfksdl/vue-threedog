<template>
    <div>
        <Datepicker locale="ko" v-model="date" :inline="true" :enable-time-picker="false" :selectable="true"
            :showToolbar="false" :displayMode="'mdy'"/>
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
    --dp-menu-border-color: none;
    --dp-primary-color:#236C3F;
    --dp-cell-border-radius: 50%;
}
.dp__instance_calendar{
    width: 500px;
}
.dp__action_row{
    visibility: hidden;
}
.dp__calendar_item{
    padding: 20px;
}

</style>