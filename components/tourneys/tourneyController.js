const mongoose = require('mongoose');
const Tourney = mongoose.model('Tourney');
const ObjectID = mongoose.Types.ObjectId;

exports.createTourney = async (req, res) => {
  const owner = req.user._id;
  const { name } = req.body;

  const number = await Tourney.getNextNumber();

  const tourney = await new Tourney({
    name,
    number,
    owner,
    users: [owner]
  });
  await tourney.save((err, newT) => {
    if (err) {
      return res.status(400);
    }
    res.status(200).json({ data: newT });
  });
};

exports.getUserTourneys = async (req, res) => {
  const { u: _id } = req.query;
  const confirmed = await Tourney.getUserConfirmedTourneys(_id);
  const unconfirmed = await Tourney.getUserUnconfirmedTourneys(_id);
  const response = { confirmed, unconfirmed };
  res.status(200).json(response);
};

exports.addUnconfirmedUser = async (req, res) => {
  const { number } = req.body;
  const user = req.user._id;
  const tourney = await Tourney.findOne({ number });
  if (!tourney) {
    return res
      .status(400)
      .json({ error: 'El torneo que ingresaste no existe' });
  }
  await tourney.update({
    $addToSet: { users_unconfirmed: user }
  });
  res.status(200).json({ tourney });
};
