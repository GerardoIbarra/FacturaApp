const express = require("express");
const cors = require("cors");
const cfdiRoutes = require("./routes/cfdiRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/factura", cfdiRoutes);

module.exports = app;
