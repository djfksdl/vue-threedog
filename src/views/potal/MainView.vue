<template>
  <div id="wrap">
         <AppHeader />
         <div id="ys-main-container" class="clearfix">
             

         </div><!-- //container -->
         <AppFooter />           
     </div><!-- //wrap --> 
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
