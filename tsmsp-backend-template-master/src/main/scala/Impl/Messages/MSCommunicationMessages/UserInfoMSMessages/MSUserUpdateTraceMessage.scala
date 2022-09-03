package Impl.Messages.MSCommunicationMessages.UserInfoMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTraceTable}
import Types.PlaceMeta.{DetailedPlaceDescription, PlaceId}
import Types.TraceMeta.ReportType
import Types.UserMeta.{Token, UserId}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class MSUserUpdateTraceMessage(userId: UserId, placeId: PlaceId, detailedPlaceDescription: DetailedPlaceDescription, reportType: ReportType) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    DBUtils.exec(
      UserTraceTable.addTrace(
        userId,
        placeId,
        detailedPlaceDescription,
        reportType))
    TSMSPReply(STATUS_OK, "上传成功！")
  }
}
