<template>
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
                <div class="profilePetBox">
                    <div class="profileTitle">
                        <p>반려견</p>
                        <router-link to="/petaddform">➕</router-link>
                    </div>
                    <div class="profilePet">
                        <img src="@/assets/images/dog.jpg">
                        <p>dddd(3세)</p>
                    </div>
                    <div class="profilePet">
                        <img src="@/assets/images/dog.jpg">
                        <p>마리(3세)</p>
                    </div>
                </div>
            </div>
</template>

<script>
import '@/assets/css/mypage/sidebar.css'
export default {
    name: "SideBar",
    components: {
    },

    data() {
        return {
        };
    },
    methods: {

    },
};
</script>

<style></style>
