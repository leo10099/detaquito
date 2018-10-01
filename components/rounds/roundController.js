const mongoose = require('mongoose');
const Round = mongoose.model('Round');
const Match = mongoose.model('Match');
const ObjectID = mongoose.Types.ObjectId;

exports.createRoundForm = async (req, res) => {
  res.render('createRound', { title: 'Crear Fecha' });
};

exports.createRound = async (req, res) => {
  const { round } = req.body;

  const response = await Round.getAllMatchesOfGivenRound(round);
  const newRound = new Round({ _id: round, matches: response });

  await newRound.save();
  res.json({ data: 'Se creó la fecha correctamente', newRound });
};

exports.getRound = async (req, res) => {
  const { round } = req.params;

  const response = await Round.findOne({ _id: round }).populate('matches');
  res.json({ data: response });
};

exports.getPlayedRound = async (req, res) => {
  const { round } = req.params;
  const response = await Round.getAllPlayedMatchesOfGivenRound(round);
  res.status(200).json(response);
};

exports.updateRound = async (req, res) => {
  const { id: prediction, round } = req.body;
  // Si el ID de pronóstico no está en la lista de pronósticos de la fecha, agregarlo con $addToSet
  await Round.findOne(round).update({
    $addToSet: { predictions: ObjectID(prediction) }
  });

  res.send('Se guardó el pronóstico correctamente');
};

exports.inputRoundResultsForm = async (req, res) => {
  const { roundnum } = req.params;

  const allMatches = await Round.getAllMatchesOfGivenRound(roundnum);

  return res.render('inputRoundResults', {
    title: 'Ingresar resultados de los partidos de la Fecha',
    allMatches,
    roundnum
  });
};

exports.inputRoundResults = async (req, res) => {
  Object.keys(req.body).map(obj => Match.insertMany(req.body[obj]));
  res.send('Se guardaron los partidos con resultados correctamente');
};
