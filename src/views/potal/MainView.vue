<template>
  <div id="wrap">
         <AppHeader />
         <div class="potal-main-slide">
                <SlideView />
         </div><!-- potal-main-slide -->
         <div id="potal-main-container" class="clearfix">
                힛
         </div><!-- potal-main-container -->
         <AppFooter />           
     </div><!-- wrap --> 
</template>


<script>
 import SlideView from '@/components/SlideView.vue';
 import AppFooter from "@/components/AppFooter.vue"
 import AppHeader from "@/components/AppHeader.vue"

 export default {
     name: "MainView",
     components: {
         AppFooter,
         AppHeader,
         SlideView,
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
    width: 1400px;
    margin: 0 auto;
    text-align: center;
    background-color: antiquewhite;
    height: 2000px; /* 임시로 준 크기임 */
}

.potal-main-slide, .main-slide{
    width: 100%;
    height: 560px;
    /* background-color: antiquewhite; */
}
</style>