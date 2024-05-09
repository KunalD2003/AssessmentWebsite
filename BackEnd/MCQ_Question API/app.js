require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const connectDB =require("./db/connect");
const cors = require('cors');

// Use CORS middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

const question_routes = require("./routes/question");
const contact_routes =require("./routes/contact");
const archievedexam_routes = require("./routes/archievedexam.js");
const userscore_routes = require("./routes/userscore.js");
app.get("/", (req, res) => {
  res.send("Hii, I am seeing MCQ question on screen");
});
//middle ware or to set router
app.use("/api/mcqquestions",question_routes);
app.use("/contacts",contact_routes);
app.use("/archievedexamresult",archievedexam_routes);
app.use("/result",userscore_routes);
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes I am Connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
