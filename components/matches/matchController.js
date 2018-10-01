const mongoose = require('mongoose');
const Match = mongoose.model('Match');
const Team = mongoose.model('Team');

// VIEW
exports.createMatchForm = async (req, res) => {
  const listaDeEquipos = await Team.allTeamsNames();
  res.render('createMatch', { title: 'Cargar Fecha', listaDeEquipos });
};

//POST
exports.createMatch = async (req, res) => {
  Object.keys(req.body).map(async key => {
    // Ignorar Key "round"
    if (key === 'round') {
      return;
    }
    const match = new Match({
      round: req.body.round,
      home_team: req.body[key][0],
      away_team: req.body[key][1]
    });
    await match.save();
  });
  res.send('Se crearon todos los partidos');
};
