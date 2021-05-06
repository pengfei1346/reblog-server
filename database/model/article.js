const mongoose = require("mongoose");const article = new mongoose.Schema({    username: String,    author: String,    title: {        type: String,        index: 1    },    coverImgUrl: String,    abstract: String,    content: String,    heatNum: {        type: Number,        default: 0,    },    browseNum: {        type: Number,        default: 0,    },    replyNum: {        type: Number,        default: 0    },    tags: Array,    authorMsg: {        type: mongoose.Schema.Types.ObjectId,        ref: 'user'    }}, {versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}})module.exports = mongoose.model("article", article);