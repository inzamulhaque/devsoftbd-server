const express = require("express");
const app = express();
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(cors());

// import routes
const userRoute = require("./routes/user.route");
const blogRoute = require("./routes/blog.route");
const reviewRoute = require("./routes/review.route");
const contactRoute = require("./routes/contact.route");
const tellUsRoute = require("./routes/tellUs.route");
const subscribeRoute = require("./routes/subscribe.route");

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/tellus", tellUsRoute);
app.use("/api/v1/subscribe", subscribeRoute);

app.get("/", (req, res) => {
  res.send("Route is working!");
});

module.exports = app;
