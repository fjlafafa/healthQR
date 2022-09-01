package Impl.Messages.UserMessages

import Exceptions.UserNameAlreadyExistsException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable, UserTokenTable}
import Types.UserMeta.{IdentityNumber, Password, Permission, RealName}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserRegisterMessage(realName: String, password: String, identityNumber: String, permission: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserIdentityTable.checkUserExists(RealName(realName)).get) throw UserNameAlreadyExistsException()
    else {
      val userId = UserIdentityTable.checkIdByRealName(RealName(realName)).get
      DBUtils.exec(
        UserIdentityTable
          .addUser(
            RealName(realName),
            Password(password.hashCode().toString),
            IdentityNumber(identityNumber),
            Permission.getType(permission))
          >> UserTokenTable.addRow(userId)
          >> UserInformationTable.addUser(userId)
      )
      TSMSPReply(STATUS_OK, UserTokenTable.checkToken(userId).get.token)
    }
  }
}
