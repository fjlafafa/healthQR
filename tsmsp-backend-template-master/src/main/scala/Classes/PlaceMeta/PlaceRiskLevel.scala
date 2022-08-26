package Classes.PlaceMeta

case class PlaceRiskLevel() extends Enumeration {
  type RiskLevel = Value
  val red = Value("高风险")
  val yellow = Value("中风险")
  val green = Value("低风险")
}
