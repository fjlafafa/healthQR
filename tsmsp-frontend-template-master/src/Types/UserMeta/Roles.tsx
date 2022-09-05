export enum Roles {
    superAdmin = "Super Admin",
    admin = "Admin",
    user = "Normal",
    nucleic = "Nucleic Test",
    vaccine = "Vaccination",
    hospital = "Hospital",
    government = "Government",
}
export enum Permissions {
    setAdmin,
    setThirdParty,
    vaccination,
    nucleicTest,
    recoverPatient,
    setRiskOfPlace,
    setRiskOfUser,
}
const PermissionTable =new Map([
    [Permissions.setAdmin,[Roles.superAdmin]],
    [Permissions.setThirdParty,[Roles.superAdmin,Roles.admin]],
    [Permissions.vaccination,[Roles.superAdmin,Roles.admin,Roles.hospital,Roles.vaccine]],
    [Permissions.nucleicTest,[Roles.superAdmin,Roles.admin,Roles.hospital,Roles.nucleic]],
    [Permissions.recoverPatient,[Roles.superAdmin,Roles.admin,Roles.hospital]],
    [Permissions.setRiskOfPlace,[Roles.superAdmin,Roles.admin,Roles.government]],
    [Permissions.setRiskOfUser,[Roles.superAdmin,Roles.admin,Roles.government]],
    ])
export function checkPermission(role:Roles, permission:Permissions) {
    if(PermissionTable.get(permission)!=undefined)
    {
        const list:Roles[]=PermissionTable.get(permission) as Roles[]
        if(list.indexOf(role)>=0)
            return true
    }
    return false
}