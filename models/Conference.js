const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const conferenceSchema = new Schema({
    name: String,
    start: Date,
    end: Date,
    attendees: [User]
});

mongoose.model('Conference', conferenceSchema);
