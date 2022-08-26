package Classes.UserMeta

case class VaccinationStatus() extends Enumeration {
  type VaccinationStatus = Value
  val tripleVaccination = Value("完成加强针接种")
  val dualVaccination = Value("完成第二针接种")
  val singleVaccination = Value("完成第一针接种")
  val noVaccination = Value("完成第一针注射")
}
