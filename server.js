const express = require("express");
const Axios = require("axios");
const mongoose = require("mongoose");
const Question = require("./model/question");
const assessmentRoutes = require("./assessmentRoutes");
// const loginRouter = require('./login');
const registrationRouter = require("./userRouting");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");

const ngrokSkipBrowserWarning = require("./Middleware ngrok/ngrokMiddleware");

var compiler = require("compilex");
var options = { stats: true }; //prints stats on console
compiler.init(options);

// const compiler = require('compiler-package');
const { exec } = require("child_process");

//complier
const { VM } = require("vm2");

const app = express();
// const vm = new VM();
const port = 3000; // Or any port you prefer

var cors = require("cors");
const bodyParser = require("body-parser");
const { error } = require("console");
const { TIMEOUT } = require("dns");
app.use(bodyParser.json());

app.use("/api", assessmentRoutes);
app.use("/api", registrationRouter);
// Apply the middleware to all API routes
app.use("/api", ngrokSkipBrowserWarning);
// Mount the login route
// app.use('/', loginRouter);

app.use(cors()); // Use this after the variable declaration
// Middleware to parse JSON data
// app.use(cors());
app.use(express.json());

const DB =
  "mongodb+srv://shivamv11:ydhz3eB6DLulZCIF@cluster0.i9kkmcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB using Mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the Express server after successful connection
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("Hello from about server");
});

app.get("/api/questions", async (req, res) => {
  try {
    // Your code to fetch questions from MongoDB collection
    const questions = await Question.find({});
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Error fetching questions");
  }
});

// POST endpoint to store new question data
app.post("/api/questions", async (req, res) => {
  try {
    const { questionId, question, problem, sectionType } = req.body;

    // Create a new question document using the Question model
    const newQuestion = new Question({
      questionId,
      question,
      problem,
      sectionType,
    });

    // Save the new question document to the database
    await newQuestion.save();

    res.status(201).send("Question saved successfully");
    console.log(" Problem added succeessfullly");
    console.log(newQuestion);
  } catch (error) {
    console.error("Error saving question:", error);
    res.status(500).send("Error saving question");
  }
});

// GET endpoint to list databases
app.get("/api/databases", async (req, res) => {
  try {
    const databaseList = await mongoose.connection.db.admin().listDatabases();
    res.json(databaseList.databases);
  } catch (error) {
    console.error("Error listing databases:", error);
    res.status(500).send("Error listing databases");
  }
});

// GET endpoint to fetch questions from a specific collection
app.get("/api/codingProblems", async (req, res) => {
  try {
    // Fetch questions from the "codingProblems" collection
    const questions = await Question.find({}).lean();
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Error fetching questions");
  }
});

// POST endpoint to store new question data in the "codingProblems" collection
app.post("/api/codingProblems", async (req, res) => {
  try {
    const { questionId, question, problem, sectionType, examples } = req.body;

    // Create a new question document using the Question model
    const newQuestion = new Question({
      questionId,
      question,
      problem,
      sectionType,
      examples,
    });

    // Save the new question document to the "codingProblems" collection
    await newQuestion.save();

    res.status(201).send("Question saved successfully");
    console.log("Question added successfully");
    console.log(newQuestion);
  } catch (error) {
    console.error("Error saving question:", error);
    res.status(500).send("Error saving question");
  }
});

// GET endpoint to fetch question and problem based on questionId
app.get("/api/codingProblems/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;

    // Find the document with the specified questionId
    const question = await Question.findOne(
      { questionId },
      { question: 1, problem: 1, examples: 1 }
    );

    if (!question) {
      return res.status(404).send("Question not found");
    }

    res.json(question); // Return only question and problem fields
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).send("Error fetching question");
  }
});


//compiler API

app.post("/compilex", (req, res) => {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;

  try {
    if (lang == "cpp") {
      if (!input) {
        //if windows
        var envData = { OS: "windows", cmd: "g++" ,options:{timeout:10000},}; // (uses g++ command to compile )

        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
          //data.error = error message
          //data.output = output value
        });
      } else {
        //if windows
        console.log("Input Data:", input);
        var envData = { OS: "windows", cmd: "g++" ,options:{timeout:10000},}; // (uses g++ command to compile )

        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang == "java") {
      if (!input) {
        //if windows
        var envData = { OS: "windows" ,options:{timeout:10000},};

        compiler.compileJava(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        //if windows
       
        console.log("Input Data:", input);
        var envData = { OS: "windows" };

        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else {
      if (!input) {
        var envData = { OS: "windows" };

        compiler.compilePython(envData, code, function (data) {
          console.log(data);
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        console.log("Input Data:", input);
        var envData = { OS: "windows" };

        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    }
  } catch (e) {
    console.log("error");
  }
});
