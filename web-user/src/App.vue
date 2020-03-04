<template>
    <div id="app">
        <main-header></main-header>
        <router-view/>
        <main-footer></main-footer>
    </div>
</template>

<script>
    import Header from "./components/public/Header";
    import Footer from "./components/public/Footer";


    export default {
        name: 'App',
        components: {
            'main-header': Header,
            'main-footer': Footer,
        },
        watch: {
            '$route': function(to, from) {
                this.$common._routeInfo = this.$route;
            }
        },
    }
</script>

<style>

</style>
