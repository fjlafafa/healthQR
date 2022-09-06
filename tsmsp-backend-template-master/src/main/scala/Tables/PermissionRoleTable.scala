package Tables

import Exceptions.RoleNotExistsException
import Types.UserMeta._

object PermissionRoleTable {
  val Table = Map[Permissions, List[Roles]](
    SetAdmin -> List(SuperAdministrator),
    SetThirdParty -> List(SuperAdministrator, Administrator),
    UpdateVaccination -> List(SuperAdministrator, Administrator, HospitalWorker, VaccineInjector),
    UpdateNucleicTest -> List(SuperAdministrator, Administrator, HospitalWorker, NucleicTestResultReporter),
    RecoverPatient -> List(SuperAdministrator, Administrator, HospitalWorker),
    SetRiskOfPlace -> List(SuperAdministrator, Administrator, Governor),
    SetRiskOfUser -> List(SuperAdministrator, Administrator, Governor),
  )

  def checkPermission(role: Roles, permission: Permissions): Boolean = {
    val roleList = Table.get(permission).getOrElse(throw RoleNotExistsException())
    if (roleList.exists((a: Roles) => role == a))
      return true
    false
  }
}
