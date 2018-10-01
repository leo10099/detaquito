const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Matches = mongoose.model('Match');

predictionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  round: { type: Number, required: true },
  predictions: ['Matches', Matches]
});

predictionSchema.statics.getAllPredictionsOfGivenRound = async function(round) {
  // Consultar por todas las predicciones de una fecha dada
  const p = await this.find({ round }).select('predictions user');
  return p;
};

module.exports = mongoose.model('Prediction', predictionSchema);
