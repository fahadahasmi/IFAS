const mongoose = require('mongoose');

var GoogleUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const GoogleUser = mongoose.model("GoogleUser", GoogleUserSchema);

module.exports = GoogleUser;