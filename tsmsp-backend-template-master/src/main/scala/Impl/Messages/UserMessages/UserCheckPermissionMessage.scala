package Impl.Messages.UserMessages

import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.Token
import Utils.IOUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserCheckPermissionMessage(userToken: Token) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val permission = UserIdentityTable.getPermissionFromToken(userToken).get
    TSMSPReply(STATUS_OK,IOUtils.serialize(permission).get)
  }
}
