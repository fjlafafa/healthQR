package Impl.Messages

import Exceptions.UserNameAlreadyExistsException
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTokenTable}
import Types.UserMeta.{IdentityNumber, Password, Permission, RealName}
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserRegisterMessage(realName : String, password : String, identityNumber: String, permission: String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserIdentityTable.checkUserExists(RealName(realName)).get) throw UserNameAlreadyExistsException()
    else {
      DBUtils.exec(
        UserIdentityTable
          .addUser(
            RealName(realName),
            Password(password.hashCode()),
            IdentityNumber(identityNumber),
            Permission.getType(permission)
          ))
      val userId = UserIdentityTable.checkId(RealName(realName)).get
      DBUtils.exec(
            UserTokenTable.addRow(userId)
      )
      TSMSPReply(STATUS_OK,  UserTokenTable.checkToken(userId).get.token)
    }
  }
}

//case class UserRegisterMessage(realName : RealName, password : Password, identityNumber: IdentityNumber, permission: Permission) extends TSMSPMessage {
//  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
//    val userId = UserIdentityTable.checkId(realName).get
//    if (UserIdentityTable.checkUserExists(userId).get) throw UserNameAlreadyExistsException()
//    else {
//      DBUtils.exec(UserIdentityTable.addUser(realName, password, identityNumber, permission).andThen(UserTokenTable.addRow(userId)))
//      TSMSPReply(STATUS_OK,  UserTokenTable.checkToken(userId).get)
//    }
//  }
//}
