<script>
import Migalha from "../components/Migalha.vue";
import json from "../data/fundos.json";

export default {
  components: {
    Migalha,
  },

  data() {
    return {
      filtered: [],
      focused: false,
      searched: false,
      hovered: false,
    };
  },
  methods: {
    onInput: function ($event) {
      const value = $event?.target?.value;
      if (value.length > 2) {
        this.searched = true;
        this.filtered = filter(value);
      } else {
        this.filtered = [];
      }
    },
    onFocus: function () {
      this.focused = true;
    },
    onBlur: function () {
      this.focused = false;
    },

    onMouseOver: function () {
      this.hovered = true;
    },
    onMouseLeave: function () {
      this.hovered = false;
    },

    formatCnpj(string) {
      return string.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    },
    nFormatter(num, digits) {
      const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: " k" },
        { value: 1e6, symbol: " M" },
        { value: 1e9, symbol: " B" },
      ];
      const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
      const item = lookup.findLast((item) => num >= item.value);
      return item
        ? (num / item.value)
            .toFixed(digits)
            .replace(regexp, "")
            .concat(item.symbol)
        : "0";
    },
  },
};

function filter(searchString) {
  if (searchString === "") return [];
  const resultSearchString = removeAccents(searchString.toUpperCase());
  const resultSearchArray = resultSearchString.split(" ");

  return json.filter((item) => {
    const name = removeAccents(item?.nome?.toUpperCase());

    return resultSearchArray.every((currentValue) => {
      return name?.includes(currentValue);
    });
  });
}

function removeAccents(str) {
  return str?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "");
}
</script>

<template>
  <div>
    <div class="wrapper-header">
      <template>
        <div class="dark z-index-30 position-relative">
          <div class="container">
            <header
              class="header d-flex align-items-center justify-content-between"
            >
              <div class="d-flex align-items-center">
                <a href="/">
                  <img class="logo py-3 mr-4" src="@/assets/logo.png" />
                </a>

                <ul class="nav">
                  <li class="nav-item">
                    <a class="nav-link px-0 mr-3 active" href="/">Início</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link px-0 mr-3" href="#">Fundos</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link px-0 mr-3" href="#">Ações</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link px-0 mr-3" href="#">FIIs</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link px-0 mr-3" href="#">Renda Fixa</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link px-0 mr-3" href="#">Fluxo</a>
                  </li>
                </ul>
              </div>

              <ul class="nav">
                <li class="nav-item">
                  <a class="nav-link px-0 ml-3 active" href="/">Comparador</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-0 ml-3" href="#">Simulador</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-0 ml-3" href="#">Login / Criar Conta</a>
                </li>
              </ul>
            </header>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.wrapper-tilted {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
}

.logo {
  width: 170px;
}

.nav {
  font-size: 20px;
}

.nav-link {
  background-image: none;
  color: #b9a353;
  transition: color 0.3s;

  &:hover {
    color: #fcd751;
  }
}

.wrapper-header {
  position: relative;
  z-index: 1090;
}

.title span {
  overflow: visible;
  color: #998744;
}

.wrapper {
  height: 100%;
  width: 100%;
  top: 0;
}

.z-index-20 {
  z-index: 20;
}

.z-index-30 {
  z-index: 30;
}

.z-index-40 {
  z-index: 40;
}

.z-index-50 {
  z-index: 50;
}

.link {
  width: 100%;
  display: block;
  overflow: hidden;
  line-height: 1.2;
  padding-top: 10px;
  padding-bottom: 10px;
}

.dark {
  background-color: #00263d;
  color: white;

  .border-gradient-inner {
    background-color: #00263d;
  }

  .title {
    span {
      color: white;
    }

    &::before {
      background-color: #6e5d21;
      background-color: #78672d;
      background-color: #635626;
    }
  }
}
</style>
