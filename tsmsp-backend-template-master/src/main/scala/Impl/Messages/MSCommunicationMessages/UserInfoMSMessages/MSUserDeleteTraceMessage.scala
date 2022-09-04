package Impl.Messages.MSCommunicationMessages.UserInfoMSMessages

import Exceptions.NoTraceException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserTraceTable
import Types.TraceMeta.TraceId
import Types.UserMeta.UserId
import UserInfoMS.UserInfoMSDBUtils
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class MSUserDeleteTraceMessage(userId: UserId, trace: TraceId) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserTraceTable.checkTraceExists(userId, trace).get) {
      UserInfoMSDBUtils.exec(UserTraceTable.dropTrace(userId, trace))
      TSMSPReply(STATUS_OK, trace.toString)
    } else throw NoTraceException()
  }
}
