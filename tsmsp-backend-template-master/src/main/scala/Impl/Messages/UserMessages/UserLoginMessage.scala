package Impl.Messages.UserMessages

import Exceptions.{UserNotExistsException, WrongPasswordException}
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.{IdentityNumber, Password, UserId}
import Utils.{DBUtils, IOUtils}
import Utils.PasswordAutoEncoder._
import org.joda.time.DateTime

import scala.util.Try

case class UserLoginMessage(identityNumber: IdentityNumber, password: Password) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val Salt = DBUtils.exec(UserIdentityTable.checkSaltByIdentityNumber(identityNumber)).getOrElse(throw UserNotExistsException())
    if (UserIdentityTable.checkPassword(identityNumber, PasswordEncoder(password, Salt)).get) {
      val userId = DBUtils.exec(UserIdentityTable.checkIdByIdentityNumber(identityNumber)).getOrElse(throw UserNotExistsException())
      TSMSPReply(STATUS_OK, IOUtils.serialize(UserIdentityTable.checkToken(userId).get).get)
    }
    else throw WrongPasswordException()
  }
}
