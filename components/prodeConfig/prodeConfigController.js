const mongoose = require('mongoose');
const ProdeConfig = mongoose.model('ProdeConfig');

// VIEW
exports.configRound = (req, res) => {
  res.render('configRound', { title: 'Administrar Fecha' });
};

// GET

exports.getConfigRound = async (req, res) => {
  const config = await ProdeConfig.findOne();
  res.send(config);
};

// POST
exports.setConfigRound = async (req, res) => {
  const fecha = await ProdeConfig.findOne();
  if (!fecha) {
    const config = await new ProdeConfig(req.body).save();
    res.send(config);
  }
  fecha.round = req.body.round;
  fecha.deadline = req.body.deadline;
  await fecha.save();
  res.send(fecha);
};
