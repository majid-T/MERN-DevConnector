const express = require("express");
const connectDB = require("./config/db");
const app = express();

//Connection to DB
connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Express is running");
});

app.listen(PORT, () => {
  `Serveris running on port ${PORT}`;
});
