<template>
    <div id="wrap">
        <ManagerHeader />
        <div id="reviewBoard">
            <div class="container">
                <h1>후기게시판</h1>
                <div class="reviewBoardContainerButton" style="border: 1px solid #dddddd; padding: 5px">
                    <button @click="recentOrder">최신순</button>
                    <button @click="viewOrder">조회수순</button>
                    <button @click="starGradeOrder" style="border-right: none;">평점순</button>
                    <!-- <input type="search" placeholder="검색어 입력" style="padding: 5px;  border: 1px solid #dddddd; 
                        width: 250px; height: 30px; margin-left: 850px;">
                    <i class="fas fa-search" style="position: absolute; padding-left: 1360px; padding-top: 7px"></i> -->
                </div>
                <div class="reviewBoardContainer" @click="reviewDetail(reviewVo.rNo)" v-bind:key="i"
                    v-for="(reviewVo, i) in reviewList">
                    <!--  -->
                    <div class="reviewCon03">
                        <div>
                            <!-- {{ reviewVo.saveName }} -->
                            <div class="mypetImgSlider">
                                <img  v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${reviewVo.saveName}`" style="width: 100px; height: 100px; border-radius: 50%;">
                            </div>
                        </div>
                        <div style="margin-top: 20px;">
                            <div>
                                <div class="userId"><strong>{{ reviewVo.uId }} </strong>님</div>
                                <div style="display: flex; margin-top: 5px ">
                                    <div class="cutInfor">{{ reviewVo.dogName }}({{ reviewVo.weight }}kg) </div>
                                    <div class="star" style="margin-top: 2px;">
                                        <!-- Full stars -->
                                        <span v-for="i in Math.floor(reviewVo.star)" :key="i"
                                            style="padding: none;"><img src="@/assets/images/star_yellow.jpg"
                                                style="width: 15px;"></span>
                                        <!-- Half star -->
                                        <!-- <span v-if="reviewVo2.star - Math.floor(reviewVo.star) >= 0.5">><img src="@/assets/images/star_ban.png" style="width: 15px;"></span> -->
                                        <!-- Empty stars -->
                                        <span v-for="i in 5 - Math.ceil(reviewVo.star)" :key="'empty_' + i"><img
                                                src="@/assets/images/star_gray.jpg" style="width: 15px;"></span>
                                        <!-- {{ reviewVo.star }}.0 -->
                                    </div>
                                    <div class="views">조회수 {{ reviewVo.views }}</div>
                                    <div class="date">{{ formatDate(reviewVo.rDate) }}</div>
                                </div>
                                <div class="context">
                                    {{ truncateContent(reviewVo.rContent) }}
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
                                <img v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${reviewVo2.saveName}`" style="width: 300px; height: 350px;">
                            </div>
                            <div>
                                <div class="userId"><strong>{{ reviewVo2.uId }}</strong>님</div>
                                <div style="display: flex;">
                                    <!-- <div class="beauty">zzzzzzzzzzzz</div> -->
                                    <div class="cutInfor">{{ reviewVo2.dogName }} ({{ reviewVo2.weight }}kg)
                                    </div>
                                    <div class="date">{{ formatDate(reviewVo2.rDate) }}</div>
                                </div>
                                <div style="display: flex;">
                                    <div class="price">{{ reviewVo2.expectedPrice.toLocaleString() }}원</div>

                                    <div class="star" style="margin-top: 3px;">
                                        <!-- Full stars -->
                                        <span v-for="i in Math.floor(reviewVo2.star)" :key="i"><img
                                                src="@/assets/images/star_yellow.jpg" style="width: 15px;"></span>
                                        <!-- Half star -->
                                        <!-- <span v-if="reviewVo2.star - Math.floor(reviewVo2.star) >= 0.5">><img src="@/assets/images/star_ban.png" style="width: 15px;"></span> -->
                                        <!-- Empty stars -->
                                        <span v-for="i in 5 - Math.ceil(reviewVo2.star)" :key="'empty_' + i"><img
                                                src="@/assets/images/star_gray.jpg" style="width: 15px;"></span>
                                    </div>
                                </div>

                                <div class="context">
                                    {{ reviewVo2.rContent }}
                                </div>
                            </div>
                        </div>
                        <div class="modal-btn">
                            <button @click="modalCheck = false" style="width: 200px;">닫기</button>
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
            selectedReview: null,
            reviewList: [],
            reviewVo: {
                rNo: 0,
                star: 0,
                rContent: "",
                rDate: "",
                views: 0,
                bNo: 1,
                uNo: "",
                uId: "",
                beauty: "",
                rsNo: 0,
                riNo: 0,
                dogName: "",
                dogNo: 0,
                weight: 0.0,
                expectedPrice: 0,
                saveName: "",
            },

            reviewVo2: {
                rNo: 0,
                star: 0,
                rContent: "",
                rDate: "",
                views: 0,
                bNo: 1,
                uNo: "",
                uId: "",
                beauty: "",
                rsNo: 0,
                riNo: 0,
                dogName: "",
                dogNo: 0,
                weight: 0.0,
                expectedPrice: 0,

            },
            saveNameList: [],

        };
    },
    methods: {

        //후기1개 가져오기
        getOneRList(rNo) {
            console.log("후기 1개 가져오기");
            console.log("리뷰", rNo, "선택함");
            axios({
                method: 'get', // put, post, delete                   
                url: `${this.$store.state.apiBaseUrl}/api/mypage/getonerlist`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { rNo: rNo }, //get방식 파라미터로 값이 전달
                responseType: 'json' //수신타입

            }).then(response => {
                console.log(response.data.apiData); //수신데이타
                this.reviewVo2 = response.data.apiData;
                console("후기1개만 가져와야된다~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log(this.reviewVo);
            }).catch(error => {
                console.log(error);
            });
        },

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
                this.reviewList = response.data.apiData;

                console.log(this.businessList);
            }).catch(error => {
                console.log(error);
            });
        },

        getSaveName(rNo) {
            console.log("후기사진 가져오기...............귀찮아...............");
            console.log(rNo);
            axios({
                method: 'get',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/getsavename`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { bNo: this.reviewVo.bNo },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("성공");
                console.log(response.data.apiData); //수신데이타
                this.reviewList = response.data.apiData;

                console.log(this.businessList);
            }).catch(error => {
                console.log(error);
            });
        },

        // 리뷰상세보기 모달창
        reviewDetail(rNo) {
            if (rNo) {
                this.selectedReview = this.reviewList.find((review) => review.rNo === rNo);
                if (this.selectedReview) {
                    this.updateViewCount(rNo);
                }
                this.modalCheck = true;
            }
            this.getOneRList(rNo);
            this.getSaveName(rNo);
        },


        // 조회수 업데이트
        updateViewCount(rNo) {
            console.log("조회수 1증가!!!");
            console.log(rNo);
            axios({
                method: 'post',  //put,post,delete
                url: `${this.$store.state.apiBaseUrl}/api/mypage/updateview`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { rNo: rNo },
                responseType: 'json' //수신타입
            }).then(response => {
                console.log("성공");
                console.log(response.data.apiData); //수신데이타
                this.reviewVo.views = response.data.apiData;
                this.getRList();


            }).catch(error => {
                console.log(error);
            });
        },

        // 날짜변환
        formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },

        // 리뷰글 미리보기
        truncateContent(content) {
            if (content.length > 100) {
                return content.substring(0, 100) + '...';
            } else {
                return content;
            }
        },

        // 최신순
        recentOrder() {
            console.log("최신순");
        },

        // 조회순
        viewOrder() {
            console.log("조회순");
        },
        
        // 별점순
        starGradeOrder() {
            console.log("별점순");
        }

    },

    created() {
        this.getRList();
        this.getSaveName();
    }
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
