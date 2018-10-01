const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  _id: { type: Number },
  email: { type: String, required: true },
  apiKey: { type: String, required: true }
});

module.exports = mongoose.model('Admin', adminSchema);
