import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";

import App from "./App.vue";
import router from "./router";

import VueTheMask from "vue-the-mask";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
// // import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import the fontawesome core */
// import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
// import { FontAwesomeIcon } from "../node_modules/@fortawesome/vue-fontawesome";

/* import specific icons */
// import { all } from "@awesome.me/kit-KIT_CODE/icons";

/* add icons to the library */
// library.add(...all);

// Vue.component("font-awesome-icon", FontAwesomeIcon);

// import a from "fortawesome";

// import "./assets/main.css";

// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueTheMask);

Vue.use(BootstrapVue);

new Vue({
  router,
  render: (h) => h(App),
})
  // .component("font-awesome-icon", FontAwesomeIcon)
  .$mount("#app");
