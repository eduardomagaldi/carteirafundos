import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/fundos",
      name: "Fundos",
      component: () => import("../views/FundosView.vue"),
    },
    {
      path: "/fundos/:cnpj",
      name: "FundosDetalhe",
      component: () => import("../views/FundosDetalhe.vue"),
    },
  ],
});

export default router;
