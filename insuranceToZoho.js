const axios = require("axios");
const { getAccessToken } = require("./token");

async function updateEmployeeInZoho(recordId, data) {
  const accessToken = await getAccessToken();

  const params = new URLSearchParams();
  params.append("recordId", recordId);
  params.append("inputData", JSON.stringify(data));

  const response = await axios.post(
    "https://people.zoho.in/people/api/forms/employee/insertRecord",
    params,
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}

module.exports = { updateEmployeeInZoho };
