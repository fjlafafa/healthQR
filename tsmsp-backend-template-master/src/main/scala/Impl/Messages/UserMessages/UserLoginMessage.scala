package Impl.Messages.UserMessages

import Exceptions.WrongPasswordException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.{Password, RealName}
import org.joda.time.DateTime

import scala.util.Try

case class UserLoginMessage(realName: RealName, password: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserIdentityTable.checkPassword(realName, Password(password.hashCode().toString)).get) {
      val userId = UserIdentityTable.checkIdByRealName(realName).get
      TSMSPReply(STATUS_OK, UserIdentityTable.checkToken(userId).get.token)
    }
    else throw WrongPasswordException()
  }
}
