require("dotenv").config();
const express = require("express");
const Axios = require("axios");
const mongoose = require("mongoose");
const Question = require("./model/question");
const assessmentRoutes = require("./assessmentRoutes");
// const loginRouter = require('./login');
const registrationRouter = require("./userRouting");

const async = require("async");

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
// const port = 3000; // Or any port you prefer

var cors = require("cors");
const bodyParser = require("body-parser");
const { error } = require("console");
const { TIMEOUT } = require("dns");
app.use(cors()); // Use this after the variable declaration
// Middleware to parse JSON data
// app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", assessmentRoutes);
app.use("/api", registrationRouter);
// Apply the middleware to all API routes
app.use("/api", ngrokSkipBrowserWarning);
// Mount the login route
// app.use('/', loginRouter);

// const DB =
  // "mongodb+srv://shivamv11:ydhz3eB6DLulZCIF@cluster0.i9kkmcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB using Mongoose

// const PORT=process.env.PORT || 3000;
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");

//     // Start the Express server after successful connection
//     app.listen(port, () => {
//       console.log(`App listening at http://localhost:${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// Middleware setup, routes, etc. go here...

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL; // Load MongoDB URL from environment variable

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});



// POST endpoint to store new question data

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

// DELETE endpoint to delete a question based on questionId
app.delete("/api/codingProblems/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;

    // Find and delete the document with the specified questionId
    const deletedQuestion = await Question.findOneAndDelete({ questionId });

    if (!deletedQuestion) {
      return res.status(404).send("Question not found");
    }

    res.json(deletedQuestion); // Return the deleted question document
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).send("Error deleting question");
  }
});


app.put("/api/codingProblems/:questionId", async (req, res) => {
  try {
      const { questionId } = req.params;
      const { question, problem, examples } = req.body;

      if (!question || !problem || !examples) {
          return res.status(400).send("Invalid request body");
      }

      const updatedQuestion = await Question.findOneAndUpdate(
          { questionId: questionId }, 
          { question, problem, examples },
          { new: true } 
      );

      if (!updatedQuestion) {
          return res.status(404).send("Question not found");
      }

      res.status(200).send("Question updated successfully");
      console.log("Question updated successfully");
      console.log(updatedQuestion);
  } catch (error) {
      console.error("Error updating question:", error);
      res.status(500).send("Error updating question");
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
        var envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        }; // (uses g++ command to compile )

        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "syntax error" });
          }
          //data.error = error message
          //data.output = output value
        });
      } else {
        //if windows
        console.log("Input Data:", input);
        var envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        }; // (uses g++ command to compile )

        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: " Syntax error" });
          }
        });
      }
    } else if (lang == "java") {
      if (!input) {
        //if windows
        var envData = { OS: "windows", options: { timeout: 10000 } };

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
            res.send({ output: "syntax error" });
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
            res.send({ output: "syntax error" });
          }
        });
      } else {
        console.log("Input Data:", input);
        var envData = { OS: "windows" };

        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "syntax error" });
          }
        });
      }
    }
  } catch (e) {
    console.log("error");
  }
});

app.post("/test", (req, res) => {
  var code = req.body.code;
  var lang = req.body.lang;
  var publicTestCases = req.body.publicTestCases;
  var hiddenTestCases = req.body.hiddenTestCases;
  // Iterate over publicTestCases object
  for (const key in publicTestCases) {
    if (publicTestCases.hasOwnProperty(key)) {
      const value = publicTestCases[key];
      // Perform operations with key and value
      console.log(value);
    }
  }

  // Iterate over hiddenTestCases object
  for (const key in hiddenTestCases) {
    if (hiddenTestCases.hasOwnProperty(key)) {
      const value = hiddenTestCases[key];
      // Perform operations with key and value\
      console.log(value);
    }
  }
  try {
    if (lang == "cpp") {
      var publicEnvData = {
        OS: "windows",
        cmd: "g++",
        options: { timeout: 10000 },
      };
      var publicOutputs = [];

      async.eachSeries(
        publicTestCases,
        (testCase, callback) => {
          console.log("Executing Public Test Case ID:", testCase.id);
          console.log("Input : ", testCase.input);
          compiler.compileCPPWithInput(
            publicEnvData,
            code,
            testCase.input,
            function (publicData) {
              console.log(
                "Public Test Case ID:",
                testCase.id,
                "Output:",
                publicData.output
              );
              if (publicData.error) {
                console.log(
                  "Error in Public Test Case ID:",
                  testCase.id,
                  publicData.error
                );
              } else {
                publicOutputs.push({
                  id: testCase.id,
                  output: publicData.output,
                });
              }
              callback(); // Move to the next test case
            }
          );
        },
        (err) => {
          if (err) {
            console.log("Error in Public Test Cases:", err);
            res.status(400).send({ output: err });
          } else {
            // Execute hidden test cases similarly
            var hiddenEnvData = {
              OS: "windows",
              cmd: "g++",
              options: { timeout: 10000 },
            };
            var hiddenOutputs = [];

            async.eachSeries(
              hiddenTestCases,
              (testCase, callback) => {
                console.log("Executing Hidden Test Case ID:", testCase.id);
                compiler.compileCPPWithInput(
                  hiddenEnvData,
                  code,
                  testCase.input,
                  function (hiddenData) {
                    console.log(
                      "Hidden Test Case ID:",
                      testCase.id,
                      "Output:",
                      hiddenData.output
                    );
                    if (hiddenData.error) {
                      console.log(
                        "Error in Hidden Test Case ID:",
                        testCase.id,
                        hiddenData.error
                      );
                    } else {
                      hiddenOutputs.push({
                        id: testCase.id,
                        output: hiddenData.output,
                      });
                    }
                    callback(); // Call callback to move to the next test case
                  }
                );
              },
              (err) => {
                if (err) {
                  console.log("Error in Hidden Test Cases:", err);
                  res.status(400).send({ output: err });
                } else {
                  console.log("All test cases executed successfully.");
                  console.log("Public Test Case Outputs:", publicOutputs);
                  console.log("Hidden Test Case Outputs:", hiddenOutputs);
                  res.send({
                    publicOutputs: publicOutputs,
                    hiddenOutputs: hiddenOutputs,
                  });
                }
              }
            );
          }
        }
      );
    } else if (lang == "java") {
      // Similar logic for Java and other languages
    } else {
      res.status(400).send({ output: "Unsupported language" });
    }
  } catch (e) {
    console.log("Error:", e);
    res.status(500).send({ output: "Internal Server Error" });
  }
});

