const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
  role: { type: String, default: 'user' },
  alias: {
    type: String,
    unique: true,
    trim: true,
    required: false,
    sparse: true
  },
  email: {
    type: String,
    required: 'Se necesita un email',
    trim: true,
    unique: true
  },
  facebookID: Number,
  googleID: Number,
  fav_team: { type: mongoose.Schema.ObjectId, Ref: 'Team' },
  avatar: String,
  firstRoundPredicted: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
