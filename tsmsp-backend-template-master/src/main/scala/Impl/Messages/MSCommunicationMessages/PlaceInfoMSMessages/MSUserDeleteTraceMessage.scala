package Impl.Messages.MSCommunicationMessages.PlaceInfoMSMessages

import Exceptions.NoTraceException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTraceTable}
import Types.TraceMeta.TraceId
import Types.UserMeta.{Token, UserId}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class MSUserDeleteTraceMessage(userId: UserId, trace: TraceId) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserTraceTable.checkTraceExists(userId, trace).get) {
      DBUtils.exec(UserTraceTable.dropTrace(userId, trace))
      TSMSPReply(STATUS_OK, trace.toString)
    } else throw NoTraceException()
  }
}
