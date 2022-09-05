package Impl.Messages.UserMessages

import Exceptions.{TokenNotExistsException, WrongPasswordException}
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.{Password, IdentityNumber,UserId}
import Utils.DBUtils
import Utils.PasswordAutoEncoder._
import org.joda.time.DateTime

import scala.util.Try

case class UserLoginMessage(identityNumber: IdentityNumber, password: Password) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val Salt = DBUtils.exec(UserIdentityTable.checkSaltByIdentityNumber(identityNumber)).getOrElse(throw TokenNotExistsException())
    if (UserIdentityTable.checkPassword(identityNumber, PasswordEncoder(password, Salt)).get) {
      val userId = DBUtils.exec(UserIdentityTable.checkIdByIdentityNumber(identityNumber)).getOrElse(throw TokenNotExistsException())
      TSMSPReply(STATUS_OK, UserIdentityTable.checkToken(userId).get.token)
    }
    else throw WrongPasswordException()
  }
}
