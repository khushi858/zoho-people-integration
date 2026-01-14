const express = require("express");
const axios = require("axios");
const { updateEmployeeInZoho } = require("./insuranceToZoho");
const { fetchEmployees } = require("./fetchEmployees");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * Health check
 */
app.get("/", (req, res) => {
  res.send("✅ Zoho People Cloud Integration is LIVE");
});

/**
 * Zoho → Insurance
 */
app.post("/sync", async (req, res) => {
  try {
    const employees = await fetchEmployees();

    for (const emp of employees) {
      await axios.post(process.env.INSURANCE_WEBHOOK_URL, {
        employee_id: emp.EmployeeID,
        employeeEmail: emp.EmailID,
        gender: emp.Gender,
        source: "Zoho People Cloud",
      });
    }

    res.json({
      status: "SUCCESS",
      employeesProcessed: employees.length,
    });
  } catch (err) {
    console.error("❌ Sync failed:", err.message);
    res.status(500).json({ status: "FAILED" });
  }
});

/**
 * Insurance → Zoho (TWO-WAY integration)
 */
app.post("/webhook/insurance/update", async (req, res) => {
  try {
    console.log("📩 Insurance sent update:", req.body);

    const { employee_id, policy_number, policy_status } = req.body;

    if (!employee_id) {
      return res.status(400).json({ message: "employee_id missing" });
    }

    // ✅ CORRECT Zoho People payload
    const zohoPayload = {
      Insurance_Policy_Number: policy_number,
      Insurance_Status: policy_status,
    };

    await updateEmployeeInZoho(employee_id, zohoPayload);

    res.json({ status: "UPDATED_IN_ZOHO" });
  } catch (err) {
    console.error("❌ Insurance → Zoho failed:", err.message);
    res.status(500).json({ status: "FAILED" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Cloud server running on port ${PORT}`);
});
