const axios = require("axios");
const { getAccessToken } = require("./token");

async function updateEmployeeInZoho(recordId, insuranceData) {
  const accessToken = await getAccessToken();

  const payload = {
    data: insuranceData,
  };

  await axios.put(
    `https://people.zoho.in/people/api/forms/employee/records/${recordId}`,
    payload,
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
}

module.exports = { updateEmployeeInZoho };
