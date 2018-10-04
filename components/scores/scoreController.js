const mongoose = require('mongoose');
const Score = mongoose.model('Score');
const Round = mongoose.model('Round');
const Prediction = mongoose.model('Prediction');

exports.calcRoundScores = async (req, res) => {
  const { calcScore } = require('./score-helpers');
  const { round } = req.params;

  // Obtener todos los resultados de los partidos
  const matches = await Round.getAllPlayedMatchesOfGivenRound(round);
  // Buscar todos los pronósticos de la fecha
  const predictions = await Prediction.getAllPredictionsOfGivenRound(round);

  // Calcular

  Object.keys(predictions).map(async prediction => {
    const { user } = predictions[prediction];
    const points = await calcScore(predictions[prediction], matches, 13);
    const [{ total }] = points;
    const [, detail] = points;
    const score = new Score({
      round,
      user,
      total,
      detail
    });
    await score.save();
  });

  res.status(200).send('Se computaron correctamente los resultados');
};

exports.getUserResults = async (req, res) => {
  const user = req.params.user || req.user._id;
  console.log(user);

  const { round } = req.params;
  const [scores] = await Score.getResultOfGivenRoundAndUser(user, round);
  res.status(200).json(scores);
};
