<template>
    <div>

        <AppHeader/>



        <div>

            <div id="modifyFormContentAll">

                <form action="" method="" v-on:submit.prevent="modifyNotice">

                    <div id="formGroup">
                        <label id="titleGroup" for="noticeModifyTitle">제목</label>
                        <input id="noticeModifyTitle" type="text" name="title" placeholder="제목을 입력해 주세요" v-model="noticeVo.title">
                    </div>

                    <div id="notModifyPart">
                        <div class="writerGroup">
                            <span id="titleGroup">작성자</span>
                            <span id="noModifyInfo">{{ noticeVo.uname }}</span>
                        </div>

                        <div class="dateGroup">
                            <span id="titleGroup">작성일</span>
                            <span id="noModifyInfo">{{ noticeVo.regDate }}</span>
                        </div>
                    </div>

                    <div id="formGroup" class="contentAll">
                        <label id="titleGroup" for="noticeModifyContent">내용</label>
                        <textarea id="noticeModifyContent" name="content" placeholder="내용을 입력해 주세요" v-model="noticeVo.content"></textarea>
                    </div>

                    <div id="btnGroup">
                        <button id="cancelBtn" type="button" @click="goToRead">취소</button>

                        <button id="modifyBtn" type="submit">수정</button>
                  </div>

                </form>

            </div>

        </div>


        
        <AppFooter/>

    </div>
</template>


<script>
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import '@/assets/css/notice/NoticeModifyView.css';
import axios from 'axios';

export default {
    name: "NoticeModifyView",
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
    methods: {
        readOneNotice(){
            console.log("공지 하나 불러오기");

            axios({
                method: 'get', // put, post, delete                   
                url: 'http://localhost:9010/api/notice/read/'+this.noticeVo.no,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타

                this.noticeVo=response.data.apiData;

            }).catch(error => {
                console.log(error);
            });
        },
        modifyNotice(){
            console.log("수정하기");

            axios({
                method: 'put', // put, post, delete                   
                url: 'http://localhost:9010/api/notice/modify',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: this.noticeVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타

                 if(response.data.result=="success"){
                     console.log("성공");

                     this.$router.push("/noticeRead/"+this.$route.params.no);
                 }else{
                     console.log(response.data.message);

                     this.$router.push("/announcements");
                 }
                
            }).catch(error => {
                console.log(error);
            });
        },
        goToRead(){
            location.href="/noticeRead/"+this.noticeVo.no;
        }
    },
    created() {
        this.readOneNotice();
    }
};
</script>

<style></style>