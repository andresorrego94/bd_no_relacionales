const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageHistorySchema = new Schema({
  title: String,
  creatorUsername: String,
  updateDate: Date,
  content: String,
  optionalMessage: String
});

module.exports = mongoose.model('PageHistory', PageHistorySchema);
