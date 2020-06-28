const mongoose = require('mongoose');
const schema = mongoose.Schema;

const WikiSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model( 'wikis' , WikiSchema );