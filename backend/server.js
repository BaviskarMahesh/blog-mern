const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// API Routes
app.use("/api/posts", postRoutes);

// Serve Frontend Build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// React Routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Server Port
const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});