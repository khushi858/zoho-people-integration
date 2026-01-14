const axios = require("axios");
const { getAccessToken } = require("./token");

async function updateEmployeeInZoho(recordId, data) {
  const accessToken = await getAccessToken();

  await axios.post(
    `https://people.zoho.in/people/api/forms/employee/records/${recordId}`,
    {
      data: data,
    },
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
}

module.exports = { updateEmployeeInZoho };
