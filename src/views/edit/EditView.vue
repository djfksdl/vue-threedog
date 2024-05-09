<template>
    <div id="wrap">
        <ManagerHeader />
          <div class="container">

          </div>
           
        <ManagerFooter />  
       </div><!-- wrap --> 

  </template>
  
  
  <script>
  
   import ManagerFooter from "@/components/ManagerFooter.vue"
   import ManagerHeader from "@/components/ManagerHeader.vue"
  
   export default {
       name: "EditView",
       components: {
            ManagerFooter,
            ManagerHeader
       },
       data() {
           return {
  
           };
       },
       methods: {
  
       },
   };
  </script>
  