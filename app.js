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
const teamRoute = require("./routes/team.route");
const pricingRoute = require("./routes/pricing.route");
const serviceRoute = require("./routes/service.route");
const pricingOrdersRoute = require("./routes/pricingOrders.route");
const countRoute = require("./routes/count.route");

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/tellus", tellUsRoute);
app.use("/api/v1/subscribe", subscribeRoute);
app.use("/api/v1/team", teamRoute);
app.use("/api/v1/pricing", pricingRoute);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/pricingorder", pricingOrdersRoute);
app.use("/api/v1/count", countRoute);

app.get("/", (req, res) => {
  res.send("Route is working!");
});

module.exports = app;
