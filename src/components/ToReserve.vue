<template>
    <div>
        <!-- 예약버튼 -->
        <router-link to="#" class="toReserveFrom" v-on:click="goReserve" :class="{ 'show': showButton }">
            <!-- :class(디렉티브) :showButton이 true일때 show를 추가하고 flase일때는 show클래스를 제거 -->
            <div class="goReForm"><img src="@/assets/images/calendar.png"></div>
        </router-link>
    </div>
</template>
<script>
export default {
    name: "TopButton",
    components: {},
    data() {
        return {
            showButton:false
        };
    },
    methods: {
        scrollToTop(){
            // console.log("페이지 맨위로")
            window.scrollTo({
                top:0,
                behavior:"smooth"
            });
        },
        handleScroll(){
            //현재 스크롤 위치 확인 //현재 스크롤 위치를 가져오는 2가지방법인데, 둘중 하나라도 존재하면 변수에 할당됨. 2가지 차이는 브라우저마다 작용하는게 달라서(크로스브라우징)
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop; 

            //일정 높이 이상 스크롤 되었는지 확인
            if(scrollPosition > 200){
                this.fadeIn();
            }else{
                this.fadeOut();
            }
        },
        fadeIn() {
            const reserveButton  = document.querySelector('.toReserveFrom');
            reserveButton .style.transition = 'opacity 0.3s ease';
            reserveButton .style.opacity = '1';
        },
        fadeOut() {
            const reserveButton  = document.querySelector('.toReserveFrom');
            reserveButton .style.transition = 'opacity 0.3s ease';
            reserveButton .style.opacity = '0';
        },
        goReserve(){
            console.log("예약 버튼을 눌렀을때");
            this.$router.push(`/reservationform/${this.$route.params.bNo}`);
            
        }
        
    },
    created(){

    },
    mounted(){
        this.handleScroll(); //페이지 로드시 한번 호출하여 초기 상태 설정
        window.addEventListener("scroll", this.handleScroll);
    },
    unmounted() {
        // 컴포넌트 파기 시 스크롤 이벤트 리스너 제거
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>
<style>
.toReserveFrom .goReForm >img{
    width: 40px;
    margin-top: 6px;
}
</style>