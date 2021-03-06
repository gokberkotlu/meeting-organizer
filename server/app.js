const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const meetingRoutes = require('./routes/meetingRoutes');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
const MONGODBURI = process.env.MONGODBURI;

mongoose.connect(MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(PORT))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('MEETING ORGANIZER');
});

app.use(meetingRoutes);
