require("dotenv").config();
const {testConnection} = require("./src/config/database");
testConnection();
const express = require("express");
const moduleRoutes = require("./src/routes/moduleroutes");
const authRoutes = require("./src/routes/authroutes");

const app = express();


app.use(express.json());


app.use("/api/modules", moduleRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server listing on port ${PORT}`);
});