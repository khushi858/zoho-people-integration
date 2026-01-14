const axios = require("axios");
const { getAccessToken } = require("./token");

async function updateEmployeeInZoho(recordId, data) {
  const accessToken = await getAccessToken();

  const params = new URLSearchParams();
  params.append("formLinkName", "employee"); // ✅ REQUIRED
  params.append("recordId", recordId); // ✅ REQUIRED
  params.append("inputData", JSON.stringify(data)); // ✅ REQUIRED

  const response = await axios.post(
    "https://people.zoho.in/people/api/forms/employee/updateRecord",
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
