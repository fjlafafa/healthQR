package Impl.Messages.UserMessages

import Exceptions.TokenNotExistsException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.Token
import Utils.{DBUtils, IOUtils}
import org.joda.time.DateTime

import scala.util.Try

case class UserGetIdentityNumberMessage(userToken: Token) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = DBUtils.exec(UserIdentityTable.checkUserIdByToken(userToken)).getOrElse(throw TokenNotExistsException())
    val identityNumber = DBUtils.exec(UserIdentityTable.checkIdentityNumberById(userId)).get
    TSMSPReply(STATUS_OK, IOUtils.serialize(identityNumber).get)
  }
}
