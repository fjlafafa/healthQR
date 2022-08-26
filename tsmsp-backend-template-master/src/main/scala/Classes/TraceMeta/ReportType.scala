package Classes.TraceMeta

case class ReportType() extends Enumeration {
  type ReportType = Value
  val scanQRCodeReport = Value("Auto recorded")
  val selfReport = Value("Self uploaded")
}
