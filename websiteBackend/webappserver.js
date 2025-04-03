const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow all origins for testing

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// ✅ Define Schema
const reportSchema = new mongoose.Schema(
  {
    reportId: { type: String, unique: true, default: () => `REP-${uuidv4()}` },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true },
    typeOfDamage: { type: String, default: null },
    severity: { type: String, default: null },
    imageUrl: { type: String, default: null },
    recommendedAction: { type: String, default: null },
  },
  { collection: "reports" }
);

// ✅ Create Model
const Report = mongoose.model("Report", reportSchema);

// ✅ Insert Sample Data (Run Once)
app.get("/api/insert-sample", async (req, res) => {
  try {
    const sampleReports = [
      {
        dateTime: new Date(),
        location: "Downtown Street, NY",
        typeOfDamage: "Pothole",
        severity: "High",
        imageUrl: "https://via.placeholder.com/150",
        recommendedAction: "Urgent Repair",
      },
      {
        dateTime: new Date(),
        location: "Main Road, LA",
        typeOfDamage: "Crack",
        severity: "Medium",
        imageUrl: "https://via.placeholder.com/150",
        recommendedAction: "Scheduled Repair",
      },
    ];

    await Report.insertMany(sampleReports);
    res.json({ message: "Sample data inserted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to insert sample data", details: error.message });
  }
});

// ✅ API: Get All Reports (Sorted by Latest)
app.get("/api/reports", async (req, res) => {
  try {
    const reports = await Report.find().sort({ dateTime: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// ✅ API: Get a Single Report by reportId or _id
app.get("/api/reports/:id", async (req, res) => {
  try {
    const report = await Report.findOne({ $or: [{ reportId: req.params.id }, { _id: req.params.id }] });
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch report details", details: error.message });
  }
});

// ✅ Start Server
const PORT = process.env.WEBAPP_PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
