const { Router } = require('express');
const meetingController = require('../controllers/meetingController');
const paginatedResults = require('../middlewares/paginatedResults');
const Meeting = require('../models/meeting');

const router = Router();

router.get('/list-meetings', paginatedResults(Meeting), meetingController.listMeetings_get);

router.post('/add-meeting', meetingController.addMeeting_post);

router.put('/update-meeting', meetingController.updateMeeting_put);

router.delete('/delete-meeting', meetingController.deleteMeeting_delete);



module.exports = router;