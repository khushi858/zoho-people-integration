export function extractDependents(employee) {
  return employee.tabularSections?.Dependents || [];
}
