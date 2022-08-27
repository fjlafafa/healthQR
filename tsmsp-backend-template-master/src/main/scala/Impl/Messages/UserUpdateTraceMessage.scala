package Impl.Messages

import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserTokenTable, UserTraceTable}
import Types.PlaceMeta.{DetailedPlaceDescription, PlaceId}
import Types.TraceMeta.ReportType
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserUpdateTraceMessage(userToken : String, trace : Long, detailedPlaceDescription : String, reportType: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserTokenTable.checkUserId(userToken).get
    DBUtils.exec(UserTraceTable.addTrace(userId, PlaceId(trace.toInt), DetailedPlaceDescription(detailedPlaceDescription), ReportType.getType(reportType)))
    TSMSPReply(STATUS_OK, "上传成功！")
  }
}

//case class UserUpdateTraceMessage(userToken : String, trace : PlaceId, detailedPlaceDescription : DetailedPlaceDescription, reportType: ReportType) extends TSMSPMessage {
//  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
//    val userId = UserTokenTable.checkUserId(userToken).get
//    DBUtils.exec(UserTraceTable.addTrace(userId, trace, detailedPlaceDescription, reportType))
//    TSMSPReply(STATUS_OK, "上传成功！")
//  }
//}

