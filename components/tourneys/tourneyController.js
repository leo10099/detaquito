const mongoose = require('mongoose');
const Tourney = mongoose.model('Tourney');

exports.getTourneyData = async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  const tourney = await Tourney.findById({ _id }).populate(
    'users_unconfirmed users'
  );
  res.status(200).json({ tourney });
};

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

exports.editName = async (req, res) => {
  const { tourney, newName } = req.body;
  const owner = req.user._id;
  const t = await Tourney.findById(tourney);
  console.log(t.owner, owner);
  // Chequear que el cambio lo haga el owner del Torneo
  if (t.owner.toString() != owner) {
    return res
      .status(422)
      .json({ message: 'Sólo el creador del Torneo puede realizar cambios' });
  }
  // Guardar el nuevo nombre
  t.name = newName;
  await t.save();

  res.status(200).send(t);
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
  const tourney = await Tourney.findOneAndUpdate(
    { number },
    { $addToSet: { users_unconfirmed: user } },
    { new: true }
  );
  if (!tourney) {
    return res
      .status(400)
      .json({ error: 'El torneo que ingresaste no existe' });
  }
  res.status(200).json({ tourney });
};

exports.userLeave = async (req, res) => {
  const { _id, user } = req.body;

  const userWasUnconfirmed = await Tourney.findOne({
    _id,
    users_unconfirmed: user
  });
  if (userWasUnconfirmed) {
    await userWasUnconfirmed.update({ $pull: { users_unconfirmed: user } });
    return res.status(200).json({ data: 'Abandonaste el Torneo' });
  }

  const userWasConfirmed = await Tourney.findOne({ _id, users: user });

  if (userWasConfirmed) {
    await userWasConfirmed.update({ $pull: { users: user } });
    return res.status(200).json({ data: 'Abandonaste el Torneo' });
  }
};

// TODO --> Agregar chequeo para que sólo el dueño del grupo pueda aceptar y rechazar usuarios

exports.acceptUnconfirmedUser = async (req, res) => {
  const { _id, user } = req.body;

  await Tourney.findOneAndUpdate(
    { _id },
    { $pull: { users_unconfirmed: user } }
  );
  const tourney = await Tourney.findOneAndUpdate(
    { _id },
    { $addToSet: { users: user } },
    { new: true }
  );
  res.status(200).json({ tourney });
};

exports.rejectUnconfirmedUser = async (req, res) => {
  const { _id, user } = req.body;
  const tourney = await Tourney.findOneAndUpdate(
    { _id },
    { $pull: { users_unconfirmed: user } },
    { new: true }
  );
  res.status(200).json({ tourney });
};
