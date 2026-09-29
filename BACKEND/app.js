require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const router =require("./Routes/UserRoute");
const app = express();

const PORT = process.env.PORT || 5005;

app.use(express.json());

app.get("/users",router);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });