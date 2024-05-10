<template>
    <div id="wrap">
        <AppHeader />
        <div id="msignup-box">
           
        </div><!-- msignup-box -->
        <AppFooter />
    </div><!-- wrap -->
</template>

<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"

export default {
    name: "ManagerSignView",
    components: {
        AppFooter,
        AppHeader
    },
    data() {
        return {
        };
    },
    methods: {
        
    },
};
</script>

<style>

</style>
