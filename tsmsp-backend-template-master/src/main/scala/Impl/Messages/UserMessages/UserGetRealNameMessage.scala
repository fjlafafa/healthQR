package Impl.Messages.UserMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.Token
import Utils.{DBUtils, IOUtils}
import org.joda.time.DateTime

import scala.util.Try

case class UserGetRealNameMessage(userToken: Token) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = DBUtils.exec(UserIdentityTable.checkUserIdByToken(userToken)).get
    val realName = DBUtils.exec(UserIdentityTable.checkRealNameById(userId)).get
    TSMSPReply(STATUS_OK, IOUtils.serialize(realName).get)
  }
}
