package Impl.Messages.UserMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Utils.DBUtils
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime

import scala.util.Try

case class UserDeleteAccountMessage(userToken: Token) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserIdentityTable.checkUserId(userToken).get
    DBUtils.exec(
        UserIdentityTable.dropUser(userId)
    )
    TSMSPReply(STATUS_OK, userId.id.toString)
  }
}
