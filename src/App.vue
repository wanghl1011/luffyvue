<template>
    <div id="app">
        <Lheader></Lheader>
        <router-view/>
        <Lfooter></Lfooter>
    </div>
</template>

<script>
    import Lheader from "./components/Header.vue"
    import Lfooter from "./components/Footer.vue"

    export default {
        name: 'App',
        components: {
            Lheader,
            Lfooter
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }
</style>
