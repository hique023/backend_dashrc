// Importação do Dotenv
require("dotenv").config();

// Importação do Cors
const cors = require("cors");

// Importação da bilbioteca Date
var data = new Date();

// Importação do módulo do Express para o Node
const express = require("express");

// Importação do Axios
const axios = require("axios");

// Importação do módulo do body-parser para realizar o trabalho com o JSON que será enviado
const bodyParser = require("body-parser");

// Utilizar o Express na aplicação
const app = express();

// Habilitação do cors
app.use(cors());

// Recuperação da data
const dia = String(data.getDate()).padStart(2, "0");
var mes = String(data.getMonth() + 1).padStart(2, "0");
var ano = data.getFullYear();
var hour = data.getHours(); // 0-23
var minutes = data.getMinutes(); // 0-59
var seconds = data.getSeconds();
var dataAtual = ano + "-" + mes + "-" + dia;
var horaAtual = hour + ":" + minutes + ":" + seconds;
// console.log("Ano: " + typeof ano + " " + ano);
// console.log("Mes: " + typeof mes + " " + mes);
// console.log("Dia: " + typeof dia + " " + dia);
// console.log(dataAtual);
// console.log(horaAtual);

// Dados da requisição
const keyRequest = process.env.APP_ID;
const dateFilter = `${ano}-${mes}-${dia}`;

const base_url = `https://api.us0.swi-rc.com/integration/get_history_api.php?KEY=${keyRequest}&VARS=ID DATE_START DATE_END TECH_NAME TECH_USERNAME&FILTER_DATE_START_INI=${dateFilter}&FILTER_PROCESSED=ANSWERED&OUTPUT_FORMAT=JSON`;
// const base_urltech = `https://api.us0.swi-rc.com/integration/get_history_api.php?KEY=${keyRequest}&VARS=ID DATE_START DATE_END TECH_NAME TECH_USERNAME&FILTER_DATE_START_INI=${dateFilter}&FILTER_PROCESSED=ANSWERED&FILTER_TECH_USERNAME=${req.params.tech}&OUTPUT_FORMAT=JSON`;

// Rota GET para recuperar dados do MSP
app.get("/msp", async (req, res) => {
  try {
    // Response é a resposta do Axios mas eu desestruturo de dentro do response
    const { data } = await axios(base_url);

    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// Rota GET para recuperar dados do MSP de um analista específico
app.get("/msptech/:tech", async (req, res) => {
  try {
    // Response é a resposta do Axios mas eu desestruturo de dentro do response
    const { data } = await axios(
      `https://api.us0.swi-rc.com/integration/get_history_api.php?KEY=${keyRequest}&VARS=ID DATE_START DATE_END TECH_NAME TECH_USERNAME&FILTER_DATE_START_INI=${dateFilter}&FILTER_PROCESSED=ANSWERED&FILTER_TECH_USERNAME=${req.params.tech}&OUTPUT_FORMAT=JSON`
    );

    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// Tratamento ao erro de requisição inexistente, ou seja, o erro 404
app.use((req, res) => {
  res.type("application/json");
  res.status(404).send({ erro: "404 - Página não encontrada" });
});

// Porta do servidor
app.listen(process.env.PORT || 3000);

console.log("Servidor Online... Para finalizar utilize CTRL + C");
