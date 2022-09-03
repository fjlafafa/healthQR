package Impl.Messages.UserMessages

import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages.MSUserDeleteTraceMessage
import Exceptions.{NoTraceException, TokenNotExistsException}
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.UserIdentityTable
import Utils.DBUtils
import Utils.HTTPUtils.sender
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime

import scala.util.Try

case class UserDeleteTraceMessage(userToken: String, trace: Long) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = DBUtils.exec(UserIdentityTable.checkUserIdByToken(userToken)).getOrElse(throw TokenNotExistsException())
    UserInfoMSMessages.MSUserDeleteTraceMessage(userId, trace).send(GlobalVariables.UserInfoMSIP).get
  }
}
