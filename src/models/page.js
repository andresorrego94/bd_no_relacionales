const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PageSchema = new mongoose.Schema({
    historyId: String,
    wikiId: String,
    title: String,
    creatorUsername: String,
    updateDate: Date,
    content: String,
    optionalMessage: String
});

module.exports = mongoose.model( 'Page' , PageSchema );