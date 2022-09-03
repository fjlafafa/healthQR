package Impl.Messages.UserMessages

import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages.MSUserGetTraceMessage
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTraceTable}
import Types.UserMeta.Token
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class UserGetTraceMessage(userToken: Token, startTime: DateTime, endTime: DateTime) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkUserId(userToken).get
    UserInfoMSMessages.MSUserGetTraceMessage(userId, startTime, endTime).send(GlobalVariables.UserInfoMSIP).get
  }
}
