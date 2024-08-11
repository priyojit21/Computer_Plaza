const express = require("express")
const router = express.Router();

const {getQuestions, insertQuestions, dropQuestions, getResult, insertResult, dropResult} = require("../controllers/controller");

//routes for questions
router.get("/questions",getQuestions);
router.post("/questions",insertQuestions);
router.delete("/questions",dropQuestions);

//routes for results
router.get("/result",getResult);
router.post("/result",insertResult);
router.delete("/result",dropResult);

module.exports = router