package Impl.Messages

import Exceptions.NoTraceException
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserTable, UserTokenTable}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserDeleteAccountMessage(userToken : String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userName = UserTokenTable.checkUserName(userToken).get
    DBUtils.exec(UserTokenTable.dropUserName(userToken).get)
    DBUtils.exec(UserTable.dropUser(userName).get)
    TSMSPReply(STATUS_OK, userName)
  }
}
