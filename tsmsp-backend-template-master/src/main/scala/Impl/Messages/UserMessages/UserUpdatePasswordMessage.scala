package Impl.Messages.UserMessages

import Exceptions.TokenNotExistsException
import Globals.GlobalVariables.clientSystem.executionContext
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.UserIdentityTable
import Utils.DBUtils
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._

import scala.util.Try

case class UserUpdatePasswordMessage(userToken: String, password: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userRealName = DBUtils.exec(
      UserIdentityTable.checkUserIdByToken(userToken).flatMap(
        userId =>
          UserIdentityTable.updatePassword(userId.getOrElse(throw TokenNotExistsException()), password) >>
            UserIdentityTable.checkRealNameById(userId.getOrElse(throw TokenNotExistsException())
        )
      ).transactionally
    ).getOrElse(throw TokenNotExistsException())
    TSMSPReply(STATUS_OK, userRealName.name)
  }
}
