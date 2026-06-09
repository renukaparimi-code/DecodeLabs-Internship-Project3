const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const studentRoutes = require("./routes/studentRoutes");

app.use("/api/students", studentRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});