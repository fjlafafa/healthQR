package Impl.Messages.UserMessages

import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages.MSUserDeleteTraceMessage
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTraceTable}
import Types.TraceMeta.TraceId
import Types.UserMeta.Token
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class UserDeleteTraceMessage(userToken: Token, trace: TraceId) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkUserId(userToken).get
    UserInfoMSMessages.MSUserDeleteTraceMessage(userId, trace).send(GlobalVariables.UserInfoMSIP).get
  }
}
