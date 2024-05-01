const express = require("express");
const Axios = require("axios"); 
const mongoose = require("mongoose");
const Question = require('./model/question');
const assessmentRoutes = require('./assessmentRoutes');
// const loginRouter = require('./login'); 
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);
// const compiler = require('compiler-package');
const { exec } = require('child_process');

//complier
const { VM } = require('vm2');

const app = express();
// const vm = new VM();
const port = 3000; // Or any port you prefer

var cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/api', assessmentRoutes);
// Mount the login route
// app.use('/', loginRouter);

app.use(cors()) // Use this after the variable declaration
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
    const { questionId, question, problem, sectionType,examples } = req.body;
    
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
    const question = await Question.findOne({ questionId }, { question: 1, problem: 1, examples:1 });

    if (!question) {
      return res.status(404).send("Question not found");
    }

    res.json(question); // Return only question and problem fields
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).send("Error fetching question");
  }
});




app.post('/compile', (req, res) => {
  const { code, language } = req.body;
  console.log('Received code:', code);
  console.log('Received language:', language);

  if (!code) {
      return res.status(400).json({ error: 'Code is required' });
  }

  if (language === 'javascript') {
      const vm = new VM({
          timeout: 1000, // Set a timeout to prevent infinite loops
          sandbox: {} // An empty sandbox to prevent access to sensitive data
      });

      try {
          const result = vm.run(code); // Execute the code using vm.run
          console.log('Result:', result);
          res.json({ output: result }); // Send the output back to the client
      } catch (error) {
          res.status(400).json({ error: error.message }); // Handle any errors
      }
  } else {
      res.status(400).json({ error: 'Unsupported language' });
  }
});


// Hypothetical asynchronous code execution function
// function runAsyncCode(code) {
//   return new Promise((resolve, reject) => {
//       const vm = new VM();
//       try {
//           const result = vm.run(code);
//           resolve(result);
//       } catch (error) {
//           reject(error);
//       }
//   });
// }

// app.post('/compile', async (req, res) => {
//   console.log('Received code:', req.body.code);
//   console.log('Received language:', req.body.language);

//   const code = req.body.code;
//   const language = req.body.language;

//   if (!code) {
//       return res.status(400).json({ error: 'Code is required' });
//   }

//   if (language === 'javascript') {
//       try {
//           const result = await runAsyncCode(code); // Call the asynchronous code execution function
//           console.log('Result:', result); // Log the result for debugging
//           res.json({ output: result });
//       } catch (error) {
//           console.error('Compilation error:', error);
//           res.status(500).json({ error: 'Error compiling code' });
//       }
//   } else {
//       res.status(400).json({ error: 'Unsupported language' });
//   }
// });


// compiler code 
// app.post("/Collaborate", (req, res) => {
//   var code = req.body.code
//   var input = req.body.input
//   var lang = req.body.lang
//   console.log(code);
//   console.log(input);
//   console.log(lang);


//   try {
//       // res.send("hello bhai")
//       if (lang == "Cpp" || lang == "C") {
//           if (!input) {
//               var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
//               compiler.compileCPP(envData, code, function (data) {
//                   if (data.output) {
//                       res.send(data);
//                   }
//                   else {
//                       res.send({ output: "Syntax Error" })
//                   }
//               });
//           }
//           else {
//               var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
//               compiler.compileCPPWithInput(envData, code, input, function (data) {
//                   if (data.output) {
//                       res.send(data);
//                   }
//                   else {
//                       res.send({ output: "give input" })
//                   }
//               });
//           }

//       }
//       else if (lang == "Java") {
//           if (!input) {
//               var envData = { OS: "windows", options: { timeout: 10000 } };
//               compiler.compileJava(envData, code, function (data) {
//                   if (data.output) {
//                       res.send(data);
//                   }
//                   else {
//                       res.send({ output: "Syntax Error" })
//                   }
//               });
//           }
//           else {
//               var envData = { OS: "windows", options: { timeout: 10000 } };
//               compiler.compileJavaWithInput(envData, code, input, function (data) {
//                   if(input){
//                       if (data.output) {
//                           res.send(data);
//                       }
//                       else {
//                           res.send({ output: "give input" })
//                       }
//                   }
//                   else{
//                       res.send({output:"give input"})
//                   }
//               });
//           }
//       }
//       else if (lang == "Python") {
//           if (!input) {
//               var envData = { OS: "windows", options: { timeout: 10000 } };
//               compiler.compilePython(envData, code, function (data) {
//                   if (data.output) {
//                       res.send(data);
//                   }
//                   else {
//                       res.send({ output: "Indentation Error" })
//                   }
//               });
//           } 
//           else {
//               var envData = { OS: "windows", options: { timeout: 10000 } };
//               compiler.compilePythonWithInput(envData, code, input, function (data) {
//                   if (data.output) {
//                       res.send(data);
//                   }
//                   else {
//                       res.send({ output: "give input" })
//                   }
//               });
//           }
//       }

