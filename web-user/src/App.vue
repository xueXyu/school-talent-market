<template>
    <div id="app">
        <main-header></main-header>
        <login-signup></login-signup>
        <router-view/>
        <main-footer></main-footer>
    </div>
</template>

<script>
    import Header from "./components/public/Header";
    import Footer from "./components/public/Footer";
    import LoginSignup from "./components/public/LoginSignup"

    export default {
        name: 'App',
        components: {
            'main-header': Header,
            'main-footer': Footer,
            'login-signup': LoginSignup
        }
    }
</script>

<style>

</style>
