const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PageSchema = new mongoose.Schema({
    wiki:{
        type: schema.Types.ObjectId,
        ref: "Wiki"
    },
    title: String,
    creatorUsername: String,
    updateDate: Date,
    content: String,
    optionalMessage: String, 
    pageHistory: [{
        type: schema.Types.ObjectId,
        ref: "Page"
    }]
});

module.exports = mongoose.model( 'Page' , WikiSchema );