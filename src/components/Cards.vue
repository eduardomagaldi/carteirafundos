<script>
export default {
  data() {
    return {
      yearList: getYearList(),
      cards: getCards(),
      selectedYear: getSelectedYear(),
      selectedMonth: getSelectedMonth(),
      fundType: "Ações",
      from: "",
      fromFormatted: "",
      to: "",
      toFormatted: "",
    };
  },
  methods: {
    onMonthInput($event) {
      const value = $event.target.value;

      this.selectedMonth = value;
    },
    onDateInput(type, $event) {
      this[type] = unformatDate($event);
      this[type + "Formatted"] = formatDate($event);
    },
    onTextDateInput(type, $event) {
      if ($event.length === 10) {
        this[type] = unformatDate($event);
        this[type + "Formatted"] = formatDate($event);
      }
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

function getCards() {
  const link = {
    nome: "OITI FIM CRÉDITO PRIVADO IE",
    cnpj: "46379400000150",
    href: "#",
    pl: 4000000000,
  };

  return {
    acoes: [link, link, link, link, link],
    fiis: [link, link, link, link, link],
    debentures: [link, link, link, link, link],
  };
}

function getYearList() {
  let currYear = new Date().getFullYear();
  const yearList = [];
  while (yearList[yearList.length - 1] !== 2005) {
    yearList.push(currYear);
    currYear -= 1;
  }

  return yearList;
}

function getSelectedMonth() {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return months[new Date().getMonth()];
}

function getSelectedYear() {
  const yearList = getYearList();
  return yearList[0];
}

function formatDate(date) {
  return date.split("-").reverse().join("/");
}

function unformatDate(date) {
  return date.split("/").reverse().join("-");
}
</script>

<template>
  <div class="container text-center my-5">
    <h2 class="title uppercase">
      <span>Mais alocados</span>
    </h2>

    <div class="d-flex justify-content-center mb-2">
      <select
        class="form-control width-auto mr-1"
        @input="onMonthInput"
        v-model="selectedMonth"
      >
        <option>Janeiro</option>
        <option>Fevereiro</option>
        <option>Março</option>
        <option>Abril</option>
        <option>Maio</option>
        <option>Junho</option>
        <option>Julho</option>
        <option>Agosto</option>
        <option>Setembro</option>
        <option>Outubro</option>
        <option>Novembro</option>
        <option>Dezembro</option>
      </select>

      <select class="form-control width-auto" v-model="selectedYear">
        <option v-for="(year, index) in yearList" :key="index">
          {{ year }}
        </option>
      </select>
    </div>

    <div class="row g-4">
      <div class="col">
        <div class="border-gradient">
          <div class="border-gradient-inner card-carteira-fundos">
            <h3 class="mb-0 uppercase font-weight-bold">
              <span>Ações mais alocadas</span>
            </h3>
            <div class="divider border-gradient"></div>

            <a
              v-for="(item, index) in cards.acoes"
              :key="index"
              :href="item.href"
              class="text-left ativo link mb-0"
            >
              <h4 class="link-title font-weight-bold">
                {{ item.nome }}
              </h4>
              <div class="d-flex justify-content-between">
                <span class="info-small"
                  ><strong>CNPJ:</strong> {{ formatCnpj(item.cnpj) }}</span
                >
                <span class="info-small">
                  <strong>PL:</strong> R$ {{ nFormatter(item.pl, 1) }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="border-gradient">
          <div class="border-gradient-inner card-carteira-fundos">
            <h3 class="mb-0 uppercase font-weight-bold">
              <span>FIIs mais alocados</span>
            </h3>
            <div class="divider border-gradient"></div>

            <a
              v-for="(item, index) in cards.fiis"
              :key="index"
              :href="item.href"
              class="text-left ativo link mb-0"
            >
              <h4 class="link-title font-weight-bold">
                {{ item.nome }}
              </h4>
              <div class="d-flex justify-content-between">
                <span class="info-small">
                  <strong>CNPJ:</strong> {{ formatCnpj(item.cnpj) }}
                </span>
                <span class="info-small">
                  <strong>PL:</strong> R$ {{ nFormatter(item.pl, 1) }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="border-gradient">
          <div class="border-gradient-inner card-carteira-fundos">
            <h3 class="mb-0 uppercase font-weight-bold">
              <span>Debêntures mais alocadas</span>
            </h3>
            <div class="divider border-gradient"></div>

            <a
              v-for="(item, index) in cards.debentures"
              :key="index"
              :href="item.href"
              class="text-left ativo link mb-0"
            >
              <h4 class="link-title font-weight-bold">
                {{ item.nome }}
              </h4>
              <div class="d-flex justify-content-between">
                <span class="info-small"
                  ><strong>CNPJ:</strong> {{ formatCnpj(item.cnpj) }}</span
                >
                <span class="info-small">
                  <strong>PL:</strong> R$ {{ nFormatter(item.pl, 1) }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <h2 class="title uppercase mt-5">
      <span>Maiores movimentações do mês</span>
    </h2>

    <div class="d-flex justify-content-center mb-2">
      <select
        class="form-control width-auto mr-1"
        @input="onMonthInput"
        v-model="selectedMonth"
      >
        <option>Janeiro</option>
        <option>Fevereiro</option>
        <option>Março</option>
        <option>Abril</option>
        <option>Maio</option>
        <option>Junho</option>
        <option>Julho</option>
        <option>Agosto</option>
        <option>Setembro</option>
        <option>Outubro</option>
        <option>Novembro</option>
        <option>Dezembro</option>
      </select>

      <select class="form-control width-auto" v-model="selectedYear">
        <option v-for="(year, index) in yearList" :key="index">
          {{ year }}
        </option>
      </select>
    </div>

    <div class="row g-4">
      <div class="col">
        <div class="border-gradient">
          <div class="border-gradient-inner card-carteira-fundos">
            <h3 class="mb-0 uppercase font-weight-bold">
              <span>Compras</span>
            </h3>
            <div class="divider border-gradient"></div>

            <a
              v-for="(item, index) in cards.acoes"
              :key="index"
              :href="item.href"
              class="text-left ativo link mb-0"
            >
              <h4 class="link-title font-weight-bold">
                {{ item.nome }}
              </h4>
              <div class="d-flex justify-content-between">
                <span class="info-small"
                  ><strong>CNPJ:</strong> {{ formatCnpj(item.cnpj) }}</span
                >
                <span class="info-small">
                  <strong>PL:</strong> R$ {{ nFormatter(item.pl, 1) }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="border-gradient">
          <div class="border-gradient-inner card-carteira-fundos">
            <h3 class="mb-0 uppercase font-weight-bold">
              <span>Vendas</span>
            </h3>
            <div class="divider border-gradient"></div>

            <a
              v-for="(item, index) in cards.fiis"
              :key="index"
              :href="item.href"
              class="text-left ativo link mb-0"
            >
              <h4 class="link-title font-weight-bold">
                {{ item.nome }}
              </h4>
              <div class="d-flex justify-content-between">
                <span class="info-small"
                  ><strong>CNPJ:</strong> {{ formatCnpj(item.cnpj) }}</span
                >
                <span class="info-small">
                  <strong>PL:</strong> R$ {{ nFormatter(item.pl, 1) }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <h2 class="title uppercase mt-5">
      <span>Fundos por período</span>
    </h2>

    <div class="d-flex justify-content-center align-items-center mb-2">
      <div class="d-flex align-items-center">
        <label class="mb-0 mr-1">De:</label>
        <b-input-group>
          <b-form-input
            v-model="fromFormatted"
            type="text"
            placeholder="DD/MM/AAAA"
            v-mask="'##/##/####'"
            autocomplete="off"
            @input="onTextDateInput('from', $event)"
            class="input-date"
          ></b-form-input>
          <b-input-group-append>
            <b-form-datepicker
              v-model="from"
              button-only
              right
              locale="pt-BR"
              aria-controls="example-input"
              @input="onDateInput('from', $event)"
              button-variant="primary"
              hide-header
              label-help=""
            ></b-form-datepicker>
          </b-input-group-append>
        </b-input-group>
      </div>

      <div class="d-flex align-items-center">
        <label class="mb-0 ml-2 mr-1">Até:</label>
        <b-input-group>
          <b-form-input
            v-model="toFormatted"
            type="text"
            placeholder="DD/MM/AAAA"
            autocomplete="off"
            v-mask="'##/##/####'"
            @input="onTextDateInput('to', $event)"
            class="input-date"
          ></b-form-input>
          <b-input-group-append>
            <b-form-datepicker
              v-model="to"
              button-only
              right
              locale="pt-BR"
              aria-controls="example-input"
              @input="onDateInput('to', $event)"
              button-variant="primary"
              hide-header
              label-help=""
            ></b-form-datepicker>
          </b-input-group-append>
        </b-input-group>
      </div>

      <label class="mb-0 ml-2">Tipo de fundo:</label>
      <select class="form-control ml-1 width-auto" v-model="fundType">
        <option value="Ações">Ações</option>
        <option value="Multimercado">Multimercado</option>
        <option value="Renda fixa">Renda fixa</option>
      </select>
    </div>

    <div class="row g-4">
      <div class="col">
        <div class="border-gradient">
          <div class="border-gradient-inner card-carteira-fundos">
            <h3 class="mb-0 uppercase font-weight-bold">
              <span>Rentabilidade dos fundos</span>
            </h3>
            <div class="divider border-gradient"></div>

            <a
              v-for="(item, index) in cards.acoes"
              :key="index"
              :href="item.href"
              class="text-left ativo link mb-0"
            >
              <h4 class="link-title font-weight-bold">
                {{ item.nome }}
              </h4>
              <div class="d-flex justify-content-between">
                <span class="info-small"
                  ><strong>CNPJ:</strong> {{ formatCnpj(item.cnpj) }}</span
                >
                <span class="info-small">
                  <strong>PL:</strong> R$ {{ nFormatter(item.pl, 1) }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="border-gradient">
          <div class="border-gradient-inner card-carteira-fundos">
            <h3 class="mb-0 uppercase font-weight-bold">
              <span>Captação e resgate</span>
            </h3>
            <div class="divider border-gradient"></div>

            <a
              v-for="(item, index) in cards.fiis"
              :key="index"
              :href="item.href"
              class="text-left ativo link mb-0"
            >
              <h4 class="link-title font-weight-bold">
                {{ item.nome }}
              </h4>
              <div class="d-flex justify-content-between">
                <span class="info-small"
                  ><strong>CNPJ:</strong> {{ formatCnpj(item.cnpj) }}</span
                >
                <span class="info-small">
                  <strong>PL:</strong> R$ {{ nFormatter(item.pl, 1) }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  z-index: 20;
  position: relative;
}

.title-2 {
  font-size: 23px;
}

.info-small {
  font-size: 17px;
}

.card-carteira-fundos {
  padding: 10px;
}

.divider {
  padding: 0;
  height: 1px;
  position: relative;
  margin-left: -10px;
  margin-right: -10px;

  &::after {
    content: "";
    display: block;
    border: 1px solid #c5a23d;
    height: 7px;
    width: 7px;
    border-radius: 100%;
    position: absolute;
    top: -3px;
    left: calc(50% - 3px);
    background: white;
    outline: 1px solid white;
  }
}

:deep(label.sr-only) {
  display: none;
}

.date {
  width: 160px;
}

.type {
  width: 100px;
  margin-left: 10px;
  height: 38px;
}

.link {
  margin-left: -10px;
  margin-right: -10px;
}

.width-auto {
  width: auto;
}

.input-date {
  max-width: 130px;
}
</style>
