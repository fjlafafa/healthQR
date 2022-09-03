package Impl.Messages.UserMessages

import Exceptions.UserNameAlreadyExistsException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Types.UserMeta.{IdentityNumber, Password, Permission, RealName}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserRegisterMessage(realName: RealName, password: String, identityNumber: IdentityNumber, permission: Permission) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserIdentityTable.checkUserExists(realName).get) throw UserNameAlreadyExistsException()
    else {
      val userId = UserIdentityTable.checkIdByRealName(realName).get
      DBUtils.exec(
        UserIdentityTable
          .addUser(
            realName,
            Password(password.hashCode().toString),
            identityNumber,
            permission)
          >> UserInformationTable.addUser(userId)
      )
      TSMSPReply(STATUS_OK, UserIdentityTable.checkToken(userId).get.token)
    }
  }
}
