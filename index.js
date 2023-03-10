const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dewzzmk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(URI).then(() => {
  console.log(`Database connection is successful 🛢`.blue.bold);
});

// server
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`.yellow.bold);
});
