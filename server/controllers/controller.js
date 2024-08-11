
const Question = require("../model/Question");
const Result = require("../model/Result");

// const {questions, answers} = require("../config/data");
const {question} = require("../config/data");

//QUESTION ROUTES

// Insert Questions (POST)

exports.insertQuestions = async (req, res) => {
    try {

        // const { questions, answers } = req.body;

        // const document = await Question.findById(req.params.id);
        // document.questions.push(...questions);
        // document.answers.push(...answers);
        // inserting many questions at once by insertMany function in DB

        // await Question.insertMany({
        //     question,
        //     answers,
        // })
        await Question.insertMany(question);
        return res.status(200).json({
            success: true,
            message: "Question Post Success",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to insert Question"
        })
    }
}


//GET all questions
exports.getQuestions = async (req, res) => {
    try {

        const q = await Question.find({});
        res.status(200).json({
            success: true,
            q,
            message: 'All Questions fetched succesfully'
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to get Question"
        })
    }
}



//Delete question(DELETE request)
exports.dropQuestions = async (req, res) => {
    try {
        //Deleting many questions at once by deleteMany function in DB
        await Question.deleteMany();
        return res.status(200).json({
            success: true,
            message: "Question Delete Success"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to delete Question"
        })
    }
}




//RESULT ROUTES

// GET ALL RESULTS
exports.getResult = async(req,res) =>{
    try {
        const r = await Result.find({});
        return res.status(200).json({
            success: true,
            message: "All Result Fetch Success",
            r,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to get Result"
        })
    }
}

// POST ALL RESULTS
exports.insertResult = async(req,res) =>{
    try {
        const {username,result,points} = req.body;

        if(!username && !result){
            return res.status(401).json({
                success: false,
                message: "Data not provided"
            })
        }

        // insert one document at a time so create()
        const op = await Result.create({
            username:username, result:result,points:points
        }) 
        return res.status(200).json({
            success: true,
            message: "Result post Success",
            op,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to post Result"
        })
    }
}

//Delete RESULT(DELETE request)
exports.dropResult = async (req, res) => {
    try {
        await Result.deleteMany();
        return res.status(200).json({
            success: true,
            message: "Result Delete Success"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to delete Result"
        })
    }
}