package Impl.Messages

import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserTokenTable, UserTraceTable}
import Types.UserMeta.Token
import Utils.IOUtils
import org.joda.time.DateTime
import org.joda.time.format.{DateTimeFormat, DateTimeFormatter}

import scala.util.Try

case class UserGetTraceMessage(userToken : String, startTime : Long, endTime : Long) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userName = UserTokenTable.checkUserId(Token(userToken)).get
    val trace = UserTraceTable.checkAllTrace(userName).get
//      UserTraceTable.checkTrace(userName, new DateTime(startTime), new DateTime(endTime)).get
    val fmt : DateTimeFormatter = DateTimeFormat.forPattern("yyyy年MM月dd日 HH时mm分ss秒")
    TSMSPReply(STATUS_OK, IOUtils.serialize(trace.map(t => List(t.visitPlaceId.id.toString, t.detailedPlaceDescription.name, fmt.print(new DateTime(t.time))))).get)
  }
}


//case class UserGetTraceMessage(userToken : String, startTime : DateTime, endTime : DateTime) extends TSMSPMessage {
//  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
//    val userName = UserTokenTable.checkUserId(userToken).get
//    TSMSPReply(STATUS_OK, IOUtils.serialize(UserTraceTable.checkTrace(userName, startTime, endTime).get.map(_.visitPlaceId)).get)
//  }
//}