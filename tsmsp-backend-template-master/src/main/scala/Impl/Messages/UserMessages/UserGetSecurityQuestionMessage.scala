package Impl.Messages.UserMessages

import Exceptions.UserNotExistsException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.IdentityNumber
import Utils.{DBUtils, IOUtils}
import org.joda.time.DateTime

import scala.util.Try

case class UserGetSecurityQuestionMessage(identityNumber: IdentityNumber) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val question = DBUtils.exec(
      UserIdentityTable.getSecurityQuestionFromIdentityNumber(identityNumber)
    ).getOrElse(throw UserNotExistsException())
    TSMSPReply(STATUS_OK, IOUtils.serialize(question).get)
  }
}
