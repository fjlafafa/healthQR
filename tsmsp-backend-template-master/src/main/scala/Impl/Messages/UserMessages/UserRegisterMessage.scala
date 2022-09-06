package Impl.Messages.UserMessages

import Exceptions.{TokenNotExistsException, UserNameAlreadyExistsException}
import Globals.GlobalVariables.clientSystem.executionContext
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Types.UserMeta.{IdentityNumber, Password, RealName, Salt}
import Utils.DBUtils
import Utils.EnumAutoConverter._
import Utils.PasswordAutoEncoder._
import org.joda.time.DateTime
import slick.jdbc.PostgresProfile.api._
import Utils.StringUtils
import scala.util.Try

case class UserRegisterMessage(realName: RealName, password: Password, identityNumber: IdentityNumber, role: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserIdentityTable.checkUserExists(identityNumber).get) throw UserNameAlreadyExistsException()
    else {
      val salt = Salt(StringUtils.randomString(15))
      val userId = DBUtils.exec(
        (UserIdentityTable
          .addUser(
            realName,
            PasswordEncoder(password,salt),
            identityNumber,
            role,
            salt)
           >>
          UserIdentityTable.checkIdByIdentityNumber(identityNumber).flatMap(
            userId => UserInformationTable.addUser(userId.getOrElse(throw TokenNotExistsException()))
          ) >>
          UserIdentityTable.checkIdByIdentityNumber(identityNumber)
          ).transactionally
      ).get
      TSMSPReply(STATUS_OK, UserIdentityTable.checkToken(userId).get.token)
    }
  }
}
