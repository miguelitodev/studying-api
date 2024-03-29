// chamando os pacotes
const express = require("express");
const bodyParser = require("body-parser");

const app = express(); // declarando a funcao express em uma constante

app.use(bodyParser.json()); // endender quando enviar uma requisição em json
app.use(bodyParser.urlencoded({
    extended: false
})); // para quando passar parametros via URL

require('./app/controllers/index')(app); // importa todo os controllers que forem criados

app.listen(3000);