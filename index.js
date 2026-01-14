const express = require("express");
const { fetchInsuranceDetails } = require("./insuranceService");
const { updateEmployeeInZoho } = require("./insuranceToZoho");

const app = express();
app.use(express.json());

app.post("/sync-insurance-to-zoho", async (req, res) => {
  try {
    const { recordId, employeeCode } = req.body;

    // 1️⃣ Fetch insurance details
    const insurance = await fetchInsuranceDetails(employeeCode);

    // 2️⃣ Convert to Zoho-pushable format
    const zohoPayload = {
      Insurance_Policy_Number: insurance.policy.number,
      Insurance_Status: insurance.policy.status,
      Insurance_Start_Date: insurance.policy.start_date,
      Insurance_End_Date: insurance.policy.end_date,
      Insurance_Sum_Insured: insurance.policy.sum_insured,
    };

    // 3️⃣ Push to Zoho People
    await updateEmployeeInZoho(recordId, zohoPayload);

    res.json({ status: "INSURANCE_PUSHED_TO_ZOHO" });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ status: "FAILED" });
  }
});

app.listen(process.env.PORT || 3000);
