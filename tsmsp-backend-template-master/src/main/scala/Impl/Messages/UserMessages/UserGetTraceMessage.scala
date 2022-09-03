package Impl.Messages.UserMessages

import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.UserIdentityTable
import Utils.HTTPUtils.sender
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime

import scala.util.Try

case class UserGetTraceMessage(userToken: String, startTime: DateTime, endTime: DateTime) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkUserId(userToken).get
    UserInfoMSMessages.MSUserGetTraceMessage(userId, startTime, endTime).send(GlobalVariables.UserInfoMSIP).get
  }
}
