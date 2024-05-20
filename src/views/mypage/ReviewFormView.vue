<template>
    <div id="wrap">
        <AppHeader />
        <div id="reviewAddForm">
            <SideBar />
            <div class="container">
                <h1>후기등록</h1>
                <form>
                    <h2>평점을 선택해주세요</h2>
                    <!-- {{ this.$store.state.authUser.uNo }} -->
                    <!-- 별점 -->
                    <div class="star-rating">
                        <div class="star" v-for="index in 5" :key="index" @click="check(index)">
                            <span v-if="index < reviewVo.star" class="yellowStar"><img
                                    src="@/assets/images/star_yellow.jpg"></span>
                            <span v-if="index >= reviewVo.star" class="grayStar"><img
                                    src="@/assets/images/star_gray.jpg"></span>
                        </div>
                        <div class="reviewScore">
                            <p v-if="reviewVo.star > 0"> {{ reviewVo.star - 1 }}.0 </p>
                            <p v-else>{{ reviewVo.star }}.0 </p>
                        </div>
                    </div>


                    <!-- 후기메모 -->
                    <div class="reviewWrite">
                        <h2>후기작성</h2>
                        <textarea v-model="reviewVo.rContent" placeholder="남겨신 후기는 다른 고객들에게 큰 도움이 됩니다."
                            @input="checkByte"></textarea>
                        <div class="add_area">
                            <p class="txt_count">
                                <span id="chk_byte">{{ byteCount }}</span>/<span class="maximum">500자</span>
                            </p>
                        </div>
                    </div>


                    <!-- 리뷰사진 -->
                    <div class="reviewPhoto">
                        <div class="reviewPhoto2">
                            <h2>사진등록</h2>
                            <div class="pull">포토후기 작성하면 <p> 1000P </p>지급!</div>
                        </div>
                        <p class="pBox1">* 사진은 최대 3장까지 첨부할수있습니다.</p>


                        <!-- 이미지 미리보기 -->
                        <div id='image_preview'>
                            <input type='file' id='btnAtt' multiple='multiple' style="margin: 20px 0 0 20px;">
                            <div id='att_zone' data-placeholder='파일을 첨부 하려면 파일 선택 버튼을 클릭하거나 파일을 드래그앤드롭 하세요'></div>
                        </div>
                    </div>

                    <!-- 전송버튼 -->
                    <div class="submitBtn">
                        <button type="submit">저장하기</button>
                    </div>

                </form>
            </div>
        </div>
        <TopButton />
        <AppFooter />
    </div><!-- wrap -->
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import TopButton from "@/components/TopButton.vue";
import SideBar from "@/components/SideBar.vue";

import "@/assets/css/mypage/mypage.css";

export default {
    name: "ReviewFormView",
    components: {
        TopButton,
        AppHeader,
        AppFooter,
        SideBar,
    },
    data() {
        return {
            reviewVo: {
                star: 0, //별점
                rContent: "", //후기내용
                rNo:0,
                bNo:0,
                uNo: this.$store.state.authUser.uNo,
                rDate: "",
                saveName:"",

            },
            byteCount: 0, // 후기내용의 바이트수
        };
    },
    methods: {
        // 별점점수
        check(index) {
            this.reviewVo.star = index + 1;
        },

        // 후기작성 바이트수
        checkByte() {
            this.byteCount = this.reviewVo.rContent.length;
        },
    },
    mounted() {

        // imageView 함수를 호출하여 이미지 업로드 및 미리보기를 설정
        (function imageView(att_zone, btn) {
            var attZone = document.getElementById(att_zone);
            var btnAtt = document.getElementById(btn);
            var sel_files = [];


            // 이미지와 체크박스를 감싸고 있는 div속성 
            var div_style = 'display:inline-block;position:relative;width:200px;height:200px;margin:5px;border:1px solid #a7a4a4;z-index:1';

            // 미리보기 이미지 속성
            var img_style = 'width:100%;height:100%;z-index:none';


            // 이미지안에 표시되는 체크박스의 속성
            var chk_style = 'width:30px;height:30px;position:absolute;font-size:18px;right:0px;background-color:rgba(255,255,255,0.1);color:#a7a4a4;border:none;font-weight:bold';


            btnAtt.onchange = function (e) {
                var files = e.target.files;
                var fileArr = Array.prototype.slice.call(files);
                for (let f of fileArr) {
                    imageLoader(f);
                }
            };


            // 탐색기에서 드래그앤 드롭 사용
            attZone.addEventListener('dragenter', function (e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);

            attZone.addEventListener('dragover', function (e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);

            attZone.addEventListener('drop', function (e) {
                var files = {};
                e.preventDefault();
                e.stopPropagation();
                var dt = e.dataTransfer;
                files = dt.files;
                for (let f of files) {
                    imageLoader(f);
                }
            }, false);



            // 첨부된 이미리들을 배열에 넣고 미리보기
            function imageLoader(file) {
                sel_files.push(file);
                var reader = new FileReader();
                reader.onload = function (ee) {
                    let img = document.createElement('img');
                    img.setAttribute('style', img_style);
                    img.src = ee.target.result;
                    attZone.appendChild(makeDiv(img, file));
                };
                reader.readAsDataURL(file);
            }



            //  첨부된 파일이 있는 경우 checkbox와 함께 attZone에 추가할 div를 만들어 반환
            function makeDiv(img, file) {
                var div = document.createElement('div');
                div.setAttribute('style', div_style);

                var btn = document.createElement('input');
                btn.setAttribute('type', 'button');
                btn.setAttribute('value', 'x');
                btn.setAttribute('delFile', file.name);
                btn.setAttribute('style', chk_style);
                btn.onclick = function (ev) {
                    var ele = ev.srcElement;
                    var delFile = ele.getAttribute('delFile');
                    for (var i = 0; i < sel_files.length; i++) {
                        if (delFile == sel_files[i].name) {
                            sel_files.splice(i, 1);
                        }
                    }

                    var dt = new DataTransfer();
                    for (let f of sel_files) {
                        dt.items.add(f);
                    }
                    btnAtt.files = dt.files;
                    var p = ele.parentNode;
                    attZone.removeChild(p);
                };
                div.appendChild(img);
                div.appendChild(btn);
                return div;
            }
        })('att_zone', 'btnAtt');
    },
};


</script>

<style>
#att_zone {
    width: 900px;
    min-height: 242px;
    padding: 15px;
    border: 1px dotted #999;
    border-radius: 20px;
    margin-top: 10px;
}

#att_zone:empty:before {
    content: attr(data-placeholder);
    color: #999;
    font-size: .9em;
}
</style>