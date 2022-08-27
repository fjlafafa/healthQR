package Impl.Messages

import Exceptions.NoTraceException
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserTokenTable, UserTraceTable}
import Types.TraceMeta.TraceId
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserDeleteTraceMessage(userToken : String, trace : Int) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userName = UserTokenTable.checkUserId(userToken).get
    if(UserTraceTable.checkTraceExists(userName, TraceId(trace)).get) {
      DBUtils.exec(UserTraceTable.dropTrace(userName, TraceId(trace)))
      TSMSPReply(STATUS_OK, trace.toString)
    } else throw NoTraceException()
  }
}

//case class UserDeleteTraceMessage(userToken : String, trace : PlaceId) extends TSMSPMessage {
//  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
//    val userName = UserTokenTable.checkUserId(userToken).get
//    if(UserTraceTable.checkTraceExists(userName, trace).get) {
//      DBUtils.exec(UserTraceTable.dropTrace(userName, trace))
//      TSMSPReply(STATUS_OK, trace.id.toString)
//    } else throw NoTraceException()
//  }
//}