//   } catch (error) {
//       console.log("shiit happend")
//   }

// })



// app.post("/Collaborate", (req, res) => {
//   try {
//     var code = req.body.code;
//     var input = req.body.input;
//     var lang = req.body.lang;
//     console.log(code);
//     console.log(input);
//     console.log(lang);

//     if (lang == "Cpp" || lang == "C") {
//       if (!input) {
//         var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
//         compiler.compileCPP(envData, code, function (data) {
//           if (data.output) {
//             res.send(data);
//           } else {
//             res.send({ output: "Syntax Error" });
//           }
//         });
//       } else {
//         var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
//         compiler.compileCPPWithInput(envData, code, input, function (data) {
//           if (data.output) {
//             res.send(data);
//           } else {
//             res.send({ output: "give input" });
//           }
//         });
//       }
//     } else {
//       res.status(400).send({ error: "Unsupported language" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });



// app.post("/compile", (req, res) => { 
//   //getting the required data from the request 
//   let code = req.body.code; 
//   let language = req.body.language; 
//   let input = req.body.input; 

//   if (language === "python") { 
//       language = "py"
//   } 

//   let data = ({ 
//       "code": code, 
//       "language": language, 
//       "input": input 
//   }); 
//   let config = { 
//       method: 'post', 
//       url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode', 
//       headers: { 
//           'Content-Type': 'application/json'
//       }, 
//       data: data 
//   }; 
//   //calling the code compilation API 
//   Axios(config) 
//       .then((response) => { 
//           res.send(response.data) 
//           console.log(response.data) 
//       }).catch((error) => { 
//           console.log(error); 
//       }); 
// }) 

// Command to compile C++ code

// Compile C++ code using g++
const compileCPP = (codeFileName, outputFileName) => {
    const compileCommand = `g++ -o ${outputFileName} ${codeFileName}.cpp`;

    exec(compileCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Compilation error: ${error.message}`);
            return { error: error.message };
        }
        if (stderr) {
            console.error(`Compiler output: ${stderr}`);
            return { error: stderr };
        }
        console.log(`Compilation successful: ${stdout}`);
        return { success: true };
    });
};

// Compile Java code using javac
const compileJava = (codeFileName) => {
    const compileCommand = `javac ${codeFileName}.java`;

    exec(compileCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Compilation error: ${error.message}`);
            return { error: error.message };
        }
        if (stderr) {
            console.error(`Compiler output: ${stderr}`);
            return { error: stderr };
        }
        console.log(`Compilation successful: ${stdout}`);
        return { success: true };
    });
};

// API endpoint for compiling C++ or Java code with input
// Compile Java or C++ code based on the language specified in the request
app.post('/compile', (req, res) => {
  const { code, input, language, os } = req.body;

  // Define the compile command based on the language
  let compileCommand;
  if (language === 'Java') {
      compileCommand = `javac ${code}`;
  } else if (language === 'C++') {
      compileCommand = `g++ -o outputFileName sourceFileName.cpp`;
  } else {
      return res.status(400).json({ error: 'Unsupported language' });
  }

  // Run the compile command
  exec(compileCommand, (error, stdout, stderr) => {
      if (error) {
          console.error(`Compilation error: ${error.message}`);
          res.status(500).json({ error: 'Compilation error' });
          return;
      }
      if (stderr) {
          console.error(`Compiler output: ${stderr}`);
          res.status(500).json({ error: 'Compiler output error' });
          return;
      }
      console.log(`Compilation successful: ${stdout}`);

      // Run the compiled code if there were no compilation errors
      if (language === 'Java') {
          const runCommand = `java ${code}`;
          exec(runCommand, (runError, runStdout, runStderr) => {
              if (runError) {
                  console.error(`Execution error: ${runError.message}`);
                  res.status(500).json({ error: 'Execution error' });
                  return;
              }
              console.log(`Execution successful: ${runStdout}`);
              res.status(200).json({ output: runStdout });
          });
      } else {
          res.status(200).json({ message: 'Compilation successful' });
      }
  });
});


// API endpoint for compiling and executing Java code
app.post('/execute-java', (req, res) => {
  const code = req.body.code;
  const input = req.body.input;
  const os = req.body.os; // Assuming you provide the OS information in the request body

  if (!code) {
      return res.status(400).json({ error: 'Code is required' });
  }

  // Determine the environment data based on the OS
  let envData;
  if (os === 'windows') {
      envData = { OS: 'windows' };
  } else if (os === 'linux') {
      envData = { OS: 'linux' };
  } else {
      return res.status(400).json({ error: 'Invalid OS specified' });
  }

  // Compile and execute Java code
  compiler.compileJava(envData, code, (data) => {
      if (data.error) {
          res.status(400).json({ error: data.error });
          console.log(data.error);
      } else {
          // Optionally, you can also provide input to the Java program
          if (input) {
              compiler.compileJavaWithInput(envData, code, input, (output) => {
                  res.json({ output });
              });
          } else {
              res.json({ output: data.output });
          }
      }
  });
});