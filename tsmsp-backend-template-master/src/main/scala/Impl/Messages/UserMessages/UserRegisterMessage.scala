package Impl.Messages.UserMessages

import Exceptions.{TokenNotExistsException, UserNameAlreadyExistsException}
import Globals.GlobalVariables.clientSystem.executionContext
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Types.UserMeta.{IdentityNumber, Password, Permission, RealName}
import Utils.DBUtils
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._

import scala.util.Try

case class UserRegisterMessage(realName: RealName, password: Password, identityNumber: IdentityNumber, permission: Permission) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserIdentityTable.checkUserExists(realName).get) throw UserNameAlreadyExistsException()
    else {
      val userId = DBUtils.exec(
        (UserIdentityTable
          .addUser(
            realName,
            Password(password.hashCode().toString),
            identityNumber,
            permission)
           >>
          UserIdentityTable.checkIdByRealName(realName).flatMap(
            userId => UserInformationTable.addUser(userId.getOrElse(throw TokenNotExistsException()))
          ) >>
          UserIdentityTable.checkIdByRealName(realName)
          ).transactionally
      ).get
      TSMSPReply(STATUS_OK, UserIdentityTable.checkToken(userId).get.token)
    }
  }
}
