const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

// Requiring routers
const usersRoute = require("./routes/api/users");
const profileRoute = require("./routes/api/profile");
const postsRoute = require("./routes/api/posts");
const authRoute = require("./routes/api/auth");

//Connection to DB
connectDB();

// Middlewares
// Below is new form of bodyparser
app.use(express.json({ extended: false }));

//Defining routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postsRoute);

//Serve Static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  `Serveris running on port ${PORT}`;
});
