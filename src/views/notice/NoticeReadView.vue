<template>
    <div>

        <AppHeader />



        <div id="noticeReadContentAll">

            <p id="noticeReadTitle">{{ noticeVo.title }}</p>

            <div id="noticeReadTopBottom">
                <div id="leftInformation">
                    <span id="noticeWriter">작성자</span>
                    <span id="noticeReadWriter">{{ noticeVo.uname }}</span>
                </div>

                <div id="rightInformation">
                    <span id="noticeRegDate">작성일</span>
                    <span id="noticeReadRegDate">{{ noticeVo.regDate }}</span>
                </div>
            </div>

            <p id="noticeReadContent" v-html="formatText"></p>

            <div id="btnGroup">
                <button id="btnGoToList" onclick="location.href='/announcements'">목록</button>
                <button id="btnDelete" v-if="this.$store.state.authUser.uName=='사이트 관리자'" @click="deleteNotice(noticeVo.no)">삭제</button>
                <button id="btnModify" v-if="this.$store.state.authUser.uName=='사이트 관리자'" @click="goToModifyPage(noticeVo.no)">수정</button>
            </div>

        </div>



        <AppFooter />

    </div>
</template>


<script>
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import '@/assets/css/notice/NoticeReadView.css';
import axios from 'axios';

export default {
    name: "NoticeReadView",
    components: {
        AppFooter,
        AppHeader
    },
    data() {
        return {
            noticeVo:{
                no:this.$route.params.no,
                title:"",
                uname:"",
                regDate:"",
                content:""
            }
        };
    },
    computed: {
        formatText() {
            return this.noticeVo.content.replace(/\n/g, '<br>');
        }
    },
    methods: {
        readOneNotice(){
            console.log("공지 하나 불러오기");

            axios({
                method: 'get', // put, post, delete                   
                url: `${this.$store.state.apiBaseUrl}/api/notice/read/`+this.noticeVo.no,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: {uName:this.noticeVo.uName}, //get방식 파라미터로 값이 전달
                //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타

                this.noticeVo=response.data.apiData;

            }).catch(error => {
                console.log(error);
            });
        },
        deleteNotice(no){
            console.log("삭제 버튼 클릭");

            axios({
                method: 'delete', // put, post, delete                   
                url: `${this.$store.state.apiBaseUrl}/api/notice/delete/`+no,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: {no}, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타

                if(response.data.result=="success"){
                    console.log("삭제 성공");

                    this.$router.push("/announcements");
                }else{
                    alert("삭제에 실패하였습니다.");
                    console.log(response.data.message);

                    this.$router.push("#");
                }

            }).catch(error => {
                console.log(error);
            });
        },
        goToModifyPage(no){
            console.log("수정폼으로 이동");

            location.href="/noticeModify/"+no;
        }
    },
    created() {
        this.readOneNotice();
    }
};
</script>

<style></style>