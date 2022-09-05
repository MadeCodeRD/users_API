const mongoose = require('mongoose');

const subscribersSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Subscriber', subscribersSchema);