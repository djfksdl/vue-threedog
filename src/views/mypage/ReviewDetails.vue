<template>
    <div id="wrap">
        <ManagerHeader />
        <div>

        </div>
        <ManagerFooter />
    </div><!-- wrap -->
</template>



<script>
import ManagerFooter from "@/components/ManagerFooter.vue"
import ManagerHeader from "@/components/ManagerHeader.vue"
import '@/assets/css/mypage/review.css'
export default {
    name: "ReviewDetail",
    components: {
        ManagerFooter,
        ManagerHeader,
    },
    data() {
        return {

        };
    },
    methods: {

    },
};
</script>