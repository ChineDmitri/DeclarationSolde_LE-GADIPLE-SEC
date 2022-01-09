const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const env = require("dotenv").config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.yvbrn.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connexion MobgoDB: --OK!");
  })
  .catch((err) => {
    console.log("Connexion MongoDB: " + err);
  });

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTION"
  );
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());

/* MODULES ROUTES */
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")

/* ROUTES */
app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)

module.exports = app;
