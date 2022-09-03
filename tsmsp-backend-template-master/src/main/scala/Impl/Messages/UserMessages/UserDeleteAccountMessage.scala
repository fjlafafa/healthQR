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

case class UserDeleteAccountMessage(userToken: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = DBUtils.exec(
      UserIdentityTable.checkUserIdByToken(userToken).flatMap(
        userId =>
          UserIdentityTable.dropUser(userId.getOrElse(throw TokenNotExistsException()))
      ).transactionally >>
        UserIdentityTable.checkUserIdByToken(userToken)
    ).get
    TSMSPReply(STATUS_OK, userId.id.toString)
  }
}
