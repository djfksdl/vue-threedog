<template>
    <div id="wrap">
        <AppHeader />
        <div id="signup-box">
           
        </div><!-- signup-box -->
        <AppFooter />
    </div><!-- wrap -->
</template>

<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"

export default {
    name: "SignView",
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
