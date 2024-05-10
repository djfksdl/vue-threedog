<template>
    <div id="wrap">

        <AppHeader />

        <div id="reviewAddForm">
            <div class="sidebar">
                <div class="profile">
                    <div class="profileImg">
                        <img src="@/assets/images/dog2.jpg">
                    </div>
                    <div class="profileId">
                        <label>dddddd</label> 님 <br>
                        <label>1500</label> P
                    </div>
                </div>
                <div class="profileTitle">
                    <p>반려견</p>
                    <button type="button">+</button>
                </div>
                <div class="profilePet">
                    <img src="@/assets/images/dog.jpg">
                    <p>마리(3세)</p>
                </div>
                <div class="profilePet">
                    <img src="@/assets/images/dog.jpg">
                    <p>마리(3세)</p>
                </div>
            </div>
            <div class="container">
                
            </div>
        </div>
        <AppFooter />
    </div><!-- wrap -->
</template>

<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"

export default {
    name: "ReviewFormView",
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