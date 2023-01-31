const express = require("express");
const app = express();
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(cors());

// import routes
const userRoute = require("./routes/user.route");
const blogRoute = require("./routes/blog.route");
const subscribeRoute = require("./routes/subscribe.route");

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/subscribe", subscribeRoute);

app.get("/", (req, res) => {
  res.send("Route is working!");
});

module.exports = app;
