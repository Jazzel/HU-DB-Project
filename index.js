const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
const { validationResult, check } = require("express-validator");
const config = require("config");

const app = express();
const PORT = 5000;
app.use(cors({ origin: "http://localhost:3000" }));

connectDB();
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const URL = "http://localhost:3000";

app.use("/api/sports", require("./routes/sports"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
