module.exports = (app) => {

    const veiculos = require('../controllers/veiculo.controller.js');

    // Cria um novo veículo
    app.post('/veiculos', veiculos.create);

    // lista todos os veiculos
    app.get('/veiculos', veiculos.findAll)

    // lista apenas um veículo pelo ID
    app.get('/veiculos/:vehicleID', veiculos.findOne)

    //lista os veiculos pelo texto
    app.get('/veiculos/texto/:veiculoTexto', veiculos.findByTexto)

    //lista pela placa
    app.get('/veiculos/placa/:buscaPlaca', veiculos.findByPlaca)

    //altera um veículo existente pelo id
    app.put('/veiculos/:vehicleID', veiculos.update)

    //apaga um veículo existente pelo id
    app.delete('/veiculos/:vehicleID', veiculos.delete)

}