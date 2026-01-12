import { fetchEmployees } from "./fetchEmployees.js";
import { getChangeType } from "./delta.js";

const data = await fetchEmployees();

console.log("Total employee records fetched:", data.length);

data.forEach((item, index) => {
  const emp = Object.values(item)[0][0];

  console.log("\nEmployee", index + 1);
  console.log("Email:", emp.EmailID);
  console.log("CreatedTime:", emp.CreatedTime);
  console.log("ModifiedTime:", emp.ModifiedTime);
  console.log("Status:", emp.Status);

  const change = getChangeType(emp);
  console.log("Detected Change Type:", change);
});
