
const express = require("express");
const app = express();
const cors = require("cors")
const morgan = require("morgan")
require('dotenv').config();

//accesing env file
const PORT = process.env.PORT || 8080;

//connecting to database 
const dbConnect = require("./config/database");
dbConnect();

//middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


const QuestionRoutes = require("./routes/route");

app.use("/api/v1",QuestionRoutes);


app.listen(PORT, ()=> {
    console.log(`Server up at ${PORT}`);
})