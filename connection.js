const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://shivamv11:ydhz3eB6DLulZCIF@cluster0.i9kkmcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    return client.db("digital_Recruitment"); // Return the connected database
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error; // Throw the error to handle it in the caller
  }
}

module.exports = connectToDB ;
