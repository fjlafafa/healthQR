package Impl.Messages.UserMessages

import Exceptions.TokenNotExistsException
import Globals.GlobalVariables.clientSystem.executionContext
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTokenTable}
import Types.UserMeta.{Password, Token}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserUpdatePasswordMessage(userToken: String, password: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userRealName = DBUtils.exec(
      UserTokenTable.checkUserIdByToken(Token(userToken)).flatMap(
        userId =>
          UserIdentityTable.updatePassword(userId.getOrElse(throw TokenNotExistsException()), Password(password.hashCode().toString)) >>
            UserIdentityTable.checkRealNameById(userId.getOrElse(throw TokenNotExistsException())
        )
      )
    ).getOrElse(throw TokenNotExistsException())
    TSMSPReply(STATUS_OK, userRealName.name)
  }
}
