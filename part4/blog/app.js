const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs.js");
const usersRouter = require("./controllers/users.js");
const logger = require("./utils/logger.js");
const config = require("./utils/config.js");
const middleware = require("./utils/middleware.js");
const requestLogger = require("./utils/requestLogger.js");
const loginRouter = require("./controllers/login.js");
mongoose.set("strictQuery", false);

mongoose
  .connect(config.databaseURI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.info("Error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger.postLogger);
app.use(middleware.tokenExtractor);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
