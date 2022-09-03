package Impl.Messages.UserMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTraceTable}
import Types.UserMeta.Token
import Utils.IOUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserGetTraceMessage(userToken: String, startTime: Long, endTime: Long) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkUserId(Token(userToken)).get
    val trace = UserTraceTable.checkAllTrace(userId).get
    TSMSPReply(STATUS_OK, IOUtils.serialize(trace).get)
  }
}
