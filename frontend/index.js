// Obtendo o Express
const express = require('express')
var app = express()

// Definimos a rota pública do front-end
app.use(express.static('public'));

// Iremos ouvir o servidor na porta especificada
app.listen(3001, function () {
    console.log(`\nServidor Web do Front-End rodando na porta 3001.`)
})