package Impl.Messages.UserMessages

import Globals.GlobalVariables
import Impl.Messages.MSCommunicationMessages.UserInfoMSMessages.MSUserUpdateTraceMessage
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTraceTable}
import Types.PlaceMeta.{DetailedPlaceDescription, PlaceId}
import Types.TraceMeta.{ReportType, TraceId}
import Types.UserMeta.Token
import Utils.DBUtils
import Utils.HTTPUtils.sender
import org.joda.time.DateTime

import scala.util.Try

case class UserUpdateTraceMessage(userToken: Token, placeId: PlaceId, detailedPlaceDescription: DetailedPlaceDescription, reportType: ReportType) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkUserId(userToken).get
    MSUserUpdateTraceMessage(userId, placeId, detailedPlaceDescription, reportType).send(GlobalVariables.UserInfoMSIP).get
  }
}
