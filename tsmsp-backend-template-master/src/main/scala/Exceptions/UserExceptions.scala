package Exceptions

case class TokenNotExistsException() extends Exception {
  override def getMessage: String = "错误！用户不存在或登录信息已过期！"
}

case class UserNotExistsException() extends Exception {
  override def getMessage: String = "错误！用户不存在！"
}

case class WrongPasswordException() extends Exception {
  override def getMessage: String = "错误！用户名密码错误或用户不存在"
}

case class WrongSecurityAnswerException() extends Exception {
  override def getMessage: String = "错误！安全回答错误"
}

case class UserNameAlreadyExistsException() extends Exception {
  override def getMessage: String = "错误！用户名已经存在了"
}

case class NucleicTestExpiredException() extends Exception {
  override def getMessage: String = "错误！用户核酸已过期，请尽快进行核酸检测"
}

case class NoTraceException() extends Exception {
  override def getMessage: String = "错误！未查询到该条轨迹"
}

case class PlaceNotExistsException() extends Exception {
  override def getMessage: String = "错误！数据库中无该地点！"
}

case class PermissionDeniedException() extends Exception {
  override def getMessage: String = "错误！权限不足"
}