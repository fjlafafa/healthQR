package Exceptions

case class FailToDropDatabasesException() extends Exception {
  override def getMessage: String = "清空数据库失败"
}
