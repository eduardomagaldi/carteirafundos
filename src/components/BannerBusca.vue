<script>
import json from "../data/fundos.json";

export default {
  props: {
    large: Boolean,
  },
  mounted() {
    console.log("this.large", this.large);
  },
  data() {
    return {
      filtered: [],
      focused: false,
      searched: false,
    };
  },
  methods: {
    onInput: function ($event) {
      const value = $event?.target?.value;
      if (value.length > 2) {
        this.searched = true;
        this.filtered = filter(value);
      }
    },
    onFocus: function () {
      this.focused = true;
    },
    onBlur: function () {
      this.focused = false;
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
    <div class="dark banner position-relative">
      <div
        class="container position-relative"
        :class="{ 'py-5': large, 'py-2': !large }"
      >
        <div class="position-relative z-index-50">
          <h1 class="title-sub font-weight-normal" v-if="large">
            Acompanhe posições e movimentações dos fundos de investimento
          </h1>

          <div
            class="busca-wrapper d-flex flex-column align-items-start position-relative"
          >
            <label class="label uppercase font-weight-bold">
              Busque por nome do fundo, CNPJ, ações, fiis…
            </label>

            <input
              class="busca"
              type="text"
              placeholder="ITAUSA"
              @input="onInput"
              @focus="onFocus"
              @blur="onBlur"
            />

            <ul
              class="resultados-busca p-0 position-absolute"
              v-if="searched && focused"
            >
              <li v-for="(item, index) in filtered" :key="index">
                <a href="#" class="link">
                  <div
                    class="font-weight-bold text-nowrap text-truncate"
                    :title="item.nome"
                  >
                    {{ item.nome }}
                  </div>
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <span class="badge badge-pill badge-secondary"
                        >FUNDO</span
                      >
                      <span class="ml-1">
                        <strong>CNPJ:</strong> {{ formatCnpj(item.cnpj) }}
                      </span>
                    </div>

                    <div class="ml-1">
                      <strong class="uppercase">PL:</strong> R$
                      {{ nFormatter(item.pl, 1) }}
                    </div>
                  </div>
                </a>
              </li>

              <li class="nada-encontrado" v-if="filtered.length === 0">
                <span>Nenhum resultado encontrado :(</span>
              </li>
            </ul>
          </div>

          <h2 class="title-sub font-weight-normal" v-if="large">
            Dados estruturados para
            <span class="title uppercase ml-1 font-weight-bold">
              <span>melhores decisões</span>
            </span>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  background: linear-gradient(0deg, rgba(121, 121, 9, 1) 0%, #00263d 30%);
  /* height: 100%;
  background-image: url("@/assets/bg.jpg");
  background-size: 1920px 700px;
  background-position: center center;
  background-repeat: no-repeat;
  background-position: center -290px;
  background-repeat: no-repeat; */

  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: url("@/assets/bg.jpg");
    background-size: 1920px 700px;
    background-position: center center;
    background-repeat: no-repeat;
    background-position: center -290px;
    opacity: 0.4;
  }
}

.tilted {
  top: -200px;
  width: 400px;
  height: 700px;
  transform: rotate(20deg);
  background-color: #00263d;
  border: 1px solid #897023;
  left: calc(50% + 136px);
}

.image {
  position: absolute;
  width: 600px;
  transition: top 0.3s;
  left: calc(50% - 20px);
}

.label {
  background-color: #00263d;
  padding: 0 2px 1px 2px;
  line-height: 18px;
  position: relative;
  border-radius: 3px 3px 0 0;
  margin-bottom: -3px;
  margin-left: 4px;
}

.busca {
  font-size: 25px;
  background-color: white !important;
  border-radius: 3px;
  transition: width 0.3s;
  outline: 2px solid #998744;
  width: 50%;
  border: 5px solid #00263d;
  padding: 10px;
  box-sizing: border-box;
  margin: 2px;
  text-transform: uppercase;

  &:focus {
    outline: 2px solid #998744;
  }
}

.resultados-busca {
  list-style: none;
  background-color: white;
  top: 98px;
  width: 100%;
  z-index: 50;
  max-height: calc(100vh - 285px - 50px);
  overflow: auto;
  border: 5px solid #00263d;
  outline: 2px solid #998744;
  border-top: none;
  width: 50%;
  margin: -18px 2px 0 2px;
  border-radius: 0 0 3px 3px;

  li {
    color: inherit;
    width: 100%;
    overflow: hidden;

    &:last-child {
      border-bottom: none;
    }
  }
}

.nada-encontrado {
  color: #00263d !important;
  padding: 10px;
}

.title-sub {
  font-size: 28px;
}
</style>
