import express from "express";
import axios from "axios";
import { fetchEmployees } from "./fetchEmployees.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Health check (proves cloud is running)
app.get("/", (req, res) => {
  res.send("Zoho People Cloud Integration is LIVE");
});

// Trigger integration from cloud
app.get("/sync", async (req, res) => {
  try {
    const employees = await fetchEmployees();

    for (const emp of employees) {
      await axios.post(process.env.INSURANCE_WEBHOOK_URL, {
        employeeEmail: emp.EmailID,
        gender: emp.Gender,
        createdTime: emp.CreatedTime,
        modifiedTime: emp.ModifiedTime,
        source: "Zoho People Cloud",
      });
    }

    res.json({
      status: "SUCCESS",
      employeesProcessed: employees.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "FAILED" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Cloud server running on port ${PORT}`);
});
