const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const prodeConfigSchema = new mongoose.Schema({
  round: { type: Number, default: 1 },
  deadline: { type: Date }
});

module.exports = mongoose.model('ProdeConfig', prodeConfigSchema);
