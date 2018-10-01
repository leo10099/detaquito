const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Match = mongoose.model('Match');

const roundSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: 'Se requiere el número de la fecha'
  },
  matches: [{ type: mongoose.Schema.ObjectId, ref: 'Match' }],
  predictions: [
    { type: mongoose.Schema.ObjectId, ref: 'Prediction', unique: true }
  ]
});

roundSchema.statics.getAllMatchesOfGivenRound = async function(round) {
  // Consultar por todos los partidos de una fecha dada sin resultados
  return await Match.find({ round, played: false }, '_id').sort('_id');
};

roundSchema.statics.getAllPlayedMatchesOfGivenRound = async function(round) {
  return await Match.find({ round, played: true }, [
    'home_goals',
    'away_goals'
  ]).sort('_id');
};

module.exports = mongoose.model('Round', roundSchema);
