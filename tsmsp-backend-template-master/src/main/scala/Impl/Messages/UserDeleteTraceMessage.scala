package Impl.Messages

import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserTokenTable, UserTraceTable}
import Exceptions.NoTraceException
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserDeleteTraceMessage(userToken : String, trace : String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userName = UserTokenTable.checkUserName(userToken).get
    if(UserTraceTable.checkTraceExists(userName, trace).get) {
      DBUtils.exec(UserTraceTable.dropTrace(userName, trace).get)
      TSMSPReply(STATUS_OK, trace)
    } else throw NoTraceException()
  }
}
