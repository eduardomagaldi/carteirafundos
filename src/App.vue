<script setup>
import Cabecalho from "./components/Cabecalho.vue";
import Migalha from "./components/Migalha.vue";
import Rodape from "./components/Rodape.vue";
</script>

<template>
  <div id="app">
    <!-- <router-link to="/about">About</router-link> -->
    <!-- <router-link to="/">Home</router-link> -->

    <router-view />

    <Rodape />
  </div>
</template>

<style lang="scss" src="./app.scss"></style>
