const mongoose = require('mongoose');
const Team = mongoose.model('Team');

// GET

exports.getAllTeamsNames = async (req, res) => {
  const names = await Team.allTeamsNames();
  res.json({ data: names });
};

// POST

exports.createTeam = async (req, res) => {
  const team = await new Team(req.body);
  await team.save();
  res.json({ data: 'Se creó el equipo correctamente', team });
};
