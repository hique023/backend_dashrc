// Importação do Dotenv
require("dotenv").config();

// Importação do Cors
const cors = require("cors");

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

// Dados da requisição
const keyRequest = process.env.APP_ID;

const base_url = `https://api.us0.swi-rc.com/integration/get_history_api.php?KEY=${keyRequest}&VARS=DATE_START DATE_END TECH_NAME TECH_USERNAME&FILTER_DATE_START_INI=2022-03-31&FILTER_PROCESSED=ANSWERED&OUTPUT_FORMAT=JSON`;

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

// Tratamento ao erro de requisição inexistente, ou seja, o erro 404
app.use((req, res) => {
  res.type("application/json");
  res.status(404).send({ erro: "404 - Página não encontrada" });
});

// Porta do servidor
app.listen(process.env.PORT || 3000);

console.log("Servidor Online... Para finalizar utilize CTRL + C");
