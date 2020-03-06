<template>
    <div id="app">
        <main-header></main-header>
        <router-view/>
        <main-footer></main-footer>
    </div>
</template>

<script>
    import Header from "_c/public/Header";
    import Footer from "_c/public/Footer";
    import storage2store from "@/store/storage2store";

    export default {
        name: 'App',
        components: {
            'main-header': Header,
            'main-footer': Footer,
        },
        mounted() {
            storage2store.checkLocalStorage();
        }
    }
</script>

<style>

</style>
