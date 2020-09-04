const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs
        .readdirSync(__dirname) // ler o diretorio que está operando no index.js, que é a pasta que ele está
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== 'index.js'))) // filtrar arquivo que não começa com . e que não é o index.js
        .forEach(file => require(path.resolve(__dirname, file))(app)); // percorrer todos os arquivos que não entram no filtro
}