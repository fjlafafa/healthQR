package Impl.Messages.UserMessages

import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages.MSUserUpdateTraceMessage
import Impl.Messages.TSMSPMessage
import Impl.TSMSPReply
import Tables.UserIdentityTable
import Utils.HTTPUtils.sender
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime

import scala.util.Try

case class UserUpdateTraceMessage(userToken: String, placeId: Long, detailedPlaceDescription: String, reportType: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkUserId(userToken).get
    MSUserUpdateTraceMessage(userId, placeId, detailedPlaceDescription, reportType).send(GlobalVariables.UserInfoMSIP).get
  }
}
