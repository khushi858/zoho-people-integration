const express = require("express");
const axios = require("axios");
const { updateEmployeeInZoho } = require("./insuranceToZoho");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

/**
 * Health check
 */
app.get("/", (req, res) => {
  res.send("✅ Zoho People Cloud Integration is LIVE");
});

/**
 * 🔥 ONE-GO CLOUD TEST (NO TERMINAL)
 * Open this in browser
 */
app.get("/test-insurance-sync", async (req, res) => {
  try {
    // ✅ STEP 1: HARD-CODED, PUSHABLE INSURANCE DATA (for now)
    // This simulates a REAL insurance system
    const insuranceData = {
      recordId: "231124000000283005", // ✅ REAL Zoho recordId
      policy_number: "STAR-HEALTH-8899",
      policy_status: "ACTIVE",
    };

    // ✅ STEP 2: ZOHO-PUSHABLE PAYLOAD (API names)
    const zohoPayload = {
      Insurance_Policy_Number: insuranceData.policy_number,
      Insurance_Status: insuranceData.policy_status,
    };

    // ✅ STEP 3: PUSH TO ZOHO PEOPLE
    await updateEmployeeInZoho(insuranceData.recordId, zohoPayload);

    // ✅ STEP 4: SHOW RESULT IN BROWSER
    res.json({
      status: "SUCCESS",
      message: "Insurance data pushed to Zoho People",
      pushedData: zohoPayload,
    });
  } catch (err) {
    console.error("❌ FINAL ERROR:", err.response?.data || err.message);

    res.status(500).json({
      status: "FAILED",
      error: err.response?.data || err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Cloud server running on port ${PORT}`);
});
