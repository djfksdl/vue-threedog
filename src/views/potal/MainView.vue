<template>
  <div id="wrap">
         <AppHeader />
         <div class="potal-main-slide">
                <img class="main-slide" src="../../assets/images/main-slide.png">
         </div><!-- potal-main-slide -->
         <div id="potal-main-container" class="clearfix">
                d
         </div><!-- potal-main-container -->
         <AppFooter />           
     </div><!-- wrap --> 
</template>


<script>
 import AppFooter from "@/components/AppFooter.vue"
 import AppHeader from "@/components/AppHeader.vue"

 export default {
     name: "MainView",
     components: {
         AppFooter,
         AppHeader
     },
     data() {
         return {

         };
     },
     methods: {

     },
 };
</script>
<style>
#potal-main-container{
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    background-color: aqua;
    height: 2000px; /* 임시로 준 크기임 */
}

.potal-main-slide, .main-slide{
    width: 100%;
    height: 540px;
    background-color: antiquewhite;
}
</style>