const mongoose = require("mongoose");

// this model store all questions and answer

const QuestionSchema = new mongoose.Schema({
    code:{
        type:Number,
    },
    questions : {
        type: Array,
        default : [],
    },
    answers : {
        type: Array,
        default : [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Question",QuestionSchema);