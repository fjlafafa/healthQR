package Impl.Messages

import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTokenTable}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserDeleteAccountMessage(userToken : String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userName = UserTokenTable.checkUserId(userToken).get
    DBUtils.exec(UserTokenTable.dropUserName(userToken))
    DBUtils.exec(UserIdentityTable.dropUser(userName))
    TSMSPReply(STATUS_OK, userName.id.toString)
  }
}
