const Meeting = require('../models/meeting');

const listMeetings_get = async (req, res) => {
    // let limit = 2;
    // let skip = 0;

    // if(req.body.limit && req.body.limit > 0) {
    //     limit = req.body.limit
    // }
    // if(req.body.page && req.body.page > 0) {
    //     skip = req.body.page - 1;
    // }

    // Meeting.find({}, (err, data) => {
    //     if(err) {
    //         throw error;
    //     }
    //     data = {
    //         meetings: data
    //     }
    //     res.status(200).json(data);
    // }).limit(limit).skip(limit * skip);

    try {
        Meeting.find({}, (err, data) => {
        if(err) {
            throw error;
        }
        data = {
            meetings: data
        }
        res.status(200).json(data);
        });
    } catch(err) {
        res.status(400).json({
            error: err
        });
    }
}

const addMeeting_post = async (req, res) => {
    const meeting = new Meeting(req.body);

    console.log(req.body);
    
    try {
        meeting.save()
        .then(meeting => {
            res.status(200).json({
                info: "New meeting is created",
                meeting
            });
        });
    } catch(err) {
        res.status(400).json({
            error: err
        });
    }
}

const updateMeeting_put = async (req, res) => {
    const { id, subject, date, start_time, end_time, participants } = req.body;

    var meeting = await Meeting.findById(id);

    if(subject) {
        meeting.subject = subject;
    }
    
    if(date) {
        meeting.date = date;
    }

    if(start_time) {
        meeting.start_time = start_time;
    }

    if(end_time) {
        meeting.end_time = end_time;
    }

    if(participants) {
        meeting.participants = participants;
    }

    try {
        await meeting.save();
        res.status(200).json({
            info: "Meeting is editted"
        });
    } catch(err) {
        res.status(400).json({
            error: err
        });
    }
}

const deleteMeeting_delete = (req, res) => {
    const id = req.body.id;

    try {
        Meeting.findByIdAndRemove({
            _id: id
        })
        .then(meeting => {
            if(meeting) {
                res.status(200).json({
                    info: "Meeting is deleted"
                });
            } else {
                res.status(400).json({
                    info: "id is not valid"
                });
            }
        });
    } catch(err) {
        res.status(400).json({
            error: err
        });
    }
}

module.exports = {
    listMeetings_get,
    addMeeting_post,
    updateMeeting_put,
    deleteMeeting_delete
}