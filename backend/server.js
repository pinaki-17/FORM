const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes); 

app.listen(5000, () => console.log("Server running on port 5000"));
