const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
    username : {
        type: String,
    },
    result: {
        type: Array,
        default:[],
    },
    points: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Result",ResultSchema);