<script setup>
import Cards from "../components/Cards.vue";
import BannerBusca from "../components/BannerBusca.vue";

import Cabecalho from "../components/Cabecalho.vue";
import Migalha from "../components/Migalha.vue";
</script>

<template>
  <div>
    <Cabecalho />
    <Migalha />
    <BannerBusca :large="true" />

    <main>
      <Cards />
    </main>
  </div>
</template>
