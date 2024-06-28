<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<template>
  <div>
    <div class="border-gradient-inverted"></div>
    <div class="dark">
      <div class="container py-4">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            © {{ year }}
            <a href="https://carteirafundos.com.br">carteirafundos.com.br</a>
          </div>
          <a href="mailto:contato@carteirafundos.com.br"
            >contato@carteirafundos.com.br</a
          >
        </div>
        <p class="disclaimer m-0 text-justify">
          As informações disponibilizadas não configuram um relatório de análise
          ou qualquer tipo de recomendação e foram obtidas a partir de fontes
          públicas como a CVM. Rentabilidade passada não representa garantia de
          resultados futuros e apesar do cuidado na coleta e manuseio das
          informações, elas não foram conferidas individualmente. As informações
          são enviadas pelos próprios gestores aos órgãos reguladores e podem
          haver divergências pontuais e atraso em determinadas atualizações. O
          Carteira Fundos, seus sócios, administradores, representantes legais e
          funcionários não garantem sua exatidão, atualização, precisão,
          adequação, integridade ou veracidade, tampouco se responsabilizam pela
          publicação acidental de dados incorretos.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.disclaimer {
  font-size: 13px;
}
</style>
