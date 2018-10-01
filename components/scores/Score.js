const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const scoreSchema = new mongoose.Schema({
  round: { type: Number, default: 1, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  total: Number,
  detail: Object
});

scoreSchema.statics.getResultOfGivenRoundAndUser = async function(user, round) {
  // Consultar por el resultado de una fecha y un usuario en particular
  return this.find({ round, user });
};

module.exports = mongoose.model('Score', scoreSchema);
