const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const tourneySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Se requiere un nombre de Torneo"
  },
  number: {
    type: Number,
    required: "Se requiere un número de Torneo",
    unique: true
  },
  users: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  owner: { type: mongoose.Schema.ObjectId, ref: "User" },
  users_unconfirmed: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  start_on_round: Number,
  started: false
});

// Devolver cuál sera el siguiente numero de Torneo
tourneySchema.statics.getNextNumber = async function() {
  return (await this.countDocuments({})) + 1;
};

tourneySchema.statics.getUserUnconfirmedTourneys = async function(user) {
  const docs = await this.find({
    users_unconfirmed: user
  });
  return docs;
};

tourneySchema.statics.getUserConfirmedTourneys = async function(user) {
  const docs = await this.find({
    users: user
  });
  return docs;
};

tourneySchema.getMembersRankedByTotalPoints = async function(
  tourney,
  currentRound
) {};

module.exports = mongoose.model("Tourney", tourneySchema);
