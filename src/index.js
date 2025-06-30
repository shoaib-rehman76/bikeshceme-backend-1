const mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCUAGHT EXCEPTION:💥 Shutting down...", err);
  process.exit(1);
});
mongoose.set("strictQuery", true);
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log("DB connection successfully👍");
});
const server = app.listen(config.port, () => {
  console.log(`The server is running on ${config.port}...`);
});
// exit the application if there is any kind of error
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...", err);
  server.close(() => {
    process.exit();
  });
});
