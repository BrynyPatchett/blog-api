
const mongoose = require("mongoose")
require("dotenv").config();

const DB_URL = process.env.DB_URL;

mongoose.set("strictQuery",false);

function connectDB(){

    async function main(){
    await mongoose.connect(DB_URL);
    console.log("Database Connected")
    }

    main().catch(err => {
        console.log("Error Connecting to Database: " + err)
    })
}

module.exports = connectDB;
