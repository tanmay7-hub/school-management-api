const express = require("express");
const dotenv = require("dotenv");
const pool = require("./config/db");
const schoolRoutes = require("./routes/SchoolRoute");

dotenv.config();
const app = express();

app.use(express.json());

// Test DB connection
pool.query("SELECT 1")
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection failed:", err));

// Routes
app.use("/", schoolRoutes);

app.get("/", (req, res) => {
  res.send("School Management API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
