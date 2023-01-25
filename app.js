const express = require("express");
const app = express();
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(cors());

// import routes
const userRoute = require("./routes/user.route");

// routes
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("Route is working!");
});

module.exports = app;
