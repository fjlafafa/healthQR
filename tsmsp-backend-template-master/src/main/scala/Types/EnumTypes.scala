package Types

object Permissions {
  val admin: String = "Admin"
  val normal: String = "Normal"
  val nucleic: String = "Nucleic Test"
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