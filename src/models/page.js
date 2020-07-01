const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageHistorySchema = new Schema({
  title: String,
  creatorUsername: String,
  updateDate: Date,
  content: String,
  optionalMessage: String
});

const PageSchema = new mongoose.Schema({
  title: String,
  creatorUsername: String,
  updateDate: Date,
  content: String,
  optionalMessage: String,
  history: {
    type: [PageHistorySchema],
    default: []
  }
});

module.exports = mongoose.model('Page', PageSchema);
