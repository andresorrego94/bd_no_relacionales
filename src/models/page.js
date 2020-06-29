const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PageSchema = new mongoose.Schema({
    wiki:{
        type: schema.Types.ObjectId,
        ref: "Wiki"
    },
    // pageHistory:{
    //     type: schema.Types.ObjectId,
    //     ref: "PageHistory"
    // },
    title: String,
    creatorUsername: String,
    updateDate: Date,
    content: String,
    optionalMessage: String
});

module.exports = mongoose.model( 'Page' , PageSchema );