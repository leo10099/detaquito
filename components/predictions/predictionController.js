const mongoose = require('mongoose');
const Prediction = mongoose.model('Prediction');
const User = mongoose.model('User');

exports.getUserPrediction = async (req, res) => {
  const user = req.user._id;
  const { round } = req.params;

  const userPredictions = await Prediction.findOne({ user, round });

  res.status(200).json({ data: userPredictions });
};

exports.createPrediction = async (req, res) => {
  const user = req.user._id;
  const { round } = req.body;

  const newPrediction = await Prediction.findOneAndUpdate(
    { user },
    {
      user,
      predictions: Object.values(req.body.predictions),
      round
    },
    { upsert: true, new: true, runValidators: true }
  );

  // Chequear si es la primera vez que el usuario pronostica, si es así guardar el número de la fecha
  const userThatPredicted = await User.findOne(user);
  if (!userThatPredicted.firstRoundPredicted) {
    userThatPredicted.firstRoundPredicted = round;
    await userThatPredicted.save();
  }

  res.status(200).json({ newPrediction });
};
