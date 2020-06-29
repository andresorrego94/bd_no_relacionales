const mongoose = require('mongoose');
const schema = mongoose.Schema;

const WikiSchema = new mongoose.Schema({
    repositoryId: String,
    wiki: [{
        type: schema.Types.ObjectId,
        ref: "Page"
    }]
});

module.exports = mongoose.model( 'Wiki' , WikiSchema );