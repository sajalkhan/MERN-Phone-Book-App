const express = require("express");
const cors = require("cors");

const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Define Routes
app.use("/api/contact", require("./Routes/userContact"));

// get driver connection
const connectDB = require("./Config/db");
try {
  connectDB();
  app.listen(port, () => console.log(`server started on port ${port}`));
} catch (error) {
  console.log("error mongodb connection");
}
