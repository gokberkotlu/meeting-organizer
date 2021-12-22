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
    res.json(res.paginatedResults);
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

const updateMeeting_put = (req, res) => {}

const deleteMeeting_delete = (req, res) => {}

module.exports = {
    listMeetings_get,
    addMeeting_post,
    updateMeeting_put,
    deleteMeeting_delete
}