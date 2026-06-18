const express = require("express");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
// const errorHandler = require("./middleware/errorHandler");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", studentRoutes);
// app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});