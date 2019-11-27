const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER
router.post('/register', async (req, res) => {
    //Validate input
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    //Does the user exist?
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
        return res.status(400).send({ error: 'Email already exists!' })
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        videos: []
    });

    //save it in the DB
    try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
        res.status(200).send({ token: token });
    } catch (err) {
        res.status(400).send({ error: err })
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    //Validate input
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    //Does the user exist?
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send({ error: 'Email or password is wrong' });
    }

    //Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send({ error: 'Email or password is wrong' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    return res.status(200).send({ user: user, token: token });

});


module.exports = router;