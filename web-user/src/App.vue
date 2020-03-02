<template>
    <div id="app">
        <main-header></main-header>
        <login-signup></login-signup>
        <router-view/>
        <main-footer></main-footer>
    </div>
</template>

<script>
    import Header from "./components/Header";
    import Footer from "./components/Footer";
    import LoginSignup from "./components/LoginSignup"

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
