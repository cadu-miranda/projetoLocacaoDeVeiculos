const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Definindo como iremos dar o parse em nossas requisições (requests)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Conectando ao MongoDB        
mongoose.Promise = global.Promise;
mongoose.connect(config.urlMongodbLocal, {

    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true

}).then(() => {
    console.log("Conexão efetuada com sucesso ao MongoDB!");
}).catch(err => {
    console.log('Não foi possível estabelecer a conexão ao MongoDB!', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ "message": "Seja bem-vindo a API - " + config.nomeAPI + " - versão " + config.versaoAPI });
});

require('./src/routes/veiculo.routes.js')(app);

if (require.main === module) {

    // Ouvindo na porta especificada
    app.listen(config.portaServidor, () => {
        console.log('\nServidor Web está ouvindo na porta ' + config.portaServidor + '.');
    });
}