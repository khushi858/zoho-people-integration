import axios from "axios";
import "dotenv/config";

export async function getAccessToken() {
  const res = await axios.post(
    "https://accounts.zoho.in/oauth/v2/token",
    null,
    {
      params: {
        grant_type: "refresh_token",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: process.env.REFRESH_TOKEN,
      },
    }
  );
  return res.data.access_token;
}
