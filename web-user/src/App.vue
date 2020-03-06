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

    export default {
        name: 'App',
        components: {
            'main-header': Header,
            'main-footer': Footer,
        }
    }
</script>

<style>

</style>
