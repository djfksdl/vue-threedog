<template>
    <div id="wrap">
        <ManagerHeader />
        <!-- 타이틀 -->
        <!-- <div class="eTitle">
            <h1>타이틀</h1>
            <p>부제목이 들어갈 자리</p>
        </div> -->
        <div class="reviewSum">
            총 30개의 글
        </div>
        <div class="ReviewContainer">
            <div>
                <img src="@/assets/images/r1.jpg" style="width: 270px;height: 400px;">
                <p><strong class="cutName">가위컷</strong></p>
                <p><i class="cutInfor">2024/05/13 강쥐 58,000원 (2.3kg)</i></p>
                <div class="reContext">
                    <div class="reContextTitle">귀여운 비포 바야바같은 모습의 이브이 정말 비교되는 모습이네요. ㅋㅋ</div>
                    <div class="reContextContext">
                        강남애견미용 필스타는 강남 지역에서 10년이되었다고 하는데요. 미용 전에 상담도 친절하게 잘 해주셨고, 미용 후에도 아이가
                        얼굴쪽에 굉장히 예민해서 커트를 더 깔끔하게 못했다고 이야기해 주셨는데, 사실 아이가 스트레스 받지 않도록 예뻐해 주시면서 미용을 진행했는지가 더 중요하기 때문에 결과는
                        전문가의 눈에서는 깔끔하지 않았다고 하는데 일반인인 저의 눈에서는 완벽한 말티푸 가위컷 이었어요. ㅎㅎ
                    </div>
                </div>
            </div>



        </div>
        <ManagerFooter />
    </div><!-- wrap -->

</template>



<script>
import ManagerFooter from "@/components/ManagerFooter.vue"
import ManagerHeader from "@/components/ManagerHeader.vue"
import '@/assets/css/mypage/review.css'
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