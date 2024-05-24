<template>
    <div id="wrap">
        <ManagerHeader />
        <div id="reviewBoard">
            <div class="container">
                <h1>후기게시판</h1>
                <div class="reviewBoardContainerButton" style="border: 1px solid #dddddd; padding: 5px">
                    <button>최신순</button>
                    <button>조회수순</button>
                    <button style="border-right: none;">평점순</button>
                    <!-- <input type="search" placeholder="검색어 입력" style="padding: 5px;  border: 1px solid #dddddd; 
                        width: 250px; height: 30px; margin-left: 850px;">
                    <i class="fas fa-search" style="position: absolute; padding-left: 1360px; padding-top: 7px"></i> -->
                </div>
                <div class="reviewBoardContainer" @click="reviewDetail" v-bind:key="i"
                    v-for="(reviewVo, i) in reviewList">
                    <div class="reviewCon03">
                        <div>
                            <!-- <p>마리</p> -->
                            <div class="mypetImgSlider">
                                <img src="@/assets/images/r1.jpg"
                                    style="width: 100px; height: 100px; border-radius: 50%;">
                            </div>
                        </div>
                        <div style="margin-top: 20px;">
                            <div>
                                <div class="userId"><strong>작성자 </strong>님</div>
                                <div style="display: flex; margin-top: 5px ">
                                    <div class="cutInfor">마리(3.2kg) </div>
                                    <div class="star">⭐⭐⭐⭐⭐</div>
                                    <div class="views">조회수 3</div>
                                    <div class="date">2024.05.14</div>
                                </div>
                                <div class="context">
                                    더불어 강아지 스파&팩도 가능하며, 소형견은 물론 중형견, 대형견까지 모두 미용 가능한 곳이에요.
                                </div>
                                <p
                                    style="text-align: right; margin-left: 830px; margin-top: 10px; width: 300px; font-weight: bold; color: gray;">
                                    상세보기 >
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="modal-wrap" v-show="modalCheck">
                    <div class="modal-container">

                        <div class="reviewBoardDetailContainer">
                            <div class="reviewDetailImg">
                                <img src="@/assets/images/r1.jpg" style="width: 300px; height: 350px;">
                            </div>
                            <div>
                                <div class="userId"><strong>작성자 </strong>님</div>
                                <div style="display: flex;">
                                    <div class="beauty">가위컷</div>
                                    <div class="cutInfor">마리(3.2kg) </div>
                                    <div class="date">2024.05.14</div>
                                </div>
                                <div style="display: flex;">
                                    <div class="price">59,000원</div>
                                    <div class="star">⭐⭐⭐⭐⭐</div>
                                </div>
                                <div class="context">
                                    첫 번째로 소개해드릴 곳은 경기도 구리시 인창동에 위치한 애견미용실 '레몬이네그루밍샵' 이에요.
                                    이곳은 오픈형 구조로 되어있으며, 가위컷을전문으로 하고 있어요.
                                    다만, 일반적으로 오픈형 애견미용실같은 경우 창문 너머로 반려견을 지켜볼 경우, 보호자님을 보고 강아지가 흥분하거나 뛰어내리는 등 안전문제가 발생할 수
                                    있으니 잠시
                                    자리를
                                    비워두시는 게 좋다고 해요.
                                    더불어 강아지 스파&팩도 가능하며, 소형견은 물론 중형견, 대형견까지 모두 미용 가능한 곳이에요.
                                    특히나 웰시코기는 털부자로 유명하죠? 주기적으로 털관리를 해줘야하는 아이들인데, 후기를 남겨주신 코기 보호자님께서 강력 추천을 해주신 곳이에요:)
                                </div>
                            </div>
                        </div>

                        <div class="modal-btn">
                            <button @click="reviewDetail" style="width: 200px;">닫기</button>
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
import axios from "axios";
import '@/assets/css/mypage/review.css'
export default {
    name: "ReviewView",
    components: {
        ManagerFooter,
        ManagerHeader,
    },
    data() {
        return {
            modalCheck: false,
            reviewList: [],
            reviewVo: {
                star: 0,
                rContent: "",
                rDate: "",
                views: 0,
                bNo: 1,
                uNo: "",
                saveName: "",
                uName: "",
                beauty: "",

            },

        };
    },
    methods: {

        //후기리스트
        getRList() {
            console.log("후기리스트 가져오기");
            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/getRList`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { bNo: this.reviewVo.bNo },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("성공");
                console.log(response.data.apiData); //수신데이타
                this.businessVo = response.data.apiData;

                console.log(this.businessList);
            }).catch(error => {
                console.log(error);
            });
        },
        // 리뷰상세보기 모달창
        reviewDetail() {
            console.log("리뷰상세보기클릭");
            this.modalCheck = !this.modalCheck;
        }

    },
};
</script>
<style>
#reviewBoard .modal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

/* modal or popup */
#reviewBoard .modal-container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
}

#reviewBoard .modal-btn {
    text-align: right;
}

#reviewBoard .modal-btn button {
    padding: 15px;
    border: none;
    font-size: 18px;
    border-radius: 20px;
    background-color: rgb(29, 29, 175);
    color: white;
}

#reviewBoard .modal-btn button:hover {
    cursor: pointer;
}
</style>
