const express = require("express");
const connectDB = require("./config/db");
const app = express();

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

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Express is running");
});

//Defining routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postsRoute);

app.listen(PORT, () => {
  `Serveris running on port ${PORT}`;
});
