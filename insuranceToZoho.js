const axios = require("axios");
const { getAccessToken } = require("./token");

async function updateEmployeeInZoho(employeeId, data) {
  const accessToken = await getAccessToken();

  await axios.put(
    `https://people.zoho.in/people/api/forms/P_Employee/records/${employeeId}`,
    data,
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("✅ Zoho People updated for employee:", employeeId);
}

module.exports = { updateEmployeeInZoho };
