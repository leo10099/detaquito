const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const matchSchema = new mongoose.Schema({
  round: {
    type: Number,
    required: true
  },
  home_team: { type: mongoose.Schema.ObjectId, ref: 'Team' },
  away_team: { type: mongoose.Schema.ObjectId, ref: 'Team' },
  home_goals: { type: Number },
  away_goals: { type: Number },
  played: { type: Boolean, default: false }
});

matchSchema.index({
  round: 1
});

function autopopulate(next) {
  this.populate('home_team');
  this.populate('away_team');
  next();
}

matchSchema.pre('find', autopopulate);
matchSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Match', matchSchema);
