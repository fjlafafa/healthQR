package Impl.Messages.UserMessages

import Exceptions.{UserNotExistsException, WrongSecurityAnswerException}
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.{IdentityNumber, SecurityAnswer}
import Utils.DBUtils
import Utils.PasswordAutoEncoder.SecurityAnswerEncoder
import org.joda.time.DateTime

import scala.util.Try

case class UserSendSecurityAnswerMessage(identityNumber: IdentityNumber, securityAnswer: SecurityAnswer) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val Salt = DBUtils.exec(UserIdentityTable.checkSaltByIdentityNumber(identityNumber)).getOrElse(throw UserNotExistsException())
    if (UserIdentityTable.checkSecurityAnswer(identityNumber, SecurityAnswerEncoder(securityAnswer, Salt)).get) {
      val userId = DBUtils.exec(UserIdentityTable.checkIdByIdentityNumber(identityNumber)).getOrElse(throw UserNotExistsException())
      TSMSPReply(STATUS_OK, UserIdentityTable.checkToken(userId).get.token)
    }
    else throw WrongSecurityAnswerException()
  }
}
