const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;
const url_str = String(url);

const connectDB = async () => {
    try {
        await mongoose.connect(url_str,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected To DB Successfully...");
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB;