const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Se requiere un nombre de equipo'
  },
  logo: String
});

teamSchema.index({
  team: 'text',
  description: 'text'
});

teamSchema.statics.allTeamsNames = async function() {
  const allTeams = await this.find({}, 'name');
  //return allTeams.map(team => team.name);
  return allTeams;
};

module.exports = mongoose.model('Team', teamSchema);
