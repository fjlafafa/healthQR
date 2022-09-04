package Impl.Messages.UserMessages

import Exceptions.TokenNotExistsException
import Globals.GlobalVariables.clientSystem.executionContext
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Types.UserMeta.Token
import Utils.DBUtils
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._

import scala.util.Try

case class UserDeleteAccountMessage(userToken: Token) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    DBUtils.exec(
      UserIdentityTable.checkUserIdByToken(userToken).flatMap(
        userId =>
          UserIdentityTable.dropUser(userId.getOrElse(throw TokenNotExistsException()))
      ).transactionally
    )
    TSMSPReply(STATUS_OK, "")
  }
}
