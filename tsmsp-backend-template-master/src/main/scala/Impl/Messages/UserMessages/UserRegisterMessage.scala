package Impl.Messages.UserMessages

import Exceptions.{TokenNotExistsException, UserNameAlreadyExistsException}
import Globals.GlobalVariables.clientSystem.executionContext
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable, UserTokenTable}
import Types.UserMeta.{IdentityNumber, Password, Permission, RealName}
import Utils.DBUtils
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._

import scala.util.Try

case class UserRegisterMessage(realName: String, password: String, identityNumber: String, permission: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserIdentityTable.checkUserExists(RealName(realName)).get) throw UserNameAlreadyExistsException()
    else {
      val userId = DBUtils.exec(
        (UserIdentityTable
          .addUser(
            RealName(realName),
            Password(password.hashCode().toString),
            IdentityNumber(identityNumber),
            Permission.getType(permission)
          ) >>
          UserIdentityTable.checkIdByRealName(RealName(realName)).flatMap(
            userId => UserTokenTable.addRow(userId.getOrElse(throw TokenNotExistsException())) >>
              UserInformationTable.addUser(userId.get)
          ) >>
          UserIdentityTable.checkIdByRealName(RealName(realName))
          ).transactionally
      ).get
      TSMSPReply(STATUS_OK, UserTokenTable.checkToken(userId).get.token)
    }
  }
}
