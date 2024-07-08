require('express-async-errors')
const winston = require("winston")
const express = require("express");
const app = express();
const debug = require("debug")("app:main");
const dbdebug = require("debug")("db:main");
const router = require("./src/routes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).send("This API does not exist");
});

winston.add(new winston.transports.File({filename : "logFile.log"}))

process.on("uncaughtException", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

mongoose
  .connect(process.env.URL_DATABASE)
  .then(() => dbdebug("connect to database"))
  .catch((err) => dbdebug(`couldn't connect to database (${err})`));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => debug(`listening on port ${PORT}`));
