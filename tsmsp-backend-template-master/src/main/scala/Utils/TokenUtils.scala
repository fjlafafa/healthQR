package Utils

import Types.TraceMeta.TraceId
import Types.UserMeta.{Token, UserId}
import Utils.StringUtils.{randomNumber, randomString}

object TokenUtils {
  /** 定义win/linux下面的slash */
  val slash: String = if (System.getProperty("os.name").startsWith("Windows")) "\\" else "/"

  def RandomUserId(length: Int): UserId = UserId(randomNumber(length))

  def RandomUserToken(length: Int): Token = Token(randomString(length))

  def RandomTraceId(length: Int): TraceId = TraceId(randomNumber(length))

}
