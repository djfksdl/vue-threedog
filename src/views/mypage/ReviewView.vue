<template>
    <template>
        <div id="wrap">
            <ManagerHeader />








        <ManagerFooter />
        </div><!-- wrap -->

    </template>

</template>


<script>
import ManagerFooter from "@/components/ManagerFooter.vue"
import ManagerHeader from "@/components/ManagerHeader.vue"
export default {
    name: "ReviewView",
    components: {
        ManagerFooter,
        ManagerHeader
    },
    data() {
        return {

        };
    },
    methods: {

    },
};
</script>