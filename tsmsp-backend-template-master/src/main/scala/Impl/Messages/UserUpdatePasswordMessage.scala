package Impl.Messages

import Impl.{STATUS_OK, TSMSPReply}
import Tables.{UserIdentityTable, UserTokenTable}
import Types.UserMeta.Password
import Utils.DBUtils
import org.joda.time.DateTime

import scala.util.Try

case class UserUpdatePasswordMessage(userToken : String, password : String) extends TSMSPMessage {
  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
    val userId = UserTokenTable.checkUserId(userToken).get
    DBUtils.exec(UserIdentityTable.updatePassword(userId, Password(password.hashCode())))
    val userRealName = UserIdentityTable.checkRealName(userId).get
    TSMSPReply(STATUS_OK,  userRealName.name)
  }
}


//case class UserUpdatePasswordMessage(userToken : String, password : Password) extends TSMSPMessage {
//  override def reaction(now: DateTime): Try[TSMSPReply] = Try {
//    val userId = UserTokenTable.checkUserId(userToken).get
//    DBUtils.exec(UserIdentityTable.updatePassword(userId, password))
//    val userRealName = UserIdentityTable.checkRealName(userId).get
//    TSMSPReply(STATUS_OK,  userRealName.name)
//  }
//}