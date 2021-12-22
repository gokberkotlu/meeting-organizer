const mongoose = require('mongoose');

// subject
// date
// start_time
// end_time
// participants
const meetingSchema = mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Enter meeting subject']
    },
    date: {
        type: Date,
        required: [true, 'Enter meeting date']
    },
    start_time: {
        type: String,
        required: [true, 'Enter start time']
    },
    end_time: {
        type: String,
        required: [true, 'Enter end time']
    },
    participants: {
        type: Array,
        required: [true, 'Enter the participants'],
        validate(value) {
            if(!(value.length > 0)) {
                throw new Error('At least one participant must be entered');
            }
        }
    }
});

const Meeting = mongoose.model('meeting', meetingSchema);

module.exports = Meeting;