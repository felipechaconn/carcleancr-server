import { MongoClient, ServerApiVersion } from "mongodb";
import dotEnv from "../config/conf";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(dotEnv.MONGODB_URI_DEV, {
  maxPoolSize: 20, // Set the maximun pool size
  serverApi: {
    version: ServerApiVersion.v1, // Set the Stable API version for MongoDB server API
    strict: true, // Set strict mode for server API
    deprecationErrors: true, // Display deprecation errors
  },
});

// Function to connect to MongoDB database
async function connect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("\nMongoDB connection established!\n");
    return client.db(dotEnv.DB_NAME);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw new Error("Failed to connect to MongoDB:",error);
  }
}

async function run() {
  try {
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("\nMongoDB Connected successfully!\n");
  } catch (error) {
    console.error("MongoDB connection verification failed:",error);
  }
}

// Function to close the MongoDB database connection
async function close() {
  try {
    await client.close();
    console.log("MongoDB connection closed successfully!!");
  } catch (error) {
    console.error("Failed to close MongoDB connection:",error);
  }
}
module.exports = { connect, client, close, run };
