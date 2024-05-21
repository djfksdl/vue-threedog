<template>
    <div>
        <Datepicker locale="ko" v-model="date" :inline="true" :selectable="true" :show-toolbar="false"
            :enable-time-picker="false" :show-selected-date="false" />
    </div>

</template>

<script setup>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();
</script>

<style>
.dp__selection_preview {
    display: none;
}
</style>