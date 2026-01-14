app.get("/test-insurance-sync", async (req, res) => {
  try {
    const zohoPayload = {
      Insurance_Policy_Number: "STAR-HEALTH-8899",
      Insurance_Status: "ACTIVE",
    };

    const result = await updateEmployeeInZoho(
      "231124000000283005",
      zohoPayload
    );

    res.json({
      status: "SUCCESS",
      zohoResponse: result,
    });
  } catch (err) {
    res.status(500).json({
      status: "FAILED",
      error: err.response?.data || err.message,
    });
  }
});
