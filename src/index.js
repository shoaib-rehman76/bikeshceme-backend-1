const mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./app");
const PORT = 3001;
process.on("uncaughtException", (err) => {
  console.log("UNCUAGHT EXCEPTION:💥 Shutting down...", err);
  process.exit(1);
});
mongoose.set("strictQuery", true);
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log("DB connection successfully👍");
});
const server = app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}...`);
});
// exit the application if there is any kind of error
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...", err);
  server.close(() => {
    process.exit();
  });
});
