const express = require("express");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoutes);

// Swagger Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check Endpoint (Cloud Ready)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Sales Insight Automator",
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});