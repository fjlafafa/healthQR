package Classes.UserMeta

case class Permission() extends Enumeration {
  type Permission = Value
  val administrator = Value("管理员")
  val normalUser = Value("一般用户")
  val nucleicTestResultReporter = Value("核酸检测方")
}
