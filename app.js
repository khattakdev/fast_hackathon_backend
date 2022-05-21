const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const authRoute = require("./router/auth");
const eventRoute = require("./router/event");
const userRoute = require("./router/user");
const communityRoute = require("./router/community");

const app = express();
const port = 8081;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoute);
app.use("/events", eventRoute);
app.use("/user", userRoute);
app.use("/community", communityRoute);

const connectDB = async (listen) => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
    });
    console.log("Connected To Database");
    listen();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

connectDB(() => {
  app.listen(port);
});
