require("dotenv").config();
const express = require("express");
const app = express();
const connectDB =require("./db/connect");
const cors = require('cors');

// Use CORS middleware
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 3000;

const question_routes = require("./routes/question");

app.get("/", (req, res) => {
  res.send("Hii, I am seeing MCQ question on screen");
});
//middle ware or to set router
app.use("/api/mcqquestions",question_routes);

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
