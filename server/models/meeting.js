const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema();

const Meeting = mongoose.model('meeting', meetingSchema);

module.exports = Meeting;