package Impl.Messages.UserMessages

import Exceptions.TokenNotExistsException
import Globals.GlobalVariables.clientSystem.executionContext
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserTokenTable, UserTraceTable}
import Types.UserMeta.Token
import Utils.{DBUtils, IOUtils}
import org.joda.time.DateTime

import scala.util.Try

case class UserGetTraceMessage(userToken: String, startTime: Long, endTime: Long) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val trace = DBUtils.exec(
      UserTokenTable.checkUserIdByToken(Token(userToken)).flatMap(
        userId =>
          UserTraceTable.checkAllTrace(userId.getOrElse(throw TokenNotExistsException()))
      )
    ).toList
    TSMSPReply(STATUS_OK, IOUtils.serialize(trace).get)
  }
}
