<template>
    <div id="wrap">
        <ManagerHeader />
        <div id="reviewCon">
            <div class="container">
                <h1>후기게시판</h1>
                <div class="filter">
                    <button>최신순</button>
                    <button>리뷰높은순</button>
                    <button>리뷰낮은순</button>
                </div>
               
                <div class="reviewCon03">
                    <div>
                        <!-- <p>마리</p> -->
                        <div class="mypetImgSlider">
                            <img src="@/assets/images/r1.jpg">
                            <!-- <img src="@/assets/images/dog2.jpg"> -->
                        </div>
                    </div>
                    <div>
                        <div class="cutName">가위컷 </div>
                        <div class="date">2024.05.14(화)</div>
                        <div class="cutInfor">마리(3.2kg) 59,000원 ⭐⭐⭐⭐⭐</div>
                        <div class="context">
                            첫 번째로 소개해드릴 곳은 경기도 구리시 인창동에 위치한 애견미용실 '레몬이네그루밍샵' 이에요.

                            이곳은 오픈형 구조로 되어있으며, 가위컷을전문으로 하고 있어요.
                            다만, 일반적으로 오픈형 애견미용실같은 경우 창문 너머로 반려견을 지켜볼 경우, 보호자님을 보고 강아지가 흥분하거나 뛰어내리는 등 안전문제가 발생할 수 있으니 잠시 자리를 비워두시는 게 좋다고 해요.

                            더불어 강아지 스파&팩도 가능하며, 소형견은 물론 중형견, 대형견까지 모두 미용 가능한 곳이에요.

                            특히나 웰시코기는 털부자로 유명하죠? 주기적으로 털관리를 해줘야하는 아이들인데, 후기를 남겨주신 코기 보호자님께서 강력 추천을 해주신 곳이에요:)
 
                        </div>
                    </div>
                </div>
                <div class="reviewCon03">
                    <div>
                        <!-- <p>마리</p> -->
                        <div class="mypetImgSlider">
                            <img src="@/assets/images/r1.jpg">
                            <!-- <img src="@/assets/images/dog2.jpg"> -->
                        </div>
                    </div>
                    <div>
                        <div class="cutName">가위컷 </div>
                        <div class="date">2024.05.14(화)</div>
                        <div class="cutInfor">마리(3.2kg) 59,000원 ⭐⭐⭐⭐⭐</div>
                        <div class="context">
                            첫 번째로 소개해드릴 곳은 경기도 구리시 인창동에 위치한 애견미용실 '레몬이네그루밍샵' 이에요.

                            이곳은 오픈형 구조로 되어있으며, 가위컷을전문으로 하고 있어요.
                            다만, 일반적으로 오픈형 애견미용실같은 경우 창문 너머로 반려견을 지켜볼 경우, 보호자님을 보고 강아지가 흥분하거나 뛰어내리는 등 안전문제가 발생할 수 있으니 잠시 자리를 비워두시는 게 좋다고 해요.

                            더불어 강아지 스파&팩도 가능하며, 소형견은 물론 중형견, 대형견까지 모두 미용 가능한 곳이에요.

                            특히나 웰시코기는 털부자로 유명하죠? 주기적으로 털관리를 해줘야하는 아이들인데, 후기를 남겨주신 코기 보호자님께서 강력 추천을 해주신 곳이에요:)
 
                        </div>
                    </div>
                </div>
                <div class="reviewCon03">
                    <div>
                        <!-- <p>마리</p> -->
                        <div class="mypetImgSlider">
                            <img src="@/assets/images/r1.jpg">
                            <!-- <img src="@/assets/images/dog2.jpg"> -->
                        </div>
                    </div>
                    <div>
                        <div class="cutName">가위컷 </div>
                        <div class="date">2024.05.14(화)</div>
                        <div class="cutInfor">마리(3.2kg) 59,000원 ⭐⭐⭐⭐⭐</div>
                        <div class="context">
                            첫 번째로 소개해드릴 곳은 경기도 구리시 인창동에 위치한 애견미용실 '레몬이네그루밍샵' 이에요.

                            이곳은 오픈형 구조로 되어있으며, 가위컷을전문으로 하고 있어요.
                            다만, 일반적으로 오픈형 애견미용실같은 경우 창문 너머로 반려견을 지켜볼 경우, 보호자님을 보고 강아지가 흥분하거나 뛰어내리는 등 안전문제가 발생할 수 있으니 잠시 자리를 비워두시는 게 좋다고 해요.

                            더불어 강아지 스파&팩도 가능하며, 소형견은 물론 중형견, 대형견까지 모두 미용 가능한 곳이에요.

                            특히나 웰시코기는 털부자로 유명하죠? 주기적으로 털관리를 해줘야하는 아이들인데, 후기를 남겨주신 코기 보호자님께서 강력 추천을 해주신 곳이에요:)
 
                        </div>
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