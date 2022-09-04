package Impl.Messages.UserMessages

import Exceptions.{TokenNotExistsException, WrongPasswordException}
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.{Password, RealName}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserLoginMessage(realName: RealName, password: Password) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserIdentityTable.checkPassword(realName, Password(password.hashCode.toString)).get) {
      val userId = DBUtils.exec(UserIdentityTable.checkIdByRealName(realName)).getOrElse(throw TokenNotExistsException())
      TSMSPReply(STATUS_OK, UserIdentityTable.checkToken(userId).get.token)
    }
    else throw WrongPasswordException()
  }
}
