package Impl.Messages.UserMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTraceTable}
import Utils.DBUtils
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime

import scala.util.Try

case class UserUpdateTraceMessage(userToken: String, traceId: Long, detailedPlaceDescription: String, reportType: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkUserId(userToken).get
    DBUtils.exec(
      UserTraceTable.addTrace(
        userId,
        traceId,
        detailedPlaceDescription,
        reportType))
    TSMSPReply(STATUS_OK, "上传成功！")
  }
}
