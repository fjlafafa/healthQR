package Impl.Messages.UserMessages

import Exceptions.NoTraceException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTraceTable}
import Types.TraceMeta.TraceId
import Types.UserMeta.Token
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserDeleteTraceMessage(userToken: String, trace: Int) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userName = UserIdentityTable.checkUserId(Token(userToken)).get
    if (UserTraceTable.checkTraceExists(userName, TraceId(trace)).get) {
      DBUtils.exec(UserTraceTable.dropTrace(userName, TraceId(trace)))
      TSMSPReply(STATUS_OK, trace.toString)
    } else throw NoTraceException()
  }
}
