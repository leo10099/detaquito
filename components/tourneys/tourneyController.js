const mongoose = require("mongoose");
const Tourney = mongoose.model("Tourney");
const Score = mongoose.model("Score");

exports.getTourneyData = async (req, res) => {
  const { _id } = req.params;
  const tourney = await Tourney.findById({ _id }).populate(
    "users_unconfirmed users"
  );
  res.status(200).json({ tourney });
};

exports.getMembersRankedByTotalPoints = async (req, res) => {
  const { _id, current } = req.query;

  const tourney = await Tourney.findById(_id);
  let rounds_to_compute = [...Array(25).keys()];

  // Encontrar las fechas que se van a competir en el Torneo y armar un array con ese rango

  rounds_to_compute = rounds_to_compute.slice(tourney.start_on_round, current);

  // Sumar los totales de las fechas correspondientes, sólo si hay fechas a computar

  if (!rounds_to_compute.length) {
    return res.status(422).json({ message: "El torneo no está activo" });
  }

  const scores = await Score.aggregate([
    {
      $match: {
        round: {
          $gte: rounds_to_compute[0],
          $lte: rounds_to_compute[rounds_to_compute.length - 1]
        }
      }
    },
    { $group: { _id: "$user", count: { $sum: "$total" } } },
    { $sort: { count: -1 } },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    {
      $project: {
        count: 1,
        alias: "$user.alias",
        avatar: "$user.avatar",
        fav_team: "$user.fav_team",
        _id: 0
      }
    }
  ]);

  return res.status(200).json({ scores, tourney });
};

exports.getMembersRankedByLastRound = async (req, res) => {
  const { _id, current } = req.query;

  let tourney = await Tourney.findById(_id);
  let rounds_to_compute = [...Array(25).keys()];

  // Encontrar las fechas que se van a competir en el Torneo y armar un array con ese rango

  rounds_to_compute = rounds_to_compute.slice(tourney.start_on_round, current);

  // Consultar por el último resultado, sólo si hay fechas a computar

  if (!rounds_to_compute.length) {
    return res.status(422).json({ message: "El torneo no está activo" });
  }

  const scores = await Score.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    {
      $project: {
        round: 1,
        total: 1,
        alias: "$user.alias",
        avatar: "$user.avatar",
        fav_team: "$user.fav_team"
      }
    },
    {
      $match: {
        round: {
          $eq: rounds_to_compute[rounds_to_compute.length - 1]
        }
      }
    },
    { $sort: { total: -1 } }
  ]);

  return res.json({ scores, tourney });
};

exports.createTourney = async (req, res) => {
  const owner = req.user._id;
  const { name, start_on_round } = req.body;

  const number = await Tourney.getNextNumber();

  const tourney = await new Tourney({
    name,
    number,
    owner,
    users: [owner],
    start_on_round
  });
  await tourney.save((err, newT) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json({ data: newT });
  });
};

exports.editName = async (req, res) => {
  const { tourney, newName } = req.body;
  const owner = req.user._id;
  const t = await Tourney.findById(tourney);

  // Chequear que el cambio lo haga el owner del Torneo
  if (t.owner.toString() != owner) {
    return res
      .status(422)
      .json({ message: "Sólo el creador del Torneo puede realizar cambios" });
  }
  // Guardar el nuevo nombre
  t.name = newName;
  await t.save();

  res.status(200).send(t);
};

exports.editRoundStart = async (req, res) => {
  const { tourney, newStartOnRound } = req.body;

  const owner = req.user._id;
  const t = await Tourney.findById(tourney);

  // Chequear que el cambio lo haga el owner del Torneo
  if (t.owner.toString() != owner) {
    return res
      .status(422)
      .json({ message: "Sólo el creador del Torneo puede realizar cambios" });
  }
  // Guardar la nueva fecha de inicio
  t.start_on_round = Number(newStartOnRound);
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
      .json({ error: "El torneo que ingresaste no existe" });
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
    return res.status(200).json({ data: "Abandonaste el Torneo" });
  }

  const userWasConfirmed = await Tourney.findOne({ _id, users: user });

  if (userWasConfirmed) {
    await userWasConfirmed.update({ $pull: { users: user } });
    return res.status(200).json({ data: "Abandonaste el Torneo" });
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
