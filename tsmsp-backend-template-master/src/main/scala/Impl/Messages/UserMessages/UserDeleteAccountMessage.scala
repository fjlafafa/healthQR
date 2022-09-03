package Impl.Messages.UserMessages

import Exceptions.TokenNotExistsException
import Globals.GlobalVariables.clientSystem.executionContext
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTokenTable}
import Types.UserMeta.Token
import Utils.DBUtils
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._

import scala.util.Try

case class UserDeleteAccountMessage(userToken: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = DBUtils.exec(
      UserTokenTable.checkUserIdByToken(Token(userToken)).flatMap(
        userId => UserTokenTable.dropUserName(Token(userToken)) >>
          UserIdentityTable.dropUser(userId.getOrElse(throw TokenNotExistsException()))
      ).transactionally >>
        UserTokenTable.checkUserIdByToken(Token(userToken))
    ).get
    TSMSPReply(STATUS_OK, userId.id.toString)
  }
}
