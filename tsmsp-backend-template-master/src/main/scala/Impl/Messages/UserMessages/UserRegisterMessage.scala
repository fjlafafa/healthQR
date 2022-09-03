package Impl.Messages.UserMessages

import Exceptions.UserNameAlreadyExistsException
import Impl.Messages.TSMSPMessage
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserInformationTable}
import Utils.DBUtils
import Utils.ImplicitTypeConverter._
import org.joda.time.DateTime

import scala.util.Try

case class UserRegisterMessage(realName: String, password: String, identityNumber: String, permission: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserIdentityTable.checkUserExists(realName).get) throw UserNameAlreadyExistsException()
    else {
      val userId = UserIdentityTable.checkIdByRealName(realName).get
      DBUtils.exec(
        UserIdentityTable
          .addUser(
            realName,
            password,
            identityNumber,
            permission)
          >> UserInformationTable.addUser(userId)
      )
      TSMSPReply(STATUS_OK, UserIdentityTable.checkToken(userId).get.token)
    }
  }
}
