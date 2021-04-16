let mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    express = require('express'),
    router = express.Router();

const contactSchema = require('../models/Contact');

router.use(bodyParser.json());

// Get All Contacts
router.route('/')
    .get((req, res, next) => {
        contactSchema
            .find({})
            .then(
                (contacts) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(contacts);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        contactSchema.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

router.route('/addContact')
    .post((req, res, next) => {
        contactSchema.create(req.body)
            .then(contact => {
                console.log('Contact Created ', contact);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(contact)
            }, err => next(err))
            .catch(err => next(err));
    });

router.route('/:contactId')
    .get((req, res, next) => {
        contactSchema.findById(req.params.contactId)
            .then((contact) => {
                if (contact != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(contact);
                } else {
                    err = new Error('Contact ' + req.params.contactId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, err => next(err))
            .catch((err) => next(err));
    });

router.route('/:contactId/messages')
    .get((req, res, next) => {
        contactSchema.findById(req.params.contactId)
            .then((contact) => {
                if (contact != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(contact.messages);
                }
                else {
                    err = new Error('Contact ' + req.params.contactId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        contactSchema.findById(req.params.contactId)
            .then((contact) => {
                if (contact != null) {
                    contact.messages.push(req.body);
                    contact.save()
                        .then((contact) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(contact);
                        }, (err) => next(err));
                }
                else {
                    err = new Error('Contact ' + req.params.contactId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        contactSchema.findById(req.params.contactId)
            .then((contact) => {
                if (contact != null) {
                    for (var i = (contact.messages.length - 1); i >= 0; i--) {
                        contact.messages.id(contact.messages[i]._id).remove();
                    }
                    contact.save()
                        .then((contact) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(contact);
                        }, (err) => next(err));
                }
                else {
                    err = new Error('Dish ' + req.params.contactId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = router;
