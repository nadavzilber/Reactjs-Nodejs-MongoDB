const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');
const { addVideoValidation } = require('../validation');

router.get('/', verify, async (req, res) => {
    const user = await User.findById({ _id: req.user._id });
    //only return the videos for this user
    res.send(user);
})

router.post('/addVideo', verify, async (req, res) => {
    //Validate input
    const { error } = addVideoValidation(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    //Get all user videos
    const user = await User.findById({ _id: req.user._id });

    //Does the video exist?
    if (Object.values(user.videos).indexOf(req.body.url) > -1) {
        return res.status(400).send({ error: 'This URL already exists' });
    }

    //Add the new URL to the user's videos
    user.videos.push(req.body.url)

    //Save it in the DB
    try {
        const savedUser = await user.save();
        res.status(200).send({ url: req.body.url, user: savedUser });
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

module.exports = router;