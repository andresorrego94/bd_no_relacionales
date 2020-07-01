const mongoose = require('mongoose');
const schema = mongoose.Schema;
const PageHistory = require('../models/pagehistory');

const PageHistorySchema = new mongoose.Schema({
    title: String,
    creatorUsername: String,
    updateDate: Date,
    content: String,
    optionalMessage: String
 });

 // const historySchema = new mongoose.Schema({
//     title: String,
//     creatorUsername: String,
//     updateDate: Date,
//     content: String,
//     optionalMessage: String
// });

const PageSchema = new mongoose.Schema({
    title: String,
    creatorUsername: String,
    updateDate: Date,
    content: String,
    optionalMessage: String,
    // history: [{
    //     type: schema.Types.ObjectId,
    //     ref: "PageHistory"
    // }]
    history: {
        type: [PageHistorySchema], 
        default: []
    }
});

module.exports = mongoose.model('Page', PageSchema);