const express = require("express");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const config = require("./config/config");
const morgan = require("./config/morgan");
const { jwtStrategy } = require("./config/passport");
const { authLimiter } = require("./middlewares/rateLimiter");
const routes = require("./router");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const Logger = require("./config/logger");
const session = require("express-session");
const app = express();
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));

// parse urlencoded request body
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// sanitize request data

app.use(mongoSanitize());

// gzip compression
// app.use(compression());

// enable cors
app.use(
  cors({
    origin: "*", // your frontend origins
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());

// jwt authentication
// JWT authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
// app.use(
//   logger("common", {
//     stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
//       flags: "a",
//     }),
//   })
// );
app.get("/", (req, res) => {
  res.json({
    message: "server is running",
  });
});
// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// v1 api routes
// app.use("/api", routes);
app.use("/api", (req, res, next) => {
  // Log client's IP address
  const timestamp = new Date().toISOString();
  Logger.info(
    `[${timestamp}] Request from IP: ${req.ip}, Route: ${req.originalUrl}`
  );
  // routes(req, res, next);
  return res.status(503).json({
    message: "Server under maintenance",
  });
});

// send back a 404 error for any unknown api request
app.use("*", (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "server not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
// export app
module.exports = app;
