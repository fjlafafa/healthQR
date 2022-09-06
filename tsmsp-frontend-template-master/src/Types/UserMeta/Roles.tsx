export enum Roles {
  superAdmin = "Super Admin",
  admin = "Admin",
  normal = "Normal",
  nucleic = "Nucleic Test",
  vaccine = "Vaccination",
  hospital = "Hospital",
  government = "Government",
}
export enum Permissions {
  setAdmin,
  setThirdParty,
  updateVaccination,
  updateNucleicTest,
  recoverPatient,
  setRiskOfPlace,
  setRiskOfUser,
}
const PermissionTable = new Map([
  [Permissions.setAdmin, [Roles.superAdmin]],
  [Permissions.setThirdParty, [Roles.superAdmin, Roles.admin]],
  [
    Permissions.updateVaccination,
    [Roles.superAdmin, Roles.admin, Roles.hospital, Roles.vaccine],
  ],
  [
    Permissions.updateNucleicTest,
    [Roles.superAdmin, Roles.admin, Roles.hospital, Roles.nucleic],
  ],
  [Permissions.recoverPatient, [Roles.superAdmin, Roles.admin, Roles.hospital]],
  [
    Permissions.setRiskOfPlace,
    [Roles.superAdmin, Roles.admin, Roles.government],
  ],
  [
    Permissions.setRiskOfUser,
    [Roles.superAdmin, Roles.admin, Roles.government],
  ],
]);
export function checkPermission(role: Roles, permission: Permissions) {
  if (PermissionTable.get(permission) != undefined) {
    const list: Roles[] = PermissionTable.get(permission) as Roles[];
    if (list.indexOf(role) >= 0) return true;
  }
  return false;
}
