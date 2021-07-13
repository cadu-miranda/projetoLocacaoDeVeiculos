const Veiculo = require('../models/veiculo.model.js');

exports.create = (req, res) => {

    if (!req.body) {

        return res.status(400).send({
            message: "Os dados para criar o aluguel não podem estar vazios!"
        });
    }

    const veiculo = new Veiculo(req.body);

    veiculo.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            if (err.message.indexOf('duplicate key error') !== -1) {
                res.status(500).send({
                    message: "Os dados informados já existem na base de dados." || err.message
                });
            } else
                res.status(500).send({
                    message: err.message || "Ocorreu algo errado ao salvar os novos dados."
                });
        });
};

exports.findAll = (req, res) => {
    Veiculo.find()
        .sort({ placa: 1 }) //para trazer em ordem descendente, passe -1    
        .then(veiculos => {
            res.send(veiculos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algo errado ao obter os dados do Banco de Dados."
            });
        });
};

exports.findByTexto = (req, res) => {
    const termo = req.params.veiculoTexto
    Veiculo.find({
        $text: { $search: termo }, //iremos obter o termo a ser pesquisado e aplicá-lo em nosso índice.
    })
        .sort({ placa: 1 }) //para trazer em ordem descendente, passe -1    
        .then(veiculos => {
            res.send(veiculos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algo errado ao obter os dados do Banco de Dados."
            });
        });
};

//procura pela placa
exports.findByPlaca = (req, res) => {
    const placaBusca = req.params.buscaPlaca
    Veiculo.find(
        { placa: placaBusca }, { placa: 1, descricao: 1 },
        //iremos obter o termo a ser pesquisado e aplicá-lo em nosso índice.
    )
        .sort({ placa: 1 }) //para trazer em ordem descendente, passe -1    
        .then(veiculos => {
            res.send(veiculos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algo errado ao obter os dados do Banco de Dados."
            });
        });
};

// Localizar um único produto a partir do ID
exports.findOne = (req, res) => {
    Veiculo.findById(req.params.vehicleID)
        .then(veiculo => {
            if (!veiculo) {
                return res.status(404).send({
                    message: "Veículo não encontrado com o ID " + req.params.vehicleID
                });
            }
            res.send(veiculo);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Veículo não encontrado com o ID " + req.params.vehicleID
                });
            }
            return res.status(500).send({
                message: "Aconteceu algo errado ao obter o veículo com o ID " + req.params.vehicleID
            });
        });
};

// Alterando um veiculo
exports.update = (req, res) => {
    // Validando se veio algo junto a requisição
    if (!req.body) {
        return res.status(400).send({
            message: "Conteúdo para alterar o cadastro não pode estar vazio!"
        });
    }

    // Localiza e alteramos os dados do veiculo a partir do conteúdo da requisição
    Veiculo.findByIdAndUpdate(req.params.vehicleID,
        {
            placa: req.body.placa,
            ano: req.body.ano,
            modelo: req.body.modelo,
            descricao: req.body.descricao,
            preco: req.body.preco

        }, { new: true }) //iremos trazer o resultado do novo registro alterado
        .then(veiculo => {
            if (!veiculo) {
                return res.status(404).send({
                    message: "Veículo não encontrado com o ID " + req.params.vehicleID
                });
            }
            res.send(veiculo);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Veículo não encontrado com o ID " + req.params.vehicleID
                });
            }
            return res.status(500).send({
                message: "Aconteceu algo errado ao tentar alterar o veículo com o ID " + req.params.vehicleID
            });
        });
};

// Apaga um determinado veiculo a partir do ID passado

exports.delete = (req, res) => {
    Veiculo.findByIdAndRemove(req.params.vehicleID)
        .then(veiculo => {
            if (!veiculo) {
                return res.status(404).send({
                    message: "Veículo não encontrado com o ID " + req.params.vehicleID
                });
            }
            res.send({ message: "Veículo removido com sucesso!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Veículo não encontrado com o ID " + req.params.vehicleID
                });
            }
            return res.status(500).send({
                message: "Não foi possível apagar o veículo com o ID " + req.params.vehicleID
            });
        });
};
