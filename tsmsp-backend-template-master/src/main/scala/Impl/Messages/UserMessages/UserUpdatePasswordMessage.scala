package Impl.Messages.UserMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Utils.DBUtils
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime

import scala.util.Try

case class UserUpdatePasswordMessage(userToken: Token, password: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkUserId(userToken).get
    val userRealName = UserIdentityTable.checkRealNameById(userId).get
    DBUtils.exec(UserIdentityTable.updatePassword(userId, password))
    TSMSPReply(STATUS_OK, userRealName.name)
  }
}
