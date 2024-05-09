<template>
    <div class="header">
        <img class="logo" src="../assets/images/logo.png">
    </div>
</template>

<script>
export default {
    name: "AppHeader",
    components: {},
    data() {
        return {};
    },
    methods: {
        
    },
    created() { }
};
</script>

<style>
.header{
    width: 100%;
    height: 138px;
    background-color: #d6d6d6;
}

.logo{
    width: 250px;
    height: 150px;
    object-fit: contain;
}
</style>