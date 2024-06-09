<template>
    <div class="mfooter" v-show="shopInfo">
        <div class="mfooterWrap">
            <!-- 푸터 윗부분 -->
            <div class="mfooterTop">
                <!-- 푸터 정보 -->
                <div class="mfotterInfo">
                    <p>{{ shopInfo.bZipCode || '' }} {{ shopInfo.bAddress || '' }} {{ shopInfo.bdAddress || '' }}</p>
                    <div>
                        <p>대표자 : {{ shopInfo.bMaster || '가게 생성 후 표시됩니다.' }}</p>
                        <p>사업자등록번호 : {{ shopInfo.bNum || '가게 생성 후 표시됩니다.' }}</p>
                        <p>전화번호 : {{ shopInfo.bPhone || '가게 생성 후 표시됩니다.' }}</p>
                    </div>
                </div>
                <!-- 푸터 sns -->
                <div class="mfooterSns">
                    <a href="https://www.youtube.com/@mujimakji"><img src="@/assets/images/footer_sns_instargram.png"></a>
                    <a href="https://www.youtube.com/@mujimakji"><img src="@/assets/images/footer_sns_kakao.png"></a>
                    <a href="https://www.youtube.com/@mujimakji"><img src="@/assets/images/footer_sns_youtobe.png"></a>
                    <a href="https://www.youtube.com/@mujimakji"><img src="@/assets/images/footer_sns_facebook.png"></a>
                </div>
            </div>
            
            <!-- 푸터 아래부분 -->
            <div class="mfooterBtm">
                <p>Copyright 2020-2024 {{ shopInfo.title || '' }}Corp. All Rights Reserved.</p>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/css/headerFooter/mfooter.css"
import axios from 'axios';
export default {
    name: "ManagerFooter",
    components: {},
    data() {
        return {
            // bNo: this.$route.params.bNo,
            bNo: this.$route.params.bNo || this.$store.state.auth.bNo,
            shopInfo: {},
        };
    },
    methods: {
        //푸터 불러오기
        getShopInfo(){
            console.log("푸터 정보 불러오기");

            axios({
                method: 'get', // put, post, delete 
                url: `${this.$store.state.apiBaseUrl}/api/su/shopInfo`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: {bNo: this.bNo}, //get방식 파라미터로 값이 전달
                // data: this.userVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {

                this.shopInfo = response.data.apiData.shopInfo || {};
                console.log("this.shopInfo");
                console.log(this.shopInfo);
             

            }).catch(error => {
                console.log(error);
            });
        }
    },
    created() { 
        this.getShopInfo()
    }
};
</script>