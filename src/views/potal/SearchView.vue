<template>
  <div id="wrap">
    <AppHeader />
    <div id="potal-main-container" class="clearfix">
      
    </div><!-- potal-main-container -->
    <AppFooter id="AppFooter"/>           
  </div><!-- wrap --> 
</template>

<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"

export default {
   name: "SearchView",
   components: {
       AppFooter,
       AppHeader,
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

</style>
