
const mongoose = require('mongoose');

//jo bhi mein .env mein define kiya hoga wo sara load hojayega process object k andar
require("dotenv").config();

// the dbConnect() establishes connection b/w nodejs nd your database
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Successful Database connection");
    })
    .catch((error) => {
        console.log("Retry Connection");
        console.error(error.message);
        process.exit(1);
    })
} 

module.exports = dbConnect;