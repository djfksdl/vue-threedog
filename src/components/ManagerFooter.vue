<template>
    <div class="mfooter">
        <div class="mfooterWrap">
            <div class="mfooterTop">
                <div class="mfotterLeft">
                    <p>사업자등록번호 | 135-92-00000</p>
                </div>
                <div class="mfooterRight">
                    <router-link to="https://www.instagram.com/ottogi_daily/"><img src="@/assets/images/icon_insta.png"></router-link>
                    <router-link to="https://blog.naver.com/ottogitoday1"><img src="@/assets/images/icon_blog.png"></router-link>
                    <router-link to="https://pf.kakao.com/_paQtC"><img src="@/assets/images/icon_kakao.png"></router-link>
                    <router-link to="https://www.youtube.com/user/Ottogimkt"><img src="@/assets/images/icon_youtube.png"></router-link>
                </div>
            </div>
            <div class="mfooterBtm">
                <p>Copyright 2020-2024 dog3 Corp. All Rights Reserved.</p>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/css/mHeaderFooter/mfooter.css"
export default {
    name: "ManagerFooter",
    components: {},
    data() {
        return {};
    },
    methods: {
        
    },
    created() { }
};
</script>