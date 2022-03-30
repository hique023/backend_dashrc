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

// Rota GET para recuperar dados do MSP
app.get("/msp", async (req, res) => {
  try {
    // Response é a resposta do Axios mas eu desestruturo de dentro do response
    const { data } = await axios("ENDPOINT");

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
app.listen(3000);

console.log("Servidor Online... Para finalizar utilize CTRL + C");
