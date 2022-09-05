package Types

object Roles {
  val superAdmin: String = "Super Admin"
  val admin: String = "Admin"
  val normal: String = "Normal"
  val nucleic: String = "Nucleic Test"
  val vaccine: String = "Vaccination"
  val hospital: String = "Hospital"
  val government: String = "Government"
}

object Permissions {
  val setAdmin: String = "Set Admin"
  val setThirdParty: String = "Set Third Party"
  val updateVaccination: String = "Update Vaccination"
  val updateNucleicTest: String = "Update Nucleic Test"
  val recoverPatient: String = "Recover Patient"
  val setRiskOfPlace: String = "Set Risk of Place"
  val setRiskOfUser: String = "Set Risk of User"
}

object ReportTypes {
  val auto = "Auto recorded"
  val self = "Self uploaded"
}

object UserRiskLevels {
  val red = "Dangerous"
  val yellow = "Closely Related"
  val popUps = "Vulnerable"
  val green = "Safe"
}

object VaccinationStatuses {
  val triple = "Three"
  val dual = "Two"
  val single = "One"
  val none = "Zero"
}

object PlaceRiskLevels {
  val red = "High Risk"
  val yellow = "Middle Risk"
  val green = "Low Risk"
}