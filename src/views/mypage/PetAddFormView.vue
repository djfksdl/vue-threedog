<template>
    <div id="wrap">
        <AppHeader />
        <div class="sidebar">
            <div class="profile">
                <div class="profileImg">
                    <img src="@/assets/images/dog.jpg">
                </div>
                <div class="profileId">
                    <label>엄마</label> 님 <br>
                    <label>1500</label> P
                </div>
            </div>
            <div class="profilePet">
                <div>
                    <img src="@/assets/images/dog.jpg">
                    <label></label>
                </div>
                <div>
                    <img src="@/assets/images/dog.jpg">
                </div>
            </div>
        </div>
        <div class="container">

        </div>
        <AppFooter />
    </div><!-- wrap -->
</template>

<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
import "@/assets/css/mypage/mypage.css"

export default {
    name: "PetAddFormView",
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style></style>