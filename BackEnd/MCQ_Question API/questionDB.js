require("dotenv").config();
const connectDB = require("./db/connect");
const question =require("./models/question");

const questionJson = require("./question.json");

const start =async() =>{
    try{
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany();
        await question.create(questionJson);
        console.log("success");
    }
    catch(error){
        console.log(error);
    }
};

start();
