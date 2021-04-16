var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        default: 'self'
    },
}, {
    timestamps: true
});

var contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: {
        type: String,
        required: true
    },
    group: {
        type: Boolean,
        default: false
    },
    messages: [messageSchema]

});

module.exports = mongoose.model('Contact', contactSchema);