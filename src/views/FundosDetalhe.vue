<script>
import Cabecalho from "../components/Cabecalho.vue";
import Migalha from "../components/Migalha.vue";
import BannerBusca from "../components/BannerBusca.vue";

export default {
  components: {
    Cabecalho,
    Migalha,
    BannerBusca,
  },

  async mounted() {
    console.log("$route", this.$route);

    var myHeaders = new Headers();

    var myInit = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    };

    const res = await fetch(
      "http://3.81.38.19/api/funds/21470947000136/positions?month=2024-02&limit=20&orderBy=positionInWallet",
      myInit
    );

    console.log("res", res);
  },
  data() {
    return {
      filtered: [],
      focused: false,
      searched: false,
      hovered: false,
    };
  },
  methods: {},
};
</script>

<template>
  <div>
    <Cabecalho />
    <Migalha />
    <BannerBusca />

    <main>
      <div class="container my-5">cnpj: {{ $route.params.cnpj }}</div>
    </main>
  </div>
</template>
