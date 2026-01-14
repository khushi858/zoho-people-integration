// Simulated insurance fetch
async function fetchInsuranceDetails(employeeCode) {
  // In real life → axios.get(insurance API)
  return {
    employee_code: employeeCode,
    policy: {
      number: "STAR-HEALTH-8899",
      status: "ACTIVE",
      start_date: "2025-01-01",
      end_date: "2026-01-01",
      sum_insured: 500000,
    },
  };
}

module.exports = { fetchInsuranceDetails };
