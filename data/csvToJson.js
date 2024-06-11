const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname);

const replaceObj = {
  'MULTIMERCADO,"': 'MULTIMERCADO[VIRGULA]"',
  'EM AÇÕES,"': 'EM AÇÕES[VIRGULA]"',
  "MULTICARTEIRA AGRO,": "MULTICARTEIRA AGRO[VIRGULA]",
  'GATE,"': 'GATE[VIRGULA]"',
  'EXTERIOR,"': 'EXTERIOR[VIRGULA]"',
};

let csv = fs.readFileSync(directoryPath + "/fundos_2024-01-31.csv").toString();

Object.keys(replaceObj).forEach((key) => {
  csv = csv.replace(new RegExp(key, "g"), replaceObj[key]);
});

const json = csvToJson(csv);

fs.writeFileSync(directoryPath + "/fundos.json", JSON.stringify(json));

function csvToJson(csv) {
  const csvArray = csv.split("\r\n");
  let head = csvArray.shift();
  head = head.split(",");

  const headers = {
    CNPJ_FUNDO: "cnpj",
    DENOM_SOCIAL: "nome",
    VL_PATRIM_LIQ: "pl",
  };

  const json = [];
  csvArray.forEach((line) => {
    const howMany = (line.match(/,/g) || []).length;

    const obj = {};
    if (howMany) {
      const lineArray = line.split(",");
      head.forEach((h, i) => {
        const humanHeader = headers[h];
        let value = lineArray[i];

        if (humanHeader === "cnpj") {
          value = value.replace(/\./g, "");
          value = value.replace(/-/g, "");
          value = value.replace(/\//g, "");
        }

        obj[humanHeader] = value;
      });
    }

    json.push(obj);
  });

  return json;
}
