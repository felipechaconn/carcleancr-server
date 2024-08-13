const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
import router from "./routes/routes";
const { client, run } = require("./database/conn");
import passport from "./middleware/passport";

const app = express();

//Establish connection to Database
try {
  run();
} catch (error) {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
}

// Configuring CORS for development enviroment
var corsOptions = {
  origin:
    process.env.NODE_ENV === "development" ? "*" : process.env.FRONTEND_URL,
};

/**
 * Middlewares
 */

//Configure the session management
app.use(
  session({
    secret: process.env.JWT_SECRET,
    store: MongoStore.create({
      client: client,
      dbName: process.env.DB_NAME,
      collectionName: "sessions",
      autoRemove: "native", // Use MongoDB TTL for session removal if desired
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV !== "development", // Ensure cookies are sent over HTTPS in production
      maxAge: 1000 * 60 * 60 * 24, // 1-day expiration for the session cookie
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions)); // Enable cross-origin resource sharing(CORS).
app.use(helmet()); // Adds extra security headers to the app's HTTP  responses

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Allow to recived JSON body

// Morgan logs HTTP status codes to the console in development environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

// Use /api Routes
app.use("/api", router);

// Handle unexpected errors
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send("Something went wrong.");
});

// Graceful shutdown on CTRL+C
process.on("SIGINT", () => {
  console.log("Closing the database connection");
  client.close().then(() => {
    console.log("Database connection closed");
    process.exit(0);
  });
});

export default app;
