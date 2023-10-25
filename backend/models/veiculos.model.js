const mongoose = require('mongoose');

const veiculoSchema = new mongoose.Schema({
  numContrato: Number,  // Número do contrato do veículo
  placa: String,        // Placa do veículo
  chassi: String,       // Número do chassi do veículo
  renavam: String,      // Número do RENAVAM
  carteira: String,     // Número da carteira do veículo
  veiculo: String,      // Marca e modelo do veículo
  corVeiculo: String,   // Cor do veículo
  dataEntrada: Date,    // Data de entrada do veículo
  ajuizamento: String,  // Ajuizamento do veículo (ajuizado ou não)
  userId: mongoose.Schema.Types.ObjectId,  // ID do usuário associado a este veículo
});

const Veiculo = mongoose.model('Veiculo', veiculoSchema);

module.exports = Veiculo;
