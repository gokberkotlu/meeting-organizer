const Meeting = require('../models/meeting');

const listMeetings_get = async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;

    try {
        // execute query with page and limit values
        const meetings = await Meeting.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

        // get total documents in the Posts collection 
        const count = await Meeting.countDocuments();

        // return response with meetings, total pages, and current page
        res.json({
        meetings,
        totalPages: Math.ceil(count / limit),
        currentPage: page
        });
    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
}

const addMeeting_post = async (req, res) => {
    
    try {
        const meeting = new Meeting(req.body);
        meeting.save()
        .then(meeting => {
            res.status(200).json({
                info: "New meeting is created",
                meeting
            });
        }).catch(err => {
            res.status(400).json({
                error: err
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

    try {
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

        meeting.save()
        .then(meeting => {
            res.status(200).json({
                info: "Meeting is editted",
                meeting
            });
        }).catch(err => {
            res.status(400).json({
                error: err
            });
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