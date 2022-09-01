package Impl.Messages.UserMessages

import Exceptions.WrongPasswordException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTokenTable}
import Types.UserMeta.{Password, RealName}
import org.joda.time.DateTime

import scala.util.Try

case class UserLoginMessage(realName: String, password: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserIdentityTable.checkPassword(RealName(realName), Password(password.hashCode().toString)).get) {
      val userId = UserIdentityTable.checkIdByRealName(RealName(realName)).get
      println(UserTokenTable.checkToken(userId).get.token)
      TSMSPReply(STATUS_OK, UserTokenTable.checkToken(userId).get.token)
    }
    else throw WrongPasswordException()
  }
}
