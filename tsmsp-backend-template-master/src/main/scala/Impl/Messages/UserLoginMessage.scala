package Impl.Messages

import Exceptions.WrongPasswordException
import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTokenTable}
import Types.UserMeta.{Password, RealName}
import org.joda.time.DateTime

import scala.util.Try

case class  UserLoginMessage(realName : String, password : String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    if (UserIdentityTable.checkPassword(RealName(realName), Password(password.hashCode().toString())).get) {
      val userId = UserIdentityTable.checkId(RealName(realName)).get
      TSMSPReply(STATUS_OK, UserTokenTable.checkToken(userId).get.token)
    }
    else throw WrongPasswordException()
  }
}

//case class UserLoginMessage(realName : RealName, password : Password) extends TSMSPMessage {
//  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
//    if (UserIdentityTable.checkPassword(realName, password).get) {
//      val userId = UserIdentityTable.checkId(realName).get
//      TSMSPReply(STATUS_OK, UserTokenTable.checkToken(userId).get)
//    }
//    else throw WrongPasswordException()
//  }
//}