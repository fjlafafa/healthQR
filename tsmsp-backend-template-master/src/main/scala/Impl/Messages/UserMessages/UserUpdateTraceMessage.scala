package Impl.Messages.UserMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserTokenTable, UserTraceTable}
import Types.PlaceMeta.{DetailedPlaceDescription, PlaceId}
import Types.TraceMeta.ReportType
import Types.UserMeta.Token
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserUpdateTraceMessage(userToken: String, traceId: Long, detailedPlaceDescription: String, reportType: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserTokenTable.checkUserId(Token(userToken)).get
    DBUtils.exec(
      UserTraceTable.addTrace(
        userId,
        PlaceId(traceId.toInt),
        DetailedPlaceDescription(detailedPlaceDescription),
        ReportType.getType(reportType)))
    TSMSPReply(STATUS_OK, "上传成功！")
  }
}
