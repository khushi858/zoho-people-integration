export function getChangeType(emp) {
  const today = new Date().toISOString().split("T")[0];

  if (emp.Status === "Inactive") return "DELETE";
  if (emp.CreatedTime?.startsWith(today)) return "ADD";
  if (emp.ModifiedTime?.startsWith(today)) return "CORRECT";

  return null;
}