app.post("/test2", async (req, res) => {
  const { code, lang, publicTestCases, hiddenTestCases } = req.body;

  try {
    if (lang === "cpp") {
      const publicEnvData = {
        OS: "windows",
        cmd: "g++",
        options: { timeout: 10000 },
      };
      const publicOutputs = [];

      // Process public test cases sequentially
      for (const key in publicTestCases) {
        if (publicTestCases.hasOwnProperty(key)) {
          const testCase = publicTestCases[key];
          console.log("Executing Public Test Case ID:", testCase.id);
          console.log("Input:", testCase.input);

          // Compile and execute code asynchronously for each public test case
          const publicData = await compileAndExecute(
            code,
            testCase.input,
            publicEnvData
          );

          console.log(
            "Public Test Case ID:",
            testCase.id,
            "Output:",
            publicData.output
          );
          if (publicData.error) {
            console.log(
              "Error in Public Test Case ID:",
              testCase.id,
              publicData.error
            );
            // Handle error if needed
          } else {
            publicOutputs.push({ id: testCase.id, output: publicData.output });
          }
        }
      }

      // Process hidden test cases similarly
      const hiddenEnvData = {
        OS: "windows",
        cmd: "g++",
        options: { timeout: 10000 },
      };
      const hiddenOutputs = await processTestCases(
        hiddenTestCases,
        code,
        hiddenEnvData
      );

      console.log("All test cases executed successfully.");
      console.log("Public Test Case Outputs:", publicOutputs);
      console.log("Hidden Test Case Outputs:", hiddenOutputs);
      res.send({ publicOutputs, hiddenOutputs });
    } else if (lang === "java") {
      // Similar logic for Java and other languages
    } else {
      res.status(400).send({ output: "Unsupported language" });
    }
  } catch (e) {
    console.log("Error:", e);
    res.status(500).send({ output: "Internal Server Error" });
  }
});

// Helper function to compile and execute code with input
async function compileAndExecute(code, input, envData) {
  console.log(code);
  console.log(input);
  return new Promise((resolve, reject) => {
    compiler.compileCPPWithInput(envData, code, input, (data) => {
      console.log(data);
      resolve(data);
    });
  });
}

// Helper function to process test cases in series
async function processTestCases(testCases, code, envData) {
  const outputs = [];
  for (const key in testCases) {
    if (testCases.hasOwnProperty(key)) {
      const testCase = testCases[key];
      console.log("Executing Test Case ID:", testCase.id);
      console.log("Input:", testCase.input);

      const data = await compileAndExecute(code, testCase.input, envData);

      console.log("Test Case ID:", testCase.id, "Output:", data.output);
      if (data.error) {
        console.log("Error in Test Case ID:", testCase.id, data.error);
        // Handle error if needed
      } else {
        outputs.push({ id: testCase.id, output: data.output });
      }
    }
  }
  return outputs;
}

function compileCPPWithInput(envData, code, input, callback) {
  const output = ``;
  const error = null; // Simulate no error
  const result = { output, error };

  // Simulate asynchronous callback
  setTimeout(() => {
    callback(result);
  }, 1000); // Simulate 1 second delay
}

// API endpoint to execute C++ code with input
app.post("/api/execute", (req, res) => {
  const { code, lang, publicTestCases } = req.body;

  // Check if code, language, and publicTestCases are provided
  if (!code || !lang || !publicTestCases || !Array.isArray(publicTestCases)) {
    return res
      .status(400)
      .json({
        error: "Code, language, and publicTestCases array are required.",
      });
  }

  const outputs = []; // Array to store outputs of each test case

  // Process each test case in publicTestCases array
  publicTestCases.forEach((testCase) => {
    const { id, input, output } = testCase;

    // Call the compileCPPWithInput function with provided input
    compileCPPWithInput({}, code, input, (result) => {
      if (result.error) {
        outputs.push({
          id,
          output: `Error in Test Case ${id}: ${result.error}`,
        });
      } else {
        // Compare the expected output with the actual output
        const expectedOutput = output.trim();
        const actualOutput = result.output.trim();
        console.log(actualOutput);
        if (expectedOutput === actualOutput) {
          outputs.push({ id, output: `Test Case ${id}: Passed` });
        } else {
          outputs.push({
            id,
            output: `Test Case ${id}: Failed. Expected '${expectedOutput}', got '${actualOutput}'`,
          });
        }
      }

      // Check if all test cases are processed
      if (outputs.length === publicTestCases.length) {
        res.status(200).json({ outputs });
      }
    });
  });
});
