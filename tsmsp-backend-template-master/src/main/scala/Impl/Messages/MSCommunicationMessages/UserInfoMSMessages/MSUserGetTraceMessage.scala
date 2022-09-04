package Impl.Messages.MSCommunicationMessages.UserInfoMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserTraceTable
import Types.UserMeta.UserId
import Utils.{DBUtils, IOUtils}
import org.joda.time.DateTime

import scala.util.Try

case class MSUserGetTraceMessage(userId: UserId, startTime: DateTime, endTime: DateTime) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val trace = DBUtils.exec(UserTraceTable.checkTrace(userId, startTime, endTime)).toList
    TSMSPReply(STATUS_OK, IOUtils.serialize(trace).get)
  }
}
