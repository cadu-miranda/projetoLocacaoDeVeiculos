const mongoose = require('mongoose');

// Criando o Schema Veiculo
const VeiculoSchema = mongoose.Schema({

    placa: {

        type: String,
        unique: true,
        minlength: [8, 'A placa é muito curta.'],
        maxlength: [9, 'A placa é muito longa.'],
        required: [true, 'A placa é obrigatória!'],
        validate: {
            validator: function (valPlaca) {
                return /^([a-zA-Z]{3}(-)[0-9]{4})|([a-zA-Z]{3}(-)[a-zA-Z0-9]{4})$/.test(valPlaca);
            },
            message: props => props.value + ' não é uma placa válida!'
        }

    },

    ano: {

        type: String,
        minlength: [9, 'O ano é muito curto.'],
        maxlength: [11, 'O ano é muito longo.'],
        required: [true, 'O ano e obrigatório'],
        validate: {
            validator: function (valAno) {
                return /^(19|20)[0-9]{2}(\/)((19|20)[0-9]{2})$/.test(valAno)
            }
        }
    },

    modelo: {

        type: String,
        required: [true, 'Por favor, informe o modelo.'],
        minlength: [2, 'O modelo deve conter no mínimo 2 caracteres!'],
        maxlength: [30, 'O modelo deve conter no máximo 30 caracteres!']

    },

    descricao: {

        type: String,
        required: [true, 'Por favor, informe a descrição.'],
        maxlength: [1000, 'A descrição é muito longa.']

    },

    preco: Number

},

    {
        timestamps: true
    });

VeiculoSchema.index({

    descricao: 'text',
    modelo: 'text'

}, {
    weights: {

        descricao: 5,
        modelo: 4
    },
});

module.exports = mongoose.model('Veiculos', VeiculoSchema);
