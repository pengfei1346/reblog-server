const mongoose = require("mongoose");


const collection = new mongoose.Schema({
    username: String,
    mobile: String,
    content: {
        type: String,
    },
}, {versionKey: false});

module.exports = mongoose.model("collection", collection);
