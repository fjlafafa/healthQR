package Impl.Messages.UserMessages

import Exceptions.{NoTraceException, TokenNotExistsException}
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserTokenTable, UserTraceTable}
import Types.TraceMeta.TraceId
import Types.UserMeta.Token
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserDeleteTraceMessage(userToken: String, trace: Int) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = DBUtils.exec(UserTokenTable.checkUserIdByToken(Token(userToken))).getOrElse(throw TokenNotExistsException())
    if (UserTraceTable.checkTraceExists(userId, TraceId(trace)).get) {
      DBUtils.exec(UserTraceTable.dropTrace(userId, TraceId(trace)))
      TSMSPReply(STATUS_OK, trace.toString)
    } else throw NoTraceException()
  }
}
