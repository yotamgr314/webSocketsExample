const express = require("express");
const cors = require("cors");
const adRoutes = require("./routes/adRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes for ads
app.use("/api/ads", adRoutes);

module.exports = app;
