package Impl.Messages.UserMessages

import Exceptions.{TokenNotExistsException, WrongPasswordException}
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Utils.DBUtils
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime

import scala.util.Try

//Implementing
case class UserCheckPermissionMessage(token: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserIdentityTable.checkPassword(realName, password).get) {
      val userId = DBUtils.exec(UserIdentityTable.checkIdByRealName(realName)).getOrElse(throw TokenNotExistsException())
      TSMSPReply(STATUS_OK, UserIdentityTable.checkToken(userId).get.token)
    }
  }
}
