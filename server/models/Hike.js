const mongoose = require('mongoose');

const hikeSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  difficulty: Number,
  type: String,
  distance: Number,
  location: String,
  date: Date,
  notes: String,
  crowds: Number,
});

module.exports = mongoose.model('Hike', hikeSchema);
