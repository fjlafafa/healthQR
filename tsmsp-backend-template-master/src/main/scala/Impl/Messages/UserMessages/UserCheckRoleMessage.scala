package Impl.Messages.UserMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.Token
import Utils.IOUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserCheckRoleMessage(userToken: Token) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val role = UserIdentityTable.getRoleFromToken(userToken).get
    TSMSPReply(STATUS_OK,IOUtils.serialize(role).get)
  }
}
