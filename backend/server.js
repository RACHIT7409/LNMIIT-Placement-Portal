const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const placementRoutes = require("./routes/placementRoutes");
const companyRoutes = require("./routes/companyRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const statsRoutes = require("./routes/statsRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running fine",
  });
});

app.get("/api/test", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/placements", placementRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});