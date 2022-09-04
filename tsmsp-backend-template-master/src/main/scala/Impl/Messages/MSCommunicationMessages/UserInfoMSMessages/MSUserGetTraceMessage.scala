package Impl.Messages.MSCommunicationMessages.UserInfoMSMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserTraceTable
import Types.UserMeta.UserId
import UserInfoMS.UserInfoMSDBUtils
import Utils.{DBUtils, IOUtils}
import org.joda.time.DateTime
import Utils.DateTimeAutoBuilder._

import scala.util.Try

case class MSUserGetTraceMessage(userId: UserId, startTime: Long, endTime: Long) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val trace = UserInfoMSDBUtils.exec(UserTraceTable.checkTrace(userId, startTime, endTime)).toList
    TSMSPReply(STATUS_OK, IOUtils.serialize(trace).get)
  }
}
