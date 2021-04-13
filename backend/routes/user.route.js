let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// User Model
let userSchema = require('../models/User');

// Register User
router.route('/register').post((req, res, next) => {
    userSchema.findOne({ username: req.body.username })
        .then((user) => {
            if (user != null) {
                var err = new Error('User ' + req.body.username + ' already exists!');
                err.status = 403;
                next(err);
            }
            else {
                return userSchema.create({
                    username: req.body.username,
                    password: req.body.password
                });
            }
        })
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ status: 'Registration Successful!', user: user });
        }, (err) => next(err))
        .catch((err) => next(err));
});

// User Login
router.route('/login').get((req, res, next) => {
    userSchema.findOne(req.body)
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        }, (err) => next(err))
        .catch((err) => next(err));
})

// Get All User 
router.route('/getAll').get((req, res) => {
    userSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;