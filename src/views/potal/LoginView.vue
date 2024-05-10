<template>
   <div id="wrap">
         <AppHeader />
         
         <AppFooter />           
     </div><!-- wrap --> 
</template>


<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"

export default {
        name: "LoginView",
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