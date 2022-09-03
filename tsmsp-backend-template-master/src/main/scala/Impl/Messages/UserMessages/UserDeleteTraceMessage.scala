package Impl.Messages.UserMessages

import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.PlaceInfoMSMessages.MSUserDeleteTraceMessage
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.UserIdentityTable
import Utils.HTTPUtils.sender
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime

import scala.util.Try

case class UserDeleteTraceMessage(userToken: String, trace: Long) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkUserId(userToken).get
    MSUserDeleteTraceMessage(userId, trace).send(GlobalVariables.PlaceInfoMSIP).get
  }
}
