import axios from "axios";
import { getAccessToken } from "./token.js";

export async function fetchEmployees() {
  const token = await getAccessToken();

  const res = await axios.get(
    "https://people.zoho.in/people/api/forms/employee/getRecords",
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );

  return res.data.response.result;
}
