const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PageHistorySchema = new mongoose.Schema({
            title: String,
            creatorUsername: String,
            updateDate: Date,
            content: String,
            optionalMessage: String             
});

module.exports = mongoose.model( 'PageHistory' , PageHistorySchema );