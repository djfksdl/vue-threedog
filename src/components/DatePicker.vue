<template>
    <div>
        <Datepicker locale="ko" v-model="date" :inline="true" :enable-time-picker="false" :selectable="true"
            :showToolbar="false" :displayMode="'mdy'" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();
</script>

<style scoped>
</style>