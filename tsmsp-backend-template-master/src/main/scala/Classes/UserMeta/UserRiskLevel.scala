package Classes.UserMeta

case class UserRiskLevel() extends Enumeration {
  type RiskLevel = Value
  val red = Value("红码")
  val yellow = Value("黄码")
  val popUps = Value("弹窗")
  val green = Value("绿码")
}
